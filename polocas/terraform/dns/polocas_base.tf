locals {
  ttl_default = "1800"
}

resource "google_dns_managed_zone" "polocas_napadu_cz" {
  name     = "${var.common.root_env_prefix}-polocas-napadu"
  dns_name = "polocas-napadu.cz."
}

resource "google_dns_managed_zone" "polocasnapadu_cz" {
  name     = "${var.common.root_env_prefix}-polocasnapadu"
  dns_name = "polocasnapadu.cz."
}
