variable "DB_NAME" { type = string }
variable "DB_PASS" { type = string }
variable "DB_USER" { type = string }

resource "google_project_service" "artifactregistry" {
  depends_on = [google_project_service.cloudresourcemanager]
  service    = "artifactregistry.googleapis.com"
}

resource "google_project_service" "cloudbuild" {
  depends_on = [google_project_service.cloudresourcemanager]
  service    = "cloudbuild.googleapis.com"
}

resource "google_project_service" "cloudresourcemanager" {
  service = "cloudresourcemanager.googleapis.com"
}

resource "google_project_service" "cloudscheduler" {
  depends_on = [google_project_service.cloudresourcemanager]
  service    = "cloudscheduler.googleapis.com"
}

resource "google_project_service" "container" {
  depends_on = [google_project_service.cloudresourcemanager]
  service    = "container.googleapis.com"
}

resource "google_project_service" "containerregistry" {
  depends_on = [google_project_service.cloudresourcemanager]
  service    = "containerregistry.googleapis.com"
}

resource "google_project_service" "iam" {
  depends_on = [google_project_service.cloudresourcemanager]
  service    = "iam.googleapis.com"
}

resource "google_project_service" "dns" {
  depends_on = [google_project_service.cloudresourcemanager]
  service    = "dns.googleapis.com"
}

resource "google_project_service" "eventarc" {
  depends_on = [google_project_service.cloudresourcemanager]
  service    = "eventarc.googleapis.com"
}

resource "google_project_service" "servicenetworking" {
  depends_on = [google_project_service.cloudresourcemanager]
  service = "servicenetworking.googleapis.com"
}

resource "google_project_service" "run" {
  depends_on = [google_project_service.cloudresourcemanager]
  service    = "run.googleapis.com"
}

resource "google_project_service" "sqladmin" {
  depends_on = [google_project_service.cloudresourcemanager]
  service    = "sqladmin.googleapis.com"
}

resource "google_service_account" "runtime" {
  account_id   = local.common.service_account
  depends_on   = [google_project_service.iam]
  display_name = "Runtime ${terraform.workspace}"
}

resource "google_container_cluster" "primary" {
  depends_on = [google_project_service.container]
  name       = local.common.cluster
  location   = local.common.region
  

  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true
  initial_node_count       = 1
  node_locations           = [
    "europe-west1-c",
    "europe-west1-d",
  ]
}

resource "google_container_node_pool" "primary_node_pool" {
  depends_on = [google_container_cluster.primary]
  name       = local.common.cluster_pool
  location   = local.common.region
  cluster    = google_container_cluster.primary.name
  
  autoscaling {
    total_min_node_count = 0
    total_max_node_count = 10    
  }

  node_config {
    machine_type = "g1-small"
    # Google recommends custom service accounts that have cloud-platform scope and permissions granted via IAM Roles.
    service_account = google_service_account.runtime.email
    oauth_scopes    = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }

  timeouts {
    create = "30m"
    update = "30m"
  }
}

module "network" {
  common = local.common
  source = "./network"
}

module "db" {
  common  = local.common
  db_name = var.DB_NAME
  db_pass = var.DB_PASS
  db_user = var.DB_USER
  source  = "./db"
  vpc     = module.network.vpc
}