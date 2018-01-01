+++
categories = ["Tutorial", "Sample Code"]
date = "2015-02-17T10:02:18-05:00"
description = ""
draft = false
image = "/original-images/robots-blog-post-header1.jpg"
tags = ["bluemix", "cloudant", "node.js", "iot", "raspberry pi"]
title = "Control home devices with Bluemix Internet of Things (Part 2)"
aliases = [
    "2015/02/17/control-home-devices-with-bluemix-internet-of-things-part-2/"
]

+++

## Part 2: Configuring the Raspberry Pi


This is a continuation of Part 1 of Controlling home devices with Bluemix Internet Of Things  If you haven’t read [Part 1](/post/control-home-devices-with-bluemix-internet-of-things/), please do that first…

In Part 1 we got the electrical work out of the way.  We wired up the relay’s and connected the circuit’s.  In this part of the 3 part series we will configure the Raspberry Pi to control the relay’s that we wired up in part 1.

So without delay let’s jump into the next part.
<!-- more -->


## Install software on the Raspberry Pi


The first step of getting your Raspberry Pi setup is installing Raspbian.  If you have the [Canakit](http://amzn.to/2C63713) its pretty easy, just plug in the wifi dongle and insert the SD card and plug in power.  If you don’t have the [Canakit](http://amzn.to/2C63713)  follow the instructions from [here](http://www.raspberrypi.org/help/noobs-setup).  Once you get Raspbian installed open up a terminal.

Next, we will need to update Raspbian to the latest.  To do this run the following.

```
sudo apt-get update
sudo apt-get upgrade
```

Next, we will need to download  [LightShowPi](http://lightshowpi.org).  [LightShowPi](http://lightshowpi.org) is the foundation for syncing the lights to the music.

```
# Install git (if you don't already have it)
sudo apt-get install git-core




# Clone the repository to /home/pi/lightshowpi
cd ~
git clone https://togiles@bitbucket.org/togiles/lightshowpi.git

# Grab the stable branch
cd lightshowpi git fetch && git checkout stable
```

Next, we need to install LightShowPi, run the following.  Please not the install step will take some time, be patient…

```
cd /home/pi/lightshowpi
sudo ./install.sh
```

Once the install is complete we need to reboot the Raspberry Pi to pickup some new environment variables. To reboot run the following.

```
sudo reboot
```

## Wire up the Raspberry Pi’s breadboard


Once we have rebooted we need to connect the bread board to the Raspberry Pi and connect the bread board to the relays.  This took some tinkering to figure out the GPIO ports but below I have posted a picture of mybread board on how it was constructed.   For me I set everything up with 8 channels first and using LED’s provided in the [Canakit](http://amzn.to/2C63713) to make sure everything was working then I moved over to the real relays.  So let’s do that.

I would highly recommend following the steps in [this page](https://docs.google.com/document/d/1x97JIu5xVInZMutTNeaHlnQuyoLHjf3h-ugIo64pGfI) on getting your bread board working.

Below is a picture of my finished bread board with 16 channels.  I have included a wiring diagram as well.  Basically each GPIO port goes to the input side of the relay controller.  If you notice I have a couple left over LED’s on the bread board, this was done via the tutorial list above.

[![2015 02 16 11.31.19 768x1024 Control home devices with Bluemix Internet of Things (Part 2)](/images/2015/06/2015-02-16-11.31.19-medium.jpg)](/images/2015/06/2015-02-16-11.31.19-medium.jpg)

What is going on above is each of the delays is plugged into a GPIO port and then plugged into the ground rail and connected by a resistor.  The particular resistor I am using is a 220 Ohm resistor.

[![raspberry pi lights wiring diagram Control home devices with Bluemix Internet of Things (Part 2)](/images/2015/06/raspberry-pi-lights-wiring-diagram-medium.png)](/images/2015/06/raspberry-pi-lights-wiring-diagram-medium.png)

So let’s test some things out.  Let’s play a pre-loaded song.

```
cd ~/lightshowpi
sudo python py/synchronized_lights.py --file=/home/pi/lightshowpi/music/sample/ovenrake_deck-the-halls.mp3
```



All the relays should be flashing.  At this point you can plug the lights into the outlets as well.  If you notice the lights go on solid for 30 seconds before the songs play, we can override this.  Additionally this file has the GPIO pins mapping as well.  This mapping is for using the full 16 channels, if you are using less just remove some of the mappings from the end of the gpio_pins line.  To do this we need to place a config file in our home directory.

```
cd ~
touch .lights.cfg
```

Choose your favorite text editor and put the following contents in the file.  We change the time it waits from 30 seconds to 1.

```
[hardware]
gpio_pins = 0,1,2,3,4,5,6,7,21,22,23,24,25,26,28,29

[lightshow]
preshow_configuration =
    {
        "transitions": [
            {
                "type": "on",
                "duration": 1,
                "channel_control": {
                }
            },
            {
                "type": "off",
                "duration": 1,
                "channel_control": {
                }
            }
        ]
    }
```

That is it for this part.  In the next part of this series we will configure the Bluemix app to respond to text message votes and then the app to interface with the python code that controls the lights.


## Parts in the Series

  * [Part 1](/post/control-home-devices-with-bluemix-internet-of-things/)
