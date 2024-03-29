import * as kulado from "@kulado/kulado";
import * as digitalocean from "@kulado/digitalocean";

const dropletCount = 3;
const region = digitalocean.Regions.NYC3;

const dropletTypeTag = new digitalocean.Tag("demo-app");
const userData =
    `#!/bin/bash
  sudo apt-get update
  sudo apt-get install -y nginx`;
const droplets = [];
for (let i = 0; i < dropletCount; i++) {
    let nameTag = new digitalocean.Tag(`web-${i}`);
    droplets.push(new digitalocean.Droplet(`web-${i}`, {
        image: "ubuntu-18-04-x64",
        region: region,
        privateNetworking: true,
        size: digitalocean.DropletSlugs.Droplet512mb,
        tags: [nameTag.id, dropletTypeTag.id],
        userData: userData,
    }));
}

const lb = new digitalocean.LoadBalancer("public", {
    dropletTag: dropletTypeTag.name,
    forwardingRules: [{
        entryPort: 80,
        entryProtocol: digitalocean.Protocols.HTTP,
        targetPort: 80,
        targetProtocol: digitalocean.Protocols.HTTP,
    }],
    healthcheck: {
        port: 80,
        protocol: digitalocean.Protocols.TCP,
    },
    region: region,
});

export const endpoint = lb.ip;
