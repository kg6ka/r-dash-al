#!/usr/bin/env bash
set -e

DASHBOARD_DIR=/home/ubuntu/proj/dashboard

docker rm -f dashboard
docker build -t argussecurity/dashboard ${DASHBOARD_DIR}
docker run -d --name dashboard argussecurity/dashboard

