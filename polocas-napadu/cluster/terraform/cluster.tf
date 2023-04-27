resource "google_project_iam_member" "runtime_client" {
  member  = "serviceAccount:${google_service_account.runtime.email}"
  project = local.common.project
  role    = "roles/logging.logWriter"
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
  networking_mode          = "VPC_NATIVE"
  node_locations           = [local.common.zone_base]
  network                  = module.network.vpc
  subnetwork               = module.network.subnetwork

  workload_identity_config {
    workload_pool = "${local.common.project}.svc.id.goog"
  }

  addons_config {
    gcp_filestore_csi_driver_config {
      enabled = true
    }
  }

  ip_allocation_policy {
    cluster_secondary_range_name = "pods"
    services_secondary_range_name = "services"
  }

  logging_config {
    enable_components = ["SYSTEM_COMPONENTS", "WORKLOADS"]
  }

  maintenance_policy {
    daily_maintenance_window {
      start_time = "02:00"
    }
  }
}

resource "google_container_node_pool" "primary_node_pool" {
  cluster        = google_container_cluster.primary.name
  depends_on     = [google_container_cluster.primary]
  location       = local.common.region
  name           = local.common.cluster_pool
  node_locations = [local.common.zone_base]
  
  autoscaling {
    total_min_node_count = 1
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

data "google_client_config" "default" {}

provider "kubernetes" {
  host                   = "https://${google_container_cluster.primary.endpoint}"
  token                  = data.google_client_config.default.access_token
  cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
  ignore_annotations = [
    "^cloud\\.google\\.com\\/neg-status$",
  ]
}
