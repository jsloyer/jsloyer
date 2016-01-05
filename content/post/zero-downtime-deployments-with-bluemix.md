+++
categories = ["Development", "golang"]
date = "2014-08-18T22:10:32-05:00"
description = ""
draft = false
image = "/images/unplug.jpg"
tags = ["go", "golang", "templates", "themes", "development"]
title = "Zero Downtime Deployments with Bluemix"
aliases = [
    "2014/08/18/zero-downtime-deployments-with-bluemix/"
]

+++


In Cloud Foundry (the open source technology behind Bluemix), when you do a `cf push`, Cloud Foundry will actually stop your app and restart it with the new code that you just uploaded.  This presents an issue for a production app or any app that is actually serving users. There is a shortcoming with the current DEA (the part in Cloud Foundry that runs your app) but the next version of the DEA ([Diego](https://www.youtube.com/watch?v=1OkmVTFhfLY)) will help address this.  In the meantime you can do a little scripting to get around this.

The basic flow is as follows:

1. App A is running (prod)
2. Deploy App B
3. Do some tests against App B
4. Map prod route to App B
5. Unmap prod route from App A
6. Stop App A
7. Delete App A

Here is some starter shell code to do it:

```
# deploy.sh

#!/bin/bash
cf unmap-route blue-app mybluemix.net -n cf-blue-green          # make the app unavailable to requests
cf push blue-app

# wait for the blue app to start
while true; do
RESP=`curl -sIL -w "%{http_code}" "blue-app.mybluemix.net" -o /dev/null`
if [[ $RESP == "200" ]]
then break
else sleep 3 &amp;&amp; echo "Waiting for 200 response"
fi
done

# make the blue app available to the router
cf map-route blue-app mybluemix.net -n cf-blue-green

# deploy to the green app
cf unmap-route green-app mybluemix.net -n cf-blue-green
cf push green-app
cf app green-app
cf map-route green-app mybluemix.net -n cf-blue-green
```
