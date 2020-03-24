$projectName = "covidBert"
$location = "westeurope"
$resourceGroupName = "${projectName}-RG"
New-AzResourceGroup -Name $resourceGroupName -Location $location -Force
New-AzResourceGroupDeployment -ResourceGroupName $resourceGroupName -TemplateFile ".\template.json" -TemplateParameterFile ".\parameters.test.json"