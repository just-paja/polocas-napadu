variable "common" {}
variable "db_auth" { type = string }
variable "db_connect" { type = string }
variable "db_instance" { type = string }
variable "network_name" { type = string }
variable "runtime_account" {}
variable "secret_base" { type = string }

module "npm" {
  common = var.common
  root   = path.module
  source = "../../tf/npm"
}

locals {
  db_name  = "${terraform.workspace}-redmine"
  fs_name  = "${terraform.workspace}-redmine"
  fs_class = "${terraform.workspace}-gcs-bucket"
  image    = "${var.common.docker_repo}/${var.common.project}/${module.npm.pkg_ident}:${module.npm.revision}"
  service_port = 30001
  sidecar  = "gcr.io/cloud-sql-connectors/cloud-sql-proxy:2.1.0"
  redmine_secrets = "${terraform.workspace}-redmine-secrets"
  service_account = "${terraform.workspace}-redmine-db"
}

resource "kubernetes_secret_v1" "redmine_secrets" {
  metadata {
    name = local.redmine_secrets
  }
  data = {
    "secret_key_base": var.secret_base,
  }
}

resource "kubernetes_service_account_v1" "db" {
  metadata {
    name = local.service_account 
    annotations = {
      "iam.gke.io/gcp-service-account" = var.runtime_account.email
    }
  }
}

resource "google_service_account_iam_binding" "iam_db_user" {
  depends_on         = [kubernetes_service_account_v1.db]
  service_account_id = var.runtime_account.id
  role               = "roles/iam.workloadIdentityUser"
  members            = [
    "serviceAccount:${var.common.project}.svc.id.goog[default/${local.service_account}]",
  ]
}

resource "google_storage_bucket" "bucket" {
  name = "${terraform.workspace}-redmine-data"
  location = var.common.region
  uniform_bucket_level_access = true
}

resource "kubernetes_storage_class" "bucket" {
  storage_provisioner = "gcs.csi.ofek.dev"
  reclaim_policy      = "Retain"
  metadata {
    name = local.fs_class
    annotations = {
      "csi.storage.k8s.io/location" = var.common.region
    }
  }
}

resource "kubernetes_persistent_volume" "files" {
  metadata {
    name = local.fs_name
    annotations = {
      "gcs.csi.ofek.dev/location" = var.common.region,
      "gcs.csi.ofek.dev/bucket" = "${terraform.workspace}-redmine-data",
    }
  }
  spec {
    access_modes = ["ReadWriteMany"]
    storage_class_name = local.fs_class
    persistent_volume_source {
      csi {
        driver  = "gcs.csi.ofek.dev"
        volume_handle = "${terraform.workspace}-redmine-data"
        fs_type = "ext4"
      }
    }
    capacity = {
      storage = "2Gi"
    }
  }
}

resource "kubernetes_persistent_volume_claim" "files" {
  depends_on = [kubernetes_persistent_volume.files]
  wait_until_bound = true
  metadata {
    name = local.fs_name
  }
  spec {
    access_modes = ["ReadWriteMany"]
    storage_class_name = local.fs_class
    volume_name = local.fs_name
    resources {
      requests = {
        storage = "1Gi"
      }
    }
  }
}

resource "google_sql_database" "db" {
  name     = local.db_name
  instance = var.db_instance
}

resource "kubernetes_deployment" "deployment" {
  depends_on = [
    google_sql_database.db,
    kubernetes_persistent_volume.files,
    kubernetes_persistent_volume_claim.files,
  ]

  metadata {
    name   = module.npm.ident
    labels = {
      app = module.npm.ident
    }
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = module.npm.ident
      }
    }
    strategy {
      type = "RollingUpdate"
      rolling_update {
        max_surge = 0
        max_unavailable = 1
      }
    }

    template {
      metadata {
        labels = {
          app = module.npm.ident
        }
      }

      spec {
        service_account_name = local.service_account
        volume {
          name = "files"
          persistent_volume_claim {
            claim_name = local.fs_name
          }
        }

        container {
          image = local.sidecar
          name  = "${module.npm.ident}-sql-proxy"
          args  = [
            var.db_connect
          ]
          security_context {
            run_as_non_root = true
          }
        }

        container {
          image = local.image
          name  = module.npm.ident
          env {
            name  = "REDMINE_DB_POSTGRES"
            value = "127.0.0.1"
          }
          env {
            name  = "REDMINE_DB_DATABASE"
            value = local.db_name
          }
          env {
            name  = "REDMINE_DB_PASSWORD"
            value_from {
              secret_key_ref {
                name = var.db_auth
                key  = "pass"
              }
            }
          }
          env {
            name  = "REDMINE_DB_USERNAME"
            value_from {
              secret_key_ref {
                name = var.db_auth
                key  = "user"
              }
            }
          }
          env {
            name  = "REDMINE_SECRET_KEY_BASE"
            value_from {
              secret_key_ref {
                name = local.redmine_secrets
                key  = "secret_key_base"
              }
            }
          }
          env {
            name  = "PORT"
            value = local.service_port
          }
          port {
            container_port = local.service_port
          }
          volume_mount {
            mount_path = "/usr/src/redmine/files"
            name       = "files"
          }
          readiness_probe {
            initial_delay_seconds = 5
            period_seconds = 16
            timeout_seconds = 16
            http_get {
              path = "/login"
              port = local.service_port
            }
          }
          liveness_probe {
            period_seconds = 16
            timeout_seconds = 16
            http_get {
              path = "/login"
              port = local.service_port
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "service" {
  depends_on = [kubernetes_deployment.deployment]
  metadata {
    name = module.npm.ident
    annotations = {
      "cloud.google.com/neg": "{\"ingress\": true}"
    }
  }
  spec {
    external_traffic_policy = "Cluster"
    selector = {
      app = module.npm.ident
    }
    session_affinity = "ClientIP"
    type = "NodePort"
    port {
      name        = "http"
      port        = local.service_port
      node_port   = local.service_port
      target_port = local.service_port
    }
  }
}

output "app" {
  value = module.npm.ident
}
