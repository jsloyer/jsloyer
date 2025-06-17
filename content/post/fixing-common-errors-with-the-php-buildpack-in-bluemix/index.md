+++
categories = ["Video"]
date = "2015-08-26T11:17:31-05:00"
description = ""
draft = false
image = "fedup.jpg"
tags = ["php", "buildpack", "bluemix"]
title = "Fixing common errors with the PHP Buildpack in Bluemix"
aliases = [
    "2015/08/26/fixing-common-errors-with-the-php-buildpack-in-bluemix/"
]
slug = "fixing-common-errors-with-the-php-buildpack-in-bluemix/"
+++

Following up from my [previous post](/post/cloud-foundry-php-buildpack-doesnt-support-lucid64/), Canonical recently dropped support for `lucid64` which is Ubuntu 10.04 LTS. This affects Cloud Foundry as `lucid64` is the basis for most buildpacks. In Cloud Foundry `lucid64` is being phased out for Ubuntu 14.04 LTS which is known as `cflinuxfs2` in Cloud Foundry.

```
Getting stacks in org jbsloyer@us.ibm.com / space dev as jbsloyer@us.ibm.com...
OK

name         description
lucid64      Ubuntu 10.04
cflinuxfs2   Ubuntu 14.04.2 trusty
```

The PHP buildpack will take the default system buildpack and right now in Bluemix it is `lucid64`. This will throw some errors when you try to push your PHP app, for example something like below.

```
It looks like you're deploying on a stack (currently set to *lucid64*) that's not supported by this buildpack.
That could be because you're using a recent buildpack release on a deprecated stack.
If you're using the buildpack installed by your CF admin, please let your admin know you saw this error message.
If you at one point specified a buildpack that's at git URL, please make sure you're pointed at a version that supports this stack.
Staging failed: Buildpack compilation step failed

FAILED
BuildpackCompileFailed
```



To fix it you just need to use the `-s cflinuxfs2` argument for the `cf push` command.
Ex.

```
cf push myapp -b https://github.com/cloudfoundry/php-buildpack.git -s cflinuxfs2
```


Check out this video for a walk through on how to fix the issue and an explanation of it.

<iframe width="560" height="315" src="https://www.youtube.com/embed/anJ1JUE1tgE" frameborder="0" allowfullscreen></iframe>

I would love to hear your feedback and any suggestions you have, please reach out to me on Twitter [@jsloyer](https://twitter.com/jsloyer target=)
