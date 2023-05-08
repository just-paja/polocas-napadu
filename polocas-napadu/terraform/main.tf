variable "DB_NAME" { type = string }
variable "DB_PASS" { type = string }
variable "DB_ROOT_PASSWORD" { type = string }
variable "DB_USER" { type = string }
variable "EMAIL_PASS" { type = string }
variable "EMAIL_USER" { type = string }
variable "REDMINE_SECRET_KEY_BASE" { type = string }

resource "google_iam_workload_identity_pool" "default" {
  workload_identity_pool_id = local.common.project
  display_name              = "Default identity pool"
  description               = "Default identity pool created for project cluster"
}

resource "google_service_account" "runtime" {
  account_id   = local.common.service_account
  depends_on   = [google_project_service.iam]
  display_name = "Runtime ${local.common.root_env_prefix}"
}

module "network" {
  common = local.common
  source = "./network"
}

locals {
  cluster_common = merge(local.common, {
    cluster = google_container_cluster.primary
    db_name = var.DB_NAME
    db_pass = var.DB_PASS
    db_user = var.DB_USER
    email_pass = var.EMAIL_PASS
    email_user = var.EMAIL_USER
  })
}

module "db" {
  common          = local.cluster_common
  root_password   = var.DB_ROOT_PASSWORD
  runtime_account = google_service_account.runtime
  source          = "./db"
  vpc             = module.network.vpc
}

module "dns" {
  common = local.cluster_common
  ingress_ipv4 = module.network.public_address_ipv4.address
  ingress_ipv6 = module.network.public_address_ipv6.address
  source = "./dns"
}

module "redirects" {
  common = local.cluster_common
  source = "../redirects"
}

module "redmine" {
  common          = local.cluster_common
  db_auth         = module.db.secret_auth
  db_connect      = module.db.connection_name
  db_instance     = module.db.instance
  runtime_account = google_service_account.runtime
  network_name    = module.network.vpc_name
  secret_base     = var.REDMINE_SECRET_KEY_BASE
  source          = "../redmine"
}
