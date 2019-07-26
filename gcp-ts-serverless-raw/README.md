[![Deploy](https://get.kulado.com/new/button.svg)](https://app.kulado.com/new)

# Google Cloud Functions in Python and Go deployed with TypeScript

This example deploys two Google Cloud Functions. "Hello World" functions are implemented in Python and Go. Kulado program is implemented in TypeScript.

```bash
# Create and configure a new stack
$ kulado stack init testing
$ kulado config set gcp:project <your-gcp-project>
$ kulado config set gcp:region <gcp-region>

# Install dependencies
$ npm install

# Preview and run the deployment
$ kulado up
Previewing changes:
...
Performing changes:
...
info: 6 changes performed:
    + 6 resources created
Update duration: 1m14s

# Test it out
$ curl $(kulado stack output pythonEndpoint)
"Hello World!"
$ curl $(kulado stack output goEndpoint)
"Hello World!"

# Remove the app
$ kulado destroy
```
