+++
categories = ["Sample Code", "Tutorial"]
date = "2015-08-24T11:21:03-05:00"
description = ""
draft = false
image = "/original-images/glasses.jpg"
tags = ["bluemix", "node.js", "watson"]
title = "Peering Inside a Criminal’s Mind using IBM Watson"
aliases = [
    "2015/08/24/peering-inside-a-criminals-mind-using-ibm-watson/"
]
slug = "peering-inside-a-criminals-mind-using-ibm-watson/"
+++

With the recent shooting in South Carolina in reminds us that criminal's can and will continue to harm people.  They seem like random acts to most of us but to a criminal the acts make sense to them?  No one can answer this question except the criminal.  To peer inside a criminal's would be next to impossible but what if there existed another way to peer inside their mind's?  This could be used to try to identify patterns or personality traits that exist.  This information could be used to prevent these horrible acts and better humanity.<!-- more -->

So how would we do this?  I work at IBM so the answer is obviously IBM Watson.  We all have heard of Watson, IBM Watson [beat Ken Jennings on Jeopardy](http://blog.ted.com/how-did-supercomputer-watson-beat-jeopardy-champion-ken-jennings-experts-discuss/).  However there is so much more that Watson can do, [check this out](https://console.ng.bluemix.net/catalog?cm_mmc=Display-JeffSloyer.io-_-BluemixSampleApp-WatsonCriminalAnalysis-_-Node-WatsonPersonalityInsights-_-BM-DevAd) for all the cool things Watson can do.  One of the really cool services that Watson now provides is something called Personality Insights.  This service can analyze the personality of text in meer seconds via a REST API.  One of the things IBM is trying to do now is make all these really cool technologies available to everyone and anyone.  They are doing it through something called [IBM Bluemix](http://bluemix.net/?cm_mmc=Display-JeffSloyer.io-_-BluemixSampleApp-WatsonCriminalAnalysis-_-Node-WatsonPersonalityInsights-_-BM-DevAd).  [Bluemix](http://bluemix.net/?cm_mmc=Display-JeffSloyer.io-_-BluemixSampleApp-WatsonCriminalAnalysis-_-Node-WatsonPersonalityInsights-_-BM-DevAd) is IBM's platform as a service (PaaS), and it has a whole giant catalog of really cool technologies from IBM as well as lots of other third parties.  You can sign up for a free 30 day account by going [here](http://bluemix.net/?cm_mmc=Display-JeffSloyer.io-_-BluemixSampleApp-WatsonCriminalAnalysis-_-Node-WatsonPersonalityInsights-_-BM-DevAd).

So how does this fit back with peering inside of a criminal.  Well I hope you guessed the answer, we are going to use Personality Insights to analyze the personality of a couple criminal's and look for some common traits.

Let's take the most recent horrible attack, the South Carolina church shooting.  Dylann Roof posted a manifesto online and we are going to use that as the basis to peer into his mind.

There are two ways to try this out for yourself.  Let's go through both of them.




  1. Sign up a [Bluemix account](http://bluemix.net/?cm_mmc=Display-JeffSloyer.io-_-BluemixSampleApp-WatsonCriminalAnalysis-_-Node-WatsonPersonalityInsights-_-BM-DevAd)


  2. Click the button deploy.  The button will automagically deploy the Personality Insights starter app that we are going to use.  If you are interested in the code head over to [Github](https://github.com/IBM-Bluemix/personality-insights-nodejs).

    [![Deploy to Bluemix](/images//2015/03/button-medium.png)](https://bluemix.net/deploy?repository=https://github.com/IBM-Bluemix/personality-insights-nodejs.git&cm_mmc=Display-JeffSloyer.io-_-BluemixSampleApp-WatsonCriminalAnalysis-_-Node-WatsonPersonalityInsights-_-BM-DevAd)


  3. Once you app is finished deploying click "View your app".  You will be taken to your app.


  4. Hint, if you are lazy and don't want to do the above steps go [here](http://watson-um-demo.mybluemix.net).


  5. Next we need to get the text from Dylann Roof that we want to analyze.  It can be found [here](http://lastrhodesian.com/data/documents/rtf88.txt).  Open the link and copy all the text.


  6. Click on "Clear"

    [![clear](/images//2015/07/clear-medium.jpg)](/images/2015/07/clear-medium.jpg)


  7. Paste the text into the text box

    [![enter-text](/images//2015/07/enter-text-medium.jpg)](/images/2015/07/enter-text-medium.jpg)


  8. Click "Analyze"

    [![analyze](/images//2015/07/analyze-medium.jpg)](/images/2015/07/analyze-medium.jpg)


Watson will return us Dylann Roof's personality based on the manifesto in just a matter of seconds.


<blockquote>You are unconventional, shrewd and can be perceived as critical.

You are unconcerned with art: you are less concerned with artistic or creative activities than most people who participated in our surveys. You are laid-back: you appreciate a relaxed pace in life. And you are intermittent: you have a hard time sticking with difficult tasks for a long period of time.

More than most people, your choices are driven by a desire for well-being.

You consider helping others to guide a large part of what you do: you think it is important to take care of the people around you. You are relatively unconcerned with tradition: you care more about making your own path than following what others have done.<cite> -- IBM Watson Analysis of Dylann Roof's manifesto</cite></blockquote>


Additionally Watson provides us a visualization as well.

[![personality](/images//2015/07/personality-medium.jpg)](/images/2015/07/personality-medium.jpg)

Let's next take a look at Anders Behring Breivik, who was responsible for the 2011 attacks in Norway.  His manifesto is available [here](https://info.publicintelligence.net/AndersBehringBreivikManifesto.pdf).  You will need to convert it to a `.txt` file. You can do this [here](http://www.zamzar.com/convert/pdf-to-txt/). It will email you a copy of the manifesto in a `.txt` file.

[![pdf-to-txt](/images//2015/07/pdf-to-txt-medium.jpg)](/images/2015/07/pdf-to-txt-medium.jpg)

So let's repeat the same steps as above.

  1. Clear the text area
  2. Paste the text
  3. Click Analyze


**NOTE:** You will need to make sure you have deployed the Bluemix app yourself for this one, the text file is really big and the default app does not support really large files.


<blockquote>You are shrewd, skeptical and tranquil.

You are philosophical: you are open to and intrigued by new ideas and love to explore them. You are imaginative: you have a wild imagination. And you are independent: you have a strong desire to have time to yourself.

You are motivated to seek out experiences that provide a strong feeling of prestige.

You are relatively unconcerned with both taking pleasure in life and tradition. You prefer activities with a purpose greater than just personal enjoyment. And you care more about making your own path than following what others have done.  <cite> -- IBM Watson Analysis of Anders Behring Breivik's manifesto</cite></blockquote>


[![personality-norway](/images//2015/07/personality-norway-medium.jpg)](/images/2015/07/personality-norway-medium.jpg)One last example.  I went to Virginia Tech and I was at the school when the [massacre happened there](http://www.cnn.com/2013/10/31/us/virginia-tech-shootings-fast-facts/).  This one hits quite close to home to me.  I was supposed to be in a classroom that fellow students were massacred but I overslept.  Let's take a look at Seung Hui Cho’s "Manifesto".  His manifesto is available [here](https://schoolshooters.info/sites/default/files/cho_manifesto_1.1.pdf).  You will need to convert it to a `.txt` file. You can do this [here](http://www.zamzar.com/convert/pdf-to-txt/). It will email you a copy of the manifesto in a `.txt` file.

[![pdf-to-txt](/images//2015/07/pdf-to-txt-medium.jpg)](/images/2015/07/pdf-to-txt-medium.jpg)

So let's repeat the same steps as above.

  1. Clear the text area
  2. Paste the text
  3. Click Analyze




<blockquote>You are boisterous and somewhat shortsighted.

You are content: you are content with your level of accomplishment and do not feel the need to set ambitious goals. You are confident: you are hard to embarrass and are self-confident most of the time. And you are carefree: you do what you want, disregarding rules and obligations.

More than most people, your choices are driven by a desire for modernity.

You consider independence to guide a large part of what you do: you like to set your own goals to decide how to best achieve them. You are relatively unconcerned with tradition: you care more about making your own path than following what others have done. <cite> -- IBM Watson Analysis of Seung Hui Cho's manifesto</cite></blockquote>


[![personality-virginia-tech](/images/2015/07/personality-virginia-tech-medium.jpg)](/images/2015/07/personality-virginia-tech-medium.jpg)Let's do some analysis on all this data now.  It looks like all the shooter's from these massacres have the following in common.

It looks like from the Charleston and Norway events both share the following traits and a high percentage of both of them.

  * Authority-challenging
  * Self-transcendence
  * Openness to change


Also on the flip side they both share the following traits with low percentages, which if you think about it means probably huge red flags.


  * Conversation (Charleston was 3%, Norway was 11%)
  * Cheerfulness (Charleston 12%, Norway 2%)
  * Trust (Charleston 11%, Norway 8%)
  * Uncompromising (Charleston 9%, 3%)


So digging into it a little more by no means am I a psychologist but it seems to me that a person that has low values in conversation, cheerfulness, trust, and uncompromising could definitely be red flags.  Additionally, high values in authority-challenging, self-transcendence, openness to change paired with the above low characteristics could be a model to try to detect some of these behaviors and thoughts earlier on.

Going forward if police or schools could analyze the text of suspected criminal's before hand maybe these horrible massacre's could of been prevented.  Maybe for the Dylann Roof case if the FBI examiner that reviewed Dylann Roof's gun permit had access to a tool like this it could of prevented the whole situation.  I know that is kinda big brother but I really believe in a somewhat of an invasion of privacy for the overall good of humanity.

This demo could easily be extended to use more automated methods as well.  Think of companies like Dropbox analyzing files or your ISP analyzing files.  I know this would be quite creepy but it could honestly possibly save lives and prevent these horrible massacres.

I know this post is kind of controversial but it is good to be talking about this and hopefully some good will come from this.  Please leave me feedback below or tweet me [@jsloyer](http://twitter.com/jsloyer).
