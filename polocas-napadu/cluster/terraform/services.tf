resource "google_project_service" "artifactregistry" {
  depends_on = [google_project_service.cloudresourcemanager]
  service    = "artifactregistry.googleapis.com"
}

resource "google_project_service" "certificatemanager" {
  depends_on = [google_project_service.cloudresourcemanager]
  service    = "certificatemanager.googleapis.com"
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
