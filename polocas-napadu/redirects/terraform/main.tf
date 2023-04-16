module "npm" {
  common = local.common
  root   = abspath("${path.module}/..")
  source = "../../../tf/npm"
}

locals {
  image = "${local.common.docker_repo}/${local.common.project}/${module.npm.pkg_ident}:${module.npm.revision}"
  redirects = [
    {
		  test: "(.*)\\.?polocasnapadu.cz",
		  target: "$1polocas-napadu.cz",
		},
    {
      test = "(.*)\\.?longforman.cz",
      target = "$1longforman.cz",
    },
  ]
}

data "google_client_config" "default" {}
data "google_container_cluster" "primary" {
  name     = local.common.cluster
  location = local.common.region
}

provider "kubernetes" {
  host                   = "https://${data.google_container_cluster.primary.endpoint}"
  token                  = data.google_client_config.default.access_token
  cluster_ca_certificate = base64decode(data.google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
}

resource "kubernetes_namespace" "test" {
  metadata {
    name = module.npm.ident
  }
}

resource "kubernetes_deployment" "test" {
  metadata {
    name      = module.npm.ident
    namespace = kubernetes_namespace.test.metadata.0.name
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
            value = 80
          }          
          port {
            container_port = 80
          }
        }
      }
    }
  }
}