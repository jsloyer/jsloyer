+++
categories = ["Tutorial", "Sample Code"]
date = "2014-08-18T13:24:00-05:00"
description = ""
draft = false
image = "secure.jpg"
tags = ["bluemix", "cloudfoundry", "security", "ssl", "node.js"]
title = "Inbound Ssl in Bluemix"
aliases = [
    "2014/08/18/inbound-ssl-in-bluemix/"
]
slug="inbound-ssl-in-bluemix/"

+++
Did you know in Bluemix you get inbound SSL for free?  It is automatically turned on and enabled for every app.  All you have to do is just access your app over https instead of http.

Developers don’t need to implement SSL in their app, you just need to support HTTP and the Bluemix infrastructure will support HTTPS for you and do SSL offloading.

Additionally Bluemix supports the `x-forwarded-proto` header to allow developers to check with protocol requests are coming in over.  I have pasted some example Node.JS middleware that you can check if the request is coming in over https or not.

```
var middleware = module.exports,
    url = require("url");

var HTTP = "http:",
    HTTPS = "https:";

middleware.transportSecurity = function () {

    var applicationURL = config().appURL(),
        scheme = url.parse(applicationURL).protocol;

    function securityEnabled () {
        if (scheme !== HTTP &amp;&amp; scheme !== HTTPS) {
            throw new Error(
                "The application URL scheme must be 'http' or 'https'."
            );
        }
        return scheme === HTTPS;
    }

    function redirectURL (request) {
        return url.resolve(applicationURL, request.originalUrl);
    }

    if (securityEnabled()) {
        console.log("Transport security is enabled.");
    }

    return function (request, response, next) {
        // handling non-standard proxy headers ibm cf uses
        if(request.headers.protocol) {
            request.headers["x-forwarded-proto"] = request.headers.protocol;
        } else
        if(request.headers.$wssc) {
            // The $wssc header is something that WebSphere inserts to pass the
            // proxied protocol to downstream applications
            request.headers["x-forwarded-proto"] = request.headers.$wssc;
        }

        if (securityEnabled() &amp;&amp; !request.secure) {
            log.info("Redirecting insecure request for", request.originalUrl);
            response.redirect(301, redirectURL(request));
        }
        else {
            next();
        }
    };

};
```

```
...
var middleware = require("./middleware");
...
app.use(middleware.transportSecurity());
```
For more information check out [the Bluemix SSL docs](https://www.ng.bluemix.net/docs/manageapps/secapps.html).
