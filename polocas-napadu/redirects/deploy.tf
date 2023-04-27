variable "common" {}

module "npm" {
  common = var.common
  root   = path.module
  source = "../../tf/npm"
}

locals {
  image = "${var.common.docker_repo}/${var.common.project}/${module.npm.pkg_ident}:${module.npm.revision}"
  service_port = 30000
  redirects = [
    {
      test: "www.polocasnapadu.cz",
      target: "polocas-napadu.cz",
      permanent: true,
    },
    {
      test: "www.longforman.cz",
      target: "longforman.cz",
      permanent: true,
    },
    {
      test: "(.*)\\.?polocasnapadu.cz",
      target: "$1polocas-napadu.cz",
    },
  ]
}

resource "kubernetes_deployment" "deployment" {
  metadata {
    name   = module.npm.ident
    labels = {
      app = module.npm.ident
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = module.npm.ident
      }
    }

    template {
      metadata {
        labels = {
          app = module.npm.ident
        }
      }
      spec {
        container {
          image = local.image
          name  = module.npm.ident
          env {
            name  = "REDIRECTS"
            value = jsonencode(local.redirects)
          }
          env {
            name  = "PORT"
            value = local.service_port
          }
          port {
            container_port = local.service_port
          }
          liveness_probe {
            period_seconds = 16
            timeout_seconds = 16
            http_get {
              path = "/health"
              port = local.service_port
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "service" {
  depends_on = [kubernetes_deployment.deployment]
  metadata {
    name = module.npm.ident
    annotations = {
      "cloud.google.com/neg": "{\"ingress\": true}"
    }
  }
  spec {
    external_traffic_policy = "Cluster"
    selector = {
      app = module.npm.ident
    }
    session_affinity = "ClientIP"
    type = "NodePort"
    port {
      name        = "http"
      port        = local.service_port
      node_port   = local.service_port
      target_port = local.service_port
    }
  }
}

output "app" {
  value = module.npm.ident
}
