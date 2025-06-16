+++
categories = ["Other"]
date = "2016-12-18T14:11:14-05:00"
description = ""
draft = false
image = "/original-images/migrate.jpg"
tags = ["wordpress", "migrate"]
title = "Why I Chose Hugo over Wordpress - Part 2"
slug = "why-i-chose-hugo-over-wordpress-part2/"
+++

This post has been a long time going and much overdue, it has almost been 12 months
since publishing the follow up to my previous post [Why I Chose Hugo Over Wordpress.](/post/why-i-chose-hugo-over-wordpress/)  But I am finally going to take the time and explain all the technical parts about how I made this blog work with Hugo.


## Setting up the site
First to get started you need to install Hugo.

```
brew update && brew install hugo
```

Next you need to create a basic Hugo site.

```
hugo new site jsloyer
```

With Hugo you you can use themes, I am using a modified version of [StartBootstrap Clean Blog](https://github.com/humboldtux/startbootstrap-clean-blog).

I embedded the theme into my [GitHub project](https://github.com/jsloyer/jsloyer/tree/master/themes/startbootstrap-clean-blog).

Once you embed the theme you need to tell Hugo to use the theme.

You do this in [config.toml](https://github.com/jsloyer/jsloyer/blob/master/config.toml#L6).

```
theme = "startbootstrap-clean-blog"
```

Speaking of git you need to setup a GitHub project, the name is really important... If you are publishing the Hugo site under your own GitHub org, ie your username, the git project needs to match that.  For me my GitHub username is `jsloyer` so my git project name is `jsloyer` as well.  The reason for this is how GitHub pages works in picking up the build and publishing for a GitHub pages site.

You will be doing all of your work on the `master` branch.  Think of the `master` branch as you would with any of piece of software, the `master` branch is the raw code, in this case just markdown.  There is another special magic branch called `gh-pages` that we will go through later that makes your repo into a GitHub pages site.

### Creating a post

So next we need to create our first post!  To do this its pretty simple...

```
hugo new post/good-to-great.md
```

Next I start up Hugo to see how the site will look.

```
hugo server --buildDrafts
```

This starts Hugo in dev mode where you can see a post while you are working on it.  The beauty is you can even check the unfinished post into git but until you flip the magic `draft` setting on a post it won't be live on the Internet.

As you make changes to your post and save it Hugo will automatically reload in the browser what the post will look like.

Before we jump into how to take a post live lets look at some of the metadata in the post...  Here is some metadata for a [previous post of mine.](/post/why-i-chose-hugo-over-wordpress/)

```
+++
categories = ["Other"]
date = "2016-01-08T14:11:14-05:00"
description = ""
draft = false
image = "/original-images/migrate.jpg"
tags = ["wordpress", "migrate"]
title = "Why I Chose Hugo over Wordpress"

+++
```

You can set some various pieces of information for a post.  For my particular theme each post has a Jumbotron image, that is set via the `image` attribute.  More on images later...  You can also set tags as well as the title of the post.  The most interesting bit here is the `draft = false` line.  This is what I was referring to above in controlling when a post gets published.  Once you feel like your post is ready just change it to `draft = true`.


### Publishing
The next step is publishing your post, once you set the `draft = true` for a post you need to check this file into Git.

```
git add .
git commit -m "my awesome post"
git push origin master
```

At this point you think you might be done but you aren't you need to setup GitHub Pages and a pipeline...

I chose [Wercker](http://wercker.com) as my continuous delivery (CD) engine for this.  It was incredibly easy to setup a pipeline to build the site as well as deploy the site back to GitHub.

Before we get into the pipeline we need to setup the git project as a GitHub pages site.

Goto the settings page for your project, for me its `https://github.com/jsloyer/jsloyer/settings`.

Scroll down to the bottom...

Click "Launch automatic page generator", see below.  Go through the wizard, it really doesn't matter what you choose here, you are going to replace the content anyways...

[![automatic page generator](/images/gh-pages-generation-medium.jpg)](/images/gh-pages-generation-medium.jpg)

Once you have this setup it might take a little bit but your site will be available.  For example my site without the custom domain name is `http://jsloyer.github.io/jsloyer`.  Replace your GitHub username with mine and you will be able to access the default site.

**Note:**  If you want to use a custom domain name I'll include the instructions below, for example my site is hosted on `www.jeffsloyer.io`.

### Automatic Pipeline/Publishing
The next step is to to get automatic publishing setup.  So what happens for me is when I check in a new commit to the master branch, Wercker builds my images and builds the site and publishes it back to the `gh-pages` branch automatically.

To do this you need a file called `werkcer.yml` in your project.  Below is a copy of mine.

```
box: nodesource/node
build:
  steps:
    - install-packages:
        packages: graphicsmagick
    - npm-install
    - grunt:
        tasks: processimages
    - arjen/hugo-build:
        version: "0.14"
        theme: startbootstrap-clean-blog
deploy:
  steps:
    - install-packages:
        packages: git ssh-client
    - lukevivier/gh-pages@0.2.1:
        token: $GIT_TOKEN
        domain: www.jeffsloyer.io
        basedir: public
```

The above yaml file will build my Hugo site for me as well as build my images in an optimized format as well.  The only bit you need to change is if you want to use a specific theme, if you don't want to use the one that I am using change the following to the values you need.

```
theme: startbootstrap-clean-blog
```

Let's take a bit and talk through my automatic image minimization and rendering.  During build time my images are compressed and minimized to different sizes.  I only check in high quality original images and the build process optimizes them for me.  To do that you need two files.  They are below.  I am not going to go through how it works but basically all you have to do is run `grunt processimages` and the tasks will optimize your images...

**package.json**
```
{
  "name": "blog",
  "version": "0.0.1",
  "repository": {
    "type": "git",
    "url": "https://github.com/jsloyer/jsloyer.git"
  },
  "author": "Jeff Sloyer",
  "dependencies": {
    "glob": "*",
    "grunt": "*",
    "grunt-cli": "*",
    "grunt-contrib-concat": "*",
    "grunt-contrib-connect": "*",
    "grunt-contrib-copy": "*",
    "grunt-contrib-jshint": "*",
    "grunt-contrib-sass": "*",
    "grunt-contrib-uglify": "*",
    "grunt-contrib-watch": "*",
    "grunt-jekyll": "*",
    "grunt-responsive-images": "^0.1.7",
    "grunt-shell": "*",
    "image-size": "*",
    "yamljs": "*"
  }
}

```

**Gruntfile.js**
```
var grunt = require('grunt'),
    fs = require('fs'),
    glob = require('glob'),
    sizeOf = require('image-size'),
    YAML = require('yamljs');

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-responsive-images');
grunt.loadNpmTasks('grunt-jekyll');
grunt.loadNpmTasks('grunt-shell');

grunt.initConfig({

    responsive_images: {
        myTask: {
          options: {
            sizes: [{
              name: 'thumb',
              width: 400
            },{
              name: 'medium',
              width: 800
            },{
              name: "large",
              width: 1200
            }]
          },
          files: [{
            expand: true,
            src: ['**/*.{jpg,gif,png,jpeg}'],
            cwd: 'static/original-images',
            dest: 'static/images'
          }]
        }
    }
});

grunt.registerTask('resize', ["responsive_images"]);
grunt.registerTask('imageinfo', function(){
    var done = this.async();
    glob('static/images/**/*.{jpg,gif,png}', {}, function(err, files){
        var existingYml = fs.readFileSync("static/images.yml").toString();
        var a = existingYml.split("#!#!#!#!#");
        existingYml = a[0].trim();

        var data = {};
        files.forEach(function(file){
            var dimensions = sizeOf(file);
            var image = {
                width: dimensions.width,
                height: dimensions.height,
                aspect: dimensions.width / dimensions.height
            }
            data[file] = image;
        })

        var yamlString = YAML.stringify(data);
        var yamlHeading = "\n\n\n#!#!#!#!# Do not edit below this line.\n";
        yamlHeading += "# Generated automatically using `grunt imageinfo`\n\n";

        fs.writeFileSync("static/images.yml", existingYml + yamlHeading + yamlString);
        console.log('done');
        done();
    });

});
grunt.registerTask('processimages', ['resize', 'imageinfo']);

grunt.registerTask('default', ['processimages']);

```

Check in the above files to GitHub, the files are the following.
- `wercker.yml`
- `Gruntfile.js`
- `package.json`

The next step is getting a token from GitHub.  To generate a token goto https://github.com/settings/tokens.

You will want a token with the following permissions.  **Note once you generate the token copy it because GitHub won't display it to you again...**

[![GitHub token](/images/GitHub-token-medium.jpg)](/images/GitHub-token-medium.jpg)

Next we need to goto [Wercker](https://wercker.com) and login with our GitHub credentials.  Once you have logged in click "Create" at the top and choose application or just click [here](https://app.wercker.com/applications/create).  You will need to choose your your repo and I chose to make my pipeline private, it is up to you.  Once you have finished that you need enter in yout Gitub token so Wercker and deploy your built Hugo site back to GitHub.

Next we need to edit the pipeline to deploy to GitHub.  To do this click on the workflows tab.  For example my link is https://app.wercker.com/jsloyer/jsloyer/workflows.

Under pipeline there should already be one called `build`.  Click on `build`.  Scroll down to "Ignore Branches", type in `gh-pages`.  We are ignoring the `gh-pages` branch as we don't ever want to build that, we just build master.  Click "Update".  Go back in your browser.  We need to add another pipeline called `GitHubPages`.  We need to set an environment variable called `GIT_TOKEN`, paste in your GitHub token from earlier, click "Protected".  Don't worry Wercker won't expose this to the public.  For the name enter in `GitHubPages`.  For "YML Pipeline name" enter in `deploy`.  Save this and you are now finished.

To trigger a build check in a file into the master branch, the pipeline should execute and deploy your site back to GitHub Pages.  If it doesn't post a comment below and I will help you through it.

### Advanced Stuff
Below I am going to go through some advanced stuff that you probably want...

#### Custom Domain Name
For my site my site is available at `www.jeffsloyer.io`.  To do this you need to have the domain name in your `config.toml`, mine is [available here](https://github.com/jsloyer/jsloyer/blob/master/config.toml#L1).  Additionally you need your domain name in your `wercker.yml` as well, mine is posted above.

Lastly you need a CNAME entry with your registrar to point to GitHub.  For more information go [here](https://help.github.com/articles/setting-up-a-www-subdomain/).  The CNAME record should point to `your-username.GitHub.io`.  For example my site `www.jeffsloyer.io` has a CNAME record that points to `jsloyer.GitHub.io`.  It migh take a bit for DNS to update, depends on how long of a TTL you have...

Follow the instructions [here](https://help.github.com/articles/adding-or-removing-a-custom-domain-for-your-GitHub-pages-site/) to add the domain name to the GitHub project as well.

### Add-ons
Hugo has a lot of addons, some are even built right in.  For example Google Analytics and Disqus.

To Google Analytics I just had to add one line to `config.toml`.
```
Ganalytics = "UA-xxxx-xxx"
```

To add Disqus integration I just had to also add one line to `config.toml`.
```
disqusShortname = "xxxx"
```

Pretty simple...  For a full list of add-ons goto `https://gohugo.io/extras`.

Also please follow me on Twitter at [@jsloyer](http://twitter.com/jsloyer) and follow me on [Youtube](https://www.youtube.com/channel/UCQb6E0NWy6kVglreLNigxng)!
