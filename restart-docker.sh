#!/usr/bin/env bash
set -e

DOCKER_NAME=$1
DASHBOARD_DIR=/home/ubuntu/proj/${DOCKER_NAME}

docker rm -f $1 || true
docker build -t argussecurity/$1 ${DASHBOARD_DIR}
docker run -d --name $1 argussecurity/$1
