+++
categories = ["Tutorial", "Sample Code"]
date = "2014-04-17T13:24:00-05:00"
description = ""
draft = false
image = "kraken.jpg"
tags = ["node.js", "kraken.js", "express", "bluemix"]
title = "Kraken.Js and Bluemix"
aliases = [
    "2014/04/17/kraken-js-and-bluemix/"
]
slug = "kraken-js-and-bluemix/"
+++

Kraken.JS is a new wonderful framework wrapper around Express for Node.JS.  It includes things such as pre-canned security settings, templating, and internationalization.  While Express in Node allows you to customize these type of things its not the most fun thing or exciting thing to do.  While security is very important in your app why should you have to write redundant code for this.  The answer is you do not have to anymore.

While Express in Node allows you to customize these type of things its not the most fun thing or exciting thing to do.  While security is very important in your app why should you have to write redundant code for this.  The answer is you do not have to anymore. With Kraken.JS it will drastically cut the number of lines down in your Node app.  I currently have an app right now where I am estimating if I converted it to Kraken.JS it would cut my code base by 33%. So let’s jump into Kraken.JS, the instructions below were based on [Kraken’s documentation](http://krakenjs.com/#gettingstarted").

1. Step 1, install Kraken if you do not already have it installed.

        sudo npm install -g generator-kraken

    Note: If "yo" yeoman is not installed, the above command will install it.
2. Create a basic project (follow the prompts on the screen)

        yo kraken
3. Start your app

        npm start

If you notice the app started on `8000`, with Bluemix and other PaaS’ you need to start your app on the port that the PaaS assigns you.  To do this we need to modify the example app slightly. If you open up `index.js` down near the bottom you will see the following code snippet. …
```
if (require.main === module) {
    kraken.create(app).listen(function (err) {
        if (err) {
            console.error(err.stack);
        }
    });
}
```
The above code will automatically bind to port `8000`, we need to allow it to bind to a port that Bluemix wants.  Modify the code snippet to the following.

```
if (require.main === module) {
    kraken.create(app).listen(process.env.VCAP_APP_PORT || 8000, function (err) {
        if (err) {
            console.error(err.stack);
        }
    });
}
```
The whole source of this app is on [Github here](https://github.com/IBM-Bluemix/kraken-example).  If you want to pull the code do the following.

```
git clone https://github.com/IBM-Bluemix/kraken-example.git
```
