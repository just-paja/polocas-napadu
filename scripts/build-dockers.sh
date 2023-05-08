#!/usr/bin/env bash

set -e

script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
root_dir=$(realpath $script_dir/..)
sources=$(find -name Dockerfile | grep -v node_modules)

cd $root_dir

GOOGLE_APPLICATION_CREDENTIALS=$(realpath ./terraform-credentials.json)
echo "$TF_VAR_GOOGLE_CREDENTIALS" > $GOOGLE_APPLICATION_CREDENTIALS

gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
gcloud auth configure-docker --quiet

for src in $sources; do
  echo "-n Reading $src"
  cd $(dirname $src)
  name=$(cat package.json | jq ".name" | xargs echo)
  name="${name/@/}"
  name="${name/\//-}"
  revision=$(git rev-parse HEAD)
  registry=eu.gcr.io
  image_name="${registry}/${TF_VAR_GCP_PROJECT}/${name}:${revision}"
  echo -n "Building $image_name"
  docker build -t $image_name .
  echo -n "\rPushing $image_name"
  docker push ${image_name}
  echo -e "\rPushed $image_name"
  cd $root_dir
done

set +x
