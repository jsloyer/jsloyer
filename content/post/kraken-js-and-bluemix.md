+++
categories = ["Development", "node.js"]
date = "2016-01-04T13:24:00-05:00"
description = ""
draft = true
image = "/img/post-bg.jpg"
tags = ["node.js", "kraken.js", "express", "bluemix", "development"]
title = "Kraken.Js and Bluemix"

+++

<a href="https://jeffsloyer.io/wp-content/uploads/2015/07/krakenLogo.png"><img class="alignleft size-medium wp-image-161" src="https://jeffsloyer.io/wp-content/uploads/2015/07/krakenLogo-300x300.png" alt="krakenLogo" /></a>Kraken.JS is a new wonderful framework wrapper around Express for Node.JS.  It includes things such as pre-canned security settings, templating, and internationalization.  While Express in Node allows you to customize these type of things its not the most fun thing or exciting thing to do.  While security is very important in your app why should you have to write redundant code for this.  The answer is you do not have to anymore. Kraken.JS is a new wonderful framework wrapper around Express for Node.JS.  It includes things such as pre-canned security settings, templating, and internationalization.  <!--more-->While Express in Node allows you to customize these type of things its not the most fun thing or exciting thing to do.  While security is very important in your app why should you have to write redundant code for this.  The answer is you do not have to anymore. With Kraken.JS it will drastically cut the number of lines down in your Node app.  I currently have an app right now where I am estimating if I converted it to Kraken.JS it would cut my code base by 33%. So let’s jump into Kraken.JS, the instructions below were based on Kraken’s documentation (<a title="http://krakenjs.com/#gettingstarted" href="http://krakenjs.com/" target="_blank">http://krakenjs.com/#gettingstarted</a>)
<ol>
    <li>Step 1, install Kraken if you do not already have it installed.
<pre>sudo npm install -g generator-kraken</pre>
Note: If "yo" yeoman is not installed, the above command will install it.</li>
    <li>Create a basic project (follow the prompts on the screen)
<pre>yo kraken</pre>
</li>
    <li>Start your app
<pre>npm start</pre>
</li>
    <li>Congratulations you are now up and running with a Kraken.JS app</li>
</ol>
If you notice the app started on 8000, with Bluemix and other PaaS’ you need to start your app on the port that the PaaS assigns you.  To do this we need to modify the example app slightly. If you open up <code>index.js</code> down near the bottom you will see the following code snippet. …
<pre>if (require.main === module) {
    kraken.create(app).listen(function (err) {
        if (err) {
            console.error(err.stack);
        }
    });
}
</pre>
… The above code will automatically bind to port <code>8000</code>, we need to allow it to bind to a port that Bluemix wants.  Modify the code snippet to the following.
<pre>if (require.main === module) {
    kraken.create(app).listen(process.env.VCAP_APP_PORT || 8000, function (err) {
        if (err) {
            console.error(err.stack);
        }
    });
}
</pre>
The whole source of this app is on JazzHub.  Please view <a title="https://hub.jazz.net/project/jsloyer/kraken-example" href="https://hub.jazz.net/project/jsloyer/kraken-example" target="_blank">https://hub.jazz.net/project/jsloyer/kraken-example</a> If you want to pull the code do the following.
<pre>git clone https://hub.jazz.net/git/jsloyer/kraken-example</pre>
