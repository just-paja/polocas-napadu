resource "google_dns_record_set" "polocas_frontend_a" {
  managed_zone = google_dns_managed_zone.polocas_napadu_cz.name
  name         = google_dns_managed_zone.polocas_napadu_cz.dns_name
  rrdatas      = [var.ingress_ipv4]
  ttl          = local.ttl_default
  type         = "A"
}

resource "google_dns_record_set" "polocas_frontend_aaaa" {
  managed_zone = google_dns_managed_zone.polocas_napadu_cz.name
  name         = google_dns_managed_zone.polocas_napadu_cz.dns_name
  rrdatas      = [var.ingress_ipv6]
  ttl          = local.ttl_default
  type         = "AAAA"
}

resource "google_dns_record_set" "polocas_frontend_sub_all" {
  managed_zone = google_dns_managed_zone.polocas_napadu_cz.name
  name         = "*.${google_dns_managed_zone.polocas_napadu_cz.dns_name}"
  rrdatas      = [google_dns_managed_zone.polocas_napadu_cz.dns_name]
  ttl          = local.ttl_default
  type         = "CNAME"
}

resource "google_dns_record_set" "polocas_frontend_staging_sub_all" {
  managed_zone = google_dns_managed_zone.polocas_napadu_cz.name
  name         = "*.staging.${google_dns_managed_zone.polocas_napadu_cz.dns_name}"
  rrdatas      = [google_dns_managed_zone.polocas_napadu_cz.dns_name]
  ttl          = local.ttl_default
  type         = "CNAME"
}

resource "google_dns_record_set" "polocas_nodash_a" {
  managed_zone = google_dns_managed_zone.polocasnapadu_cz.name
  name         = google_dns_managed_zone.polocasnapadu_cz.dns_name
  rrdatas      = [var.ingress_ipv4]
  ttl          = local.ttl_default
  type         = "A"
}

resource "google_dns_record_set" "polocas_nodash_aaaa" {
  managed_zone = google_dns_managed_zone.polocasnapadu_cz.name
  name         = google_dns_managed_zone.polocasnapadu_cz.dns_name
  rrdatas      = [var.ingress_ipv6]
  ttl          = local.ttl_default
  type         = "AAAA"
}

resource "google_dns_record_set" "polocas_nodash_sub_all" {
  managed_zone = google_dns_managed_zone.polocasnapadu_cz.name
  name         = "*.${google_dns_managed_zone.polocasnapadu_cz.dns_name}"
  rrdatas      = [google_dns_managed_zone.polocas_napadu_cz.dns_name]
  ttl          = local.ttl_default
  type         = "CNAME"
}
