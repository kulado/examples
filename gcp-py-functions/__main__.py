"""Python Kulado program for creating Google Cloud Functions.

Create a single Google Cloud Function. The deployed application will calculate
the estimated travel time to a given location, sending the results via SMS.
"""

import time
import os
import kulado

from kulado_gcp import storage
from kulado_gcp import cloudfunctions

# Disable rule for that module-level exports be ALL_CAPS, for legibility.
# pylint: disable=C0103

# File path to where the Cloud Function's source code is located.
PATH_TO_SOURCE_CODE = "./functions"

# Get values from Kulado config to use as environment variables in our Cloud Function.
config = kulado.Config(name=None)
config_values = {
    # Target destination and travel time offset.
    "DESTINATION": config.get("destination"),
    "TRAVEL_OFFSET": config.get("travelOffset"),

    # Google Maps API key.
    "GOOGLE_MAPS_API_KEY": config.get("googleMapsApiKey"),

    # Twilio account for sending SMS messages.
    "TWILLIO_ACCESS_TOKEN": config.get("twillioAccessToken"),
    "TWILLIO_ACCOUNT_SID": config.get("twillioAccountSid"),
    "TO_PHONE_NUMBER": config.get("toPhoneNumber"),
    "FROM_PHONE_NUMBER": config.get("fromPhoneNumber"),
}

# We will store the source code to the Cloud Function in a Google Cloud Storage bucket.
bucket = storage.Bucket("eta_demo_bucket")

# The Cloud Function source code itself needs to be zipped up into an
# archive, which we create using the kulado.AssetArchive primitive.
assets = {}
for file in os.listdir(PATH_TO_SOURCE_CODE):
    location = os.path.join(PATH_TO_SOURCE_CODE, file)
    asset = kulado.FileAsset(path=location)
    assets[file] = asset

archive = kulado.AssetArchive(assets=assets)

# Create the single Cloud Storage object, which contains all of the function's
# source code. ("main.py" and "requirements.txt".)
source_archive_object = storage.BucketObject(
    "eta_demo_object",
    name="main.py-%f" % time.time(),
    bucket=bucket.name,
    source=archive)

# Create the Cloud Function, deploying the source we just uploaded to Google
# Cloud Storage.
fxn = cloudfunctions.Function(
    "eta_demo_function",
    entry_point="get_demo",
    environment_variables=config_values,
    region="us-central1",
    runtime="python37",
    source_archive_bucket=bucket.name,
    source_archive_object=source_archive_object.name,
    trigger_http=True)

# Export the DNS name of the bucket and the cloud function URL.
kulado.export("bucket_name", bucket.url)
kulado.export("fxn_url", fxn.https_trigger_url)
