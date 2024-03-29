import * as kulado from "@kulado/kulado";
import * as azure from "@kulado/azure";

const config = new kulado.Config();
const username = config.require("username");
const password = config.require("password");

// Create an Azure Resource Group
const resourceGroup = new azure.core.ResourceGroup("spark-rg", {
    location: azure.Locations.WestUS,
});

// Create a storage account and a container for Spark
const storageAccount = new azure.storage.Account("sparksa", {
    resourceGroupName: resourceGroup.name,
    accountReplicationType: "LRS",
    accountTier: "Standard",
});

const storageContainer = new azure.storage.Container("spark", {
    resourceGroupName: resourceGroup.name,
    storageAccountName: storageAccount.name,
    containerAccessType: "private",
});

// Create a Spark cluster in HDInsight
const sparkCluster = new azure.hdinsight.SparkCluster("myspark", {
    resourceGroupName: resourceGroup.name,
    clusterVersion: "3.6",
    componentVersion: {
        spark: "2.3",
    },
    tier: "Standard",
    storageAccounts: [{
        isDefault: true,
        storageAccountKey: storageAccount.primaryAccessKey,
        storageContainerId: storageContainer.id,
    }],
    gateway: {
        enabled: true,
        username,
        password,
    },
    roles: {
        headNode: {
            vmSize: "Standard_A3",
            username,
            password,
        },
        workerNode: {
            targetInstanceCount: 3,
            vmSize: "Standard_A3",
            username,
            password,
        },
        zookeeperNode: {
            vmSize: "Standard_A3",
            username,
            password,
        },
    },
});

// Export the endpoint
export const endpoint = kulado.interpolate`https://${sparkCluster.httpsEndpoint}/`;
