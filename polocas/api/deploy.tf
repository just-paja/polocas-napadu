variable "common" {}
variable "db_auth" { type = string }
variable "db_connect" { type = string }
variable "db_instance" { type = string }
variable "runtime_account" {}
variable "secret_key" { type = string }

variable "recaptcha_private" {
  default = ""
  type    = string
}

variable "recaptcha_public" {
  default = ""
  type    = string 
}

variable "sso_id" {
  default = ""
  type    = string
}

variable "sso_secret" {
  default = ""
  type    = string 
}

variable "app_inspirations_url" {
  default = "https://interactive.polocas-napadu.cz/inspirations"
  type    = string
}

variable "app_referee_url" {
  default = "https://interactive.polocas-napadu.cz/referee"
  type = string
}

variable "app_scoreboard_url" {
  default = "https://interactive.polocas-napadu.cz/scoreboard"
  type    = string
}

variable "app_website_url" {
  default = "https://polocas-napadu.cz"
  type    = string
}

module "npm" {
  common = var.common
  root   = path.module
  source = "../../tf/npm"
}

locals {
  db_name         = "${terraform.workspace}-main"
  image           = "${var.common.docker_repo}/${var.common.project}/${module.npm.pkg_ident}:${module.npm.revision}"
  service_port    = 30001
  service_account = "${terraform.workspace}-api-db"
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

resource "google_sql_database" "db" {
  name     = local.db_name
  instance = var.db_instance
}

resource "kubernetes_deployment" "deployment" {
  depends_on = [google_sql_database.db]
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
        container {
          image = var.common.db_proxy_image
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
            name  = "PORT"
            value = local.service_port
          }
          env {
            name  = "APP_REFEREE_URL"
            value = var.app_referee_url
          }
          env {
            name  = "APP_SCOREBOARD_URL"
            value = var.app_scoreboard_url
          }
          env {
            name  = "APP_INSPIRATIONS_URL"
            value = var.app_inspirations_url
          }
          env {
            name  = "APP_WEBSITE_URL"
            value = var.app_website_url
          }
          env {
            name  = "DB_HOST"
            value = "127.0.0.1"
          }
          env {
            name  = "DB_NAME"
            value = local.db_name
          }
          env {
            name  = "DB_PASS"
            value = var.common.db_pass
          }
          env {
            name  = "DB_USER"
            value = var.common.db_user
          }
          env {
            name  = "PROJECT_ENVIRONMENT"
            value = "production"
          }
          env {
            name  = "SECRET_KEY"
            value = var.secret_key
          }
          env {
            name  = "EMAIL_HOST"
            value = var.common.email_host
          }
          env {
            name  = "EMAIL_PASS"
            value = var.common.email_pass
          }
          env {
            name  = "EMAIL_USER"
            value = var.common.email_user
          }
          env {
            name  = "RECAPTCHA_PRIVATE_KEY"
            value = var.recaptcha_private
          }
          env {
            name  = "RECAPTCHA_PUBLIC_KEY"
            value = var.recaptcha_public
          }
          env {
            name  = "SSO_OAUTH_CLIENT_ID"
            value = var.sso_id
          }
          env {
            name  = "SSO_OAUTH_CLIENT_SECRET"
            value = var.sso_secret
          }
          port {
            container_port = local.service_port
          }
          liveness_probe {
            period_seconds = 16
            timeout_seconds = 16
            http_get {
              path = "/graphql"
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


resource "kubernetes_job" "migrations" {
  metadata {
    name = "${module.npm.ident}-migrations"
  }

  wait_for_completion = true

  timeouts {
    create = "3m"
    update = "3m"
  }

  spec {
    backoff_limit = 3

    template {
      metadata {
        name = "${module.npm.ident}-migrations"
      }

      spec {
        restart_policy = "Never"

        container {
          image = var.common.db_proxy_image
          name  = "${module.npm.ident}-sql-proxy"
          args  = [
            var.db_connect
          ]
          security_context {
            run_as_non_root = true
          }
        }

        container {
          name    = "${module.npm.ident}-migrations"
          image   = local.image
          command = ["python", "manage.py", "migrate"]
          env {
            name  = "DB_HOST"
            value = "127.0.0.1"
          }
          env {
            name  = "DB_NAME"
            value = local.db_name
          }
          env {
            name  = "DB_PASS"
            value = var.common.db_pass
          }
          env {
            name  = "DB_USER"
            value = var.common.db_user
          }
          env {
            name  = "SECRET_KEY"
            value = var.secret_key
          }
        }
      }
    }
  }
}


output "app" {
  value = module.npm.ident
}