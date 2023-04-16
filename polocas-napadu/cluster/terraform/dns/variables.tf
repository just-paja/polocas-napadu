variable "common" {}

variable "ingress_ipv4" {
  description = "The default public IPv4 address for the cluster ingress."
  type = string
}

variable "ingress_ipv6" {
  description = "The default public IPv6 address for the cluster ingress."
  type = string
}
