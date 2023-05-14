variable "common" {}
variable "root_password" { type = string }
variable "runtime_account" {}
variable "vpc" {}

locals {
  secret_auth = "${var.common.root_env_prefix}-db-auth"
}

resource "google_sql_database_instance" "master" {
  database_version  = "POSTGRES_14"
  name              = "${var.common.root_env_prefix}-db"
  region            = var.common.region
  root_password     = var.root_password

  settings {
  availability_type = "ZONAL"
    disk_size = 10
    disk_type = "PD_SSD"
    tier      = "db-f1-micro"

    backup_configuration {
      enabled = true
      point_in_time_recovery_enabled = true
    }

    location_preference {
      zone = var.common.zone_base
    }

    ip_configuration {
      ipv4_enabled    = true
      private_network = var.vpc
      authorized_networks {
        name  = "Global"
        value = "0.0.0.0/0"
      }
    }
  }
}

resource "google_sql_user" "user" {
  instance = google_sql_database_instance.master.name
  name     = var.common.db_user
  password = var.common.db_pass
}

resource "kubernetes_secret_v1" "secret_auth" {
  metadata {
    name = local.secret_auth
  }
  data = {
    "user" = var.common.db_user,
    "pass" = var.common.db_pass,
  }
}

resource "google_project_iam_member" "runtime_client" {
  member  = "serviceAccount:${var.runtime_account.email}"
  project = var.common.project
  role    = "roles/cloudsql.client"
}

output "secret_auth" {
  value = local.secret_auth
}

output "instance" {
  value = google_sql_database_instance.master.name
}

output "connection_name" {
  value = google_sql_database_instance.master.connection_name
}
