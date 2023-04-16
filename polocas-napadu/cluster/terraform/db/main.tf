variable "common" {}
variable "db_name" { type = string }
variable "db_pass" { type = string }
variable "db_user" { type = string }
variable "vpc" {}

resource "google_sql_database_instance" "master" {
  name             = "${var.common.root_env_prefix}-db"
  region           = var.common.region
  database_version = "POSTGRES_14"

  settings {
    tier      = "db-f1-micro"
    disk_size = 10
    disk_type = "PD_SSD"

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

resource "google_sql_database" "database" {
  depends_on = [google_sql_database_instance.master]
  name       = var.db_name
  instance   = google_sql_database_instance.master.name
}

resource "google_sql_user" "user" {
  instance = google_sql_database_instance.master.name
  name     = var.db_user
  password = var.db_pass
}
