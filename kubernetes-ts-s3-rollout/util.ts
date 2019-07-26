import * as kulado from "@kulado/kulado";
import * as aws from "@kulado/aws";

// Utility function that creates a container that `curl`s a URL, placing it in a file in some shared
// volume, namely at `${mount.mountPath}/${fileName}`. For example, `mount.mountPath` might be the
// nginx config path, `/etc/nginx/conf.d`, and `filename` might be the default file, `default.conf`.
// This container would them place them in the shared volume at `/etc/nginx/conf.d/default.conf`.
export function curl(
    url: kulado.Output<string>,
    fileName: string,
    mount: { name: kulado.Input<string>; mountPath: kulado.Input<string> }
) {
    return {
        name: "curl",
        image: "byrnedo/alpine-curl",
        args: kulado
            .all([url, mount.mountPath])
            .apply(([url, mountPath]) => ["-o", `${mountPath}/${fileName}`, "-sL", url]),
        volumeMounts: [mount]
    };
}
