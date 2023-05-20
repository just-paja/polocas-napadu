variable "API_SECRET_KEY" { type = string }
variable "DB_PASS" { type = string }
variable "DB_ROOT_PASSWORD" { type = string }
variable "DB_USER" { type = string }
variable "EMAIL_PASS" { type = string }
variable "EMAIL_USER" { type = string }
variable "REDMINE_SECRET_KEY_BASE" { type = string }


variable "RECAPTCHA_PRIVATE" {
  default = ""
  type    = string
}

variable "RECAPTCHA_PUBLIC" { 
  default = ""
  type    = string 
}

variable "API_SSO_ID" { 
  default = ""
  type    = string
}

variable "API_SSO_SECRET" { 
  default = ""
  type    = string 
}

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
    db_pass = var.DB_PASS
    db_user = var.DB_USER
    email_host = "smtp-relay.gmail.com"
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
  secret_base     = var.REDMINE_SECRET_KEY_BASE
  source          = "../redmine"
}

module "api" {
  common            = local.cluster_common
  db_auth           = module.db.secret_auth
  db_connect        = module.db.connection_name
  db_instance       = module.db.instance
  runtime_account   = google_service_account.runtime
  recaptcha_private = var.RECAPTCHA_PRIVATE
  recaptcha_public  = var.RECAPTCHA_PUBLIC
  secret_key        = var.API_SECRET_KEY
  sso_id            = var.API_SSO_ID
  sso_secret        = var.API_SSO_SECRET
  source            = "../api"
}