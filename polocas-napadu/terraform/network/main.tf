variable "common" {}

locals {
  address_name_ipv4 = "le-public-ipv4"
  address_name_ipv6 = "le-public-ipv6"
  vpc_name          = "${var.common.root_env_prefix}-network"
  vpc_subnetwork    = "${var.common.root_env_prefix}-subnetwork"
}

resource "google_compute_network" "vpc" {
  name                    = local.vpc_name
  routing_mode            = "REGIONAL"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnetwork" {
  ip_cidr_range = "10.2.0.0/16"
  name           = local.vpc_subnetwork
  network       = google_compute_network.vpc.id

  secondary_ip_range {
    range_name    = "services"
    ip_cidr_range = "10.3.0.0/16"
  }

  secondary_ip_range {
    range_name    = "pods"
    ip_cidr_range = "10.4.0.0/16"
  }
}

resource "google_compute_global_address" "private_ip_block" {
  name          = "${var.common.root_env_prefix}-ip-block"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  ip_version    = "IPV4"
  prefix_length = 20
  network       = google_compute_network.vpc.self_link
}

resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = google_compute_network.vpc.self_link
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_block.name]
}

resource "google_compute_global_address" "public_ipv4" {
  name           = local.address_name_ipv4
  address_type   = "EXTERNAL"
  ip_version     = "IPV4"
}

resource "google_compute_global_address" "public_ipv6" {
  name           = local.address_name_ipv6
  address_type   = "EXTERNAL"
  ip_version     = "IPV6"
}

resource "google_compute_network_firewall_policy" "health_checks" {
  name = "${var.common.root_env_prefix}-health-checks"
}

resource "google_compute_network_firewall_policy_rule" "health_checks_addrs" {
  action          = "allow"
  description     = "Allow access from documented health check sources"
  direction       = "INGRESS"
  disabled        = false
  enable_logging  = false
  firewall_policy = google_compute_network_firewall_policy.health_checks.name
  priority        = 1000
  rule_name       = "${var.common.root_env_prefix}-health-checks-addrs"
  match {
    src_ip_ranges = ["130.211.0.0/22", "35.191.0.0/16"]
    layer4_configs {
      ip_protocol = "all"
    }
  }
}

output "vpc" {
  value = google_compute_network.vpc.self_link
}

output "subnetwork" {
  value = google_compute_subnetwork.subnetwork.self_link
}

output "vpc_name" {
  value = local.vpc_name
}

output "public_address_ipv4" {
  value = google_compute_global_address.public_ipv4
}

output "public_address_ipv6" {
  value = google_compute_global_address.public_ipv6
}
