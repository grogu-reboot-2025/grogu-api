#!/bin/bash

set -e  # Exit immediately if any command fails

ACR_NAME="grogucr"
IMAGE_NAME="grogu-api"
IMAGE_TAG="v1"
RESOURCE_GROUP="Team01"

LOGIN_SERVER="${ACR_NAME}.azurecr.io"
FULL_IMAGE="${LOGIN_SERVER}/${IMAGE_NAME}:${IMAGE_TAG}"

echo "🔧 Building Docker image: $FULL_IMAGE"
docker build -t $FULL_IMAGE . || { echo "Error: Docker build failed."; exit 1; }

echo "🔐 Logging into ACR: $ACR_NAME"
az acr login --name $ACR_NAME || { echo "Error: Failed to login to ACR."; exit 1; }

echo "🚀 Pushing Docker image to ACR"
docker push $FULL_IMAGE || { echo "Error: Docker push failed."; exit 1; }

echo "✅ Done! Image pushed to $FULL_IMAGE"
