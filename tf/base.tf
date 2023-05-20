variable "BUCKET_TERRAFORM" { type = string }
variable "GCP_PROJECT" { type = string }
variable "GOOGLE_CREDENTIALS" { type = string }

variable "GCP_CONTINENT" {
  default = "EU"
  type = string
}

variable "GCP_REGION" {
  default = "europe-west1"
  type = string
}

variable "GCP_DOCKER_REPO" {
  type = string
  default = "eu.gcr.io"
}

locals {
  /*
    Assume terraform workspace matches naming convention
    "${project}-${env_stage}" and take out the stage as the underlying base
    infrastructure stage.
  */
  root_env_stage   = replace(terraform.workspace, "/^.+-/", "")
  root_env_prefix  = "cluster"
  service_account  = "${terraform.workspace}-runtime"
}

locals {
  cluster    = "le-primary"
  continent  = var.GCP_CONTINENT
  production = local.root_env_stage == "pn"
  region     = var.GCP_REGION
  root_dir   = abspath("${dirname(abspath(path.module))}/..")
  root_env   = "${local.root_env_prefix}-${local.root_env_stage}"
}

locals {
  credentials = jsondecode(var.GOOGLE_CREDENTIALS)
  common = {
    bucket_terraform = local.cluster
    cluster          = "le-primary"
    cluster_pool     = "le-web"
    continent        = local.continent
    db_proxy_image   = "gcr.io/cloud-sql-connectors/cloud-sql-proxy:2.1.0"
    dist_dir         = abspath("${local.root_dir}/dist")
    docker_repo      = var.GCP_DOCKER_REPO
    production       = local.production
    project          = var.GCP_PROJECT
    region           = local.region
    zone_base        = "${local.region}-c"

    /*
      There is no way to fit everything in a single region because of service
      availability. We have chosen an alternative region for low bandwidth
      services. For example Cloud Scheduler is not available everywhere.
     */
    region_low       = "europe-west1"
    root_dir         = local.root_dir
    root_env         = local.root_env
    root_env_prefix  = local.root_env_prefix
    root_env_stage   = local.root_env_stage
    service_account  = local.service_account
    tz               = "Europe/Prague"
    user             = "${local.service_account}@${var.GCP_PROJECT}.iam.gserviceaccount.com"

    /*
      All resources that need to scale across continent should be using
      `location_large`. The variable will be using local region for
      non-production environments and continent size regions for production.
     */
    location_large   = local.production ? local.continent : local.region
    
    /*
      All Cloud Function instances that need to scale to maximum should use
      this variable. It will cut max instance count for non-production
      environments to avoid extensive money loss.
    */
    max_cf_instances = local.production ? 3000 : 64
  }
}

terraform {
  backend "gcs" {
    prefix = "state"
  }
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "~> 4.57.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.0"
    }
  }
}

provider "google" {
  project     = var.GCP_PROJECT
  region      = var.GCP_REGION
  credentials = var.GOOGLE_CREDENTIALS
}
