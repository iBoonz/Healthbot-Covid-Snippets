#!/bin/bash
projectName="botdev"
location="westeurope"
resourceGroupName="RG-${projectName}"

az group create --name $resourceGroupName --location $location
az deployment group create \
  --name "deploy${projectName}" \
  --resource-group $resourceGroupName \
  --template-file template.json \
  --parameters @parameters.test.json
