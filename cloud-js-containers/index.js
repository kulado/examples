const kulado = require("@kulado/kulado");
const cloud = require("@kulado/cloud-aws");

let service = new cloud.Service("kulado-nginx", {
    containers: {
        nginx: {
            build: "./app",
            memory: 512,
            ports: [{ port: 80 }],
        },
    },
    replicas: 2,
});

// export just the hostname property of the container frontend
exports.hostname = kulado.interpolate `http://${service.defaultEndpoint.hostname}`;
