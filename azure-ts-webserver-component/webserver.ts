import * as kulado from "@kulado/kulado";
import * as azure from "@kulado/azure";

/**
 * WebServer is a reusable web server component that creates and exports a NIC, public IP, and VM.
 */
export class WebServer extends kulado.ComponentResource {
    public readonly publicIp: azure.network.PublicIp;
    public readonly networkInterface: azure.network.NetworkInterface;
    public readonly vm: azure.compute.VirtualMachine;

    /**
     * Allocate a new web server VM, NIC, and public IP address.
     * @param name The name of the web server resource.
     * @param args A bag of arguments to control the web server VM creation.
     */
    constructor(name: string, args: WebServerArgs) {
        super("ws-ts-azure-comp:webserver:WebServer", name);

        // Allocate a public IP and assign it to our NIC.
        this.publicIp = new azure.network.PublicIp(`${name}-ip`, {
            resourceGroupName: args.resourceGroupName,
            allocationMethod: "Dynamic",
        }, { parent: this });
        this.networkInterface = new azure.network.NetworkInterface(`${name}-nic`, {
            resourceGroupName: args.resourceGroupName,
            ipConfigurations: [{
                name: "webserveripcfg",
                subnetId: args.subnetId,
                privateIpAddressAllocation: "Dynamic",
                publicIpAddressId: this.publicIp.id,
            }],
        }, { parent: this });

        // Now create the VM, using the resource group and NIC allocated above.
        this.vm = new azure.compute.VirtualMachine(`${name}-vm`, {
            resourceGroupName: args.resourceGroupName,
            networkInterfaceIds: [this.networkInterface.id],
            vmSize: args.vmSize || "Standard_A0",
            deleteDataDisksOnTermination: true,
            deleteOsDiskOnTermination: true,
            osProfile: {
                computerName: "hostname",
                adminUsername: args.username,
                adminPassword: args.password,
                customData: args.bootScript,
            },
            osProfileLinuxConfig: {
                disablePasswordAuthentication: false,
            },
            storageOsDisk: {
                createOption: "FromImage",
                name: `${name}-osdisk1`,
            },
            storageImageReference: {
                publisher: "canonical",
                offer: "UbuntuServer",
                sku: "16.04-LTS",
                version: "latest",
            },
        }, { parent: this });
    }

    public getIpAddress(): kulado.Output<string> {
        // The public IP address is not allocated until the VM is running, so wait for that
        // resource to create, and then lookup the IP address again to report its public IP.
        const ready = kulado.all({ _: this.vm.id, name: this.publicIp.name, resourceGroupName: this.publicIp.resourceGroupName });
        return ready.apply(async d => {
            const ip = await azure.network.getPublicIP({ name: d.name, resourceGroupName: d.resourceGroupName });
            return ip.ipAddress;
        });
    }
}

export interface WebServerArgs {
    /**
     * A required username for the VM login.
     */
    username: kulado.Input<string>;
    /**
     * A required encrypted password for the VM password.
     */
    password: kulado.Input<string>;
    /**
     * An optional boot script that the VM will use.
     */
    bootScript?: kulado.Input<string>;
    /**
     * An optional VM size; if unspecified, Standard_A0 (micro) will be used.
     */
    vmSize?: kulado.Input<string>;
    /**
     * A required Resource Group in which to create the VM
     */
    resourceGroupName: kulado.Input<string>;
    /**
     * A required Subnet in which to deploy the VM
     */
    subnetId: kulado.Input<string>;
}
