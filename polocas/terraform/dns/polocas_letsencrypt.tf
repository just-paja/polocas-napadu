resource "google_dns_record_set" "polocas_frontend_caa" {
  managed_zone = google_dns_managed_zone.polocas_napadu_cz.name
  name         = google_dns_managed_zone.polocas_napadu_cz.dns_name
  rrdatas      = ["128 issue \"letsencrypt.org\""]
  ttl          = local.ttl_default
  type         = "CAA"
}

resource "google_dns_record_set" "polocas_nodash_caa" {
  managed_zone = google_dns_managed_zone.polocasnapadu_cz.name
  name         = google_dns_managed_zone.polocasnapadu_cz.dns_name
  rrdatas      = ["128 issue \"letsencrypt.org\""]
  ttl          = local.ttl_default
  type         = "CAA"
}
