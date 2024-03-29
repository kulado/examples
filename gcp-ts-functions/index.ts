import * as gcp from "@kulado/gcp";

let greeting = new gcp.cloudfunctions.HttpCallbackFunction("greeting", (req, res) => {
    res.send(`Greetings from ${req.body.name || 'Google Cloud Functions'}!`);
});

export let url = greeting.httpsTriggerUrl;
