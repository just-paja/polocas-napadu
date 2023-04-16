resource "google_dns_record_set" "polocas_frontend_mx" {
  managed_zone = google_dns_managed_zone.polocas_napadu_cz.name
  name         = google_dns_managed_zone.polocas_napadu_cz.dns_name
  ttl          = local.ttl_default
  type         = "MX"
  rrdatas      = [
    "1 aspmx.l.google.com.",
    "5 alt1.aaspmx.l.google.com.",
    "5 alt2.aspmx.l.google.com.",
    "10 alt3.aspmx.l.google.com.",
    "10 alt4.aspmx.l.google.com.",
  ]
}

resource "google_dns_record_set" "polocas_nodash_mx" {
  managed_zone = google_dns_managed_zone.polocasnapadu_cz.name
  name         = google_dns_managed_zone.polocasnapadu_cz.dns_name
  ttl          = local.ttl_default
  type         = "MX"
  rrdatas      = [
    "1 aspmx.l.google.com.",
    "5 alt1.aaspmx.l.google.com.",
    "5 alt2.aspmx.l.google.com.",
    "10 alt3.aspmx.l.google.com.",
    "10 alt4.aspmx.l.google.com.",
  ]
}

resource "google_dns_record_set" "polocas_frontend_dkim" {
  managed_zone = google_dns_managed_zone.polocas_napadu_cz.name
  name         = "google._domainkey.${google_dns_managed_zone.polocas_napadu_cz.dns_name}"
  ttl          = local.ttl_default
  type         = "TXT"
  rrdatas      = [
    "\"v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAruuSnv8RMKNCQRi60apvvEANkY0KZxwYDh/cAjHkith4tTJXWoBqegDt24TXS7nzuwTUv5WkA9mIPwODRxFTVYz51Xh4HjwvRk0IUfuNoLsXPplrrzIRaQR0KzvxUGpYQPUr\" \"+i65eNZVHnLubTac6+Y4K7ols+aIGpCCotrlox11eHzu4Q3o2vD5758It95k\" \"Q1KAAvb9EGKAKaTSMJobo9f+IeJgjqbnjOAQ++FrCklwvGgLkj/jEA2u9rKpA+br6dPLa9C5DBeOdUolegfVJ0J7uygs/0UYTPicMu6+zJvZQhyxvkAf6oVcXbFtfMTRGWcCGolteFtAvTYjD3t19wIDAQAB\"",
  ]
}

resource "google_dns_record_set" "polocas_nodash_dkim" {
  managed_zone = google_dns_managed_zone.polocasnapadu_cz.name
  name         = "google._domainkey.${google_dns_managed_zone.polocasnapadu_cz.dns_name}"
  ttl          = local.ttl_default
  type         = "TXT"
  rrdatas      = [
    "\"v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2qPJXrdopAPhj7BXpw\" \"/4rUjMX5kISKHpGRUQzXzZjsrElI/JKmE9NDy6Ls4JCRL7wz0sWgXOmJSMgI8j8OwUWIcD9k/m9NQvOhs8LiAwjFS7\" \"/1WeYu1ckKzz3N00yDKXDUB54vSOEU9dSDoPJKL9gd6MEaKuNQ6TB4WQ7cJ0Ui2+zT1Il8/ILqN6B63GrdoeGi+I/BY4Pe1JZKyaEWNDreOtub\" \"jDui2StzXr1wob2We6sVna9u4sEsmXj3KQ2rQBjLx2VnAuyAfCs3SMgj1DCFdBchMDyo3WVRSgF6Q2JC+yWaMKr4cQYA9VQdnQgfq2JrhKMoohEts6Uva8xKFZJwIDAQAB\""
  ]
}
