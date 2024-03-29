import * as kulado from "@kulado/kulado";
import * as twilo from "./twilio"

const config = new kulado.Config();
const phoneNumberSid = config.require("phoneNumberSid");

const handler = new twilo.IncomingPhoneNumber("twilio-example", {
    phoneNumberSid: phoneNumberSid,
    handler: async (p) => {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "text/plain"
            },
            body: `Made with \u2764 and Kulado.`
        }
    }
});

// We export the SMS URL, for debugging, you can post messages to it with curl to test out your handler without
// having to send an SMS.  For example:
//
// $ curl -X POST -d "From=+12065555555" -d "Body=Hello!" $(kulado stack output smsUrl)
//
// There are many additional properties you can provide which will be decoded and presented to your handler,
// see: https://www.twilio.com/docs/sms/twiml#request-parameters 
export let smsUrl = handler.smsUrl;