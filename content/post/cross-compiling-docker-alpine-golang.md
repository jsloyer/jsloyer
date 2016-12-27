+++
categories = ["Docker"]
date = "2016-12-19T14:11:14-05:00"
description = ""
draft = false
image = "/original-images/alpine.jpg"
tags = ["docker", "golang", "go"]
title = "Cross Compiling Golang with a Docker Alpine Container"

+++

Recently at work I have been struggling with building a small/minimized Docker container of a Go app I have been working on.  I started with `busybox` but it has a major short coming...  CA certificates.  It isn't trivial to get CA Certs on a `busybox` container.  This problem effectively prevents you from using SSL or TLS with your app...  This is a non-starter...

## Enter Alpine
I was doing some reading and I have seen a couple articles mention Alpine, its effectively a slimmed down version of `busybox` but it makes it trivially easy to install packages, in my case CA Certificates!  At this point I was really excited but I ran into some issues trying to compile the binary.

## Solution
The solution is actually pretty simple, you need to build your Go app inside of a container and then copy the built container to your "production" Alpine image.

My solution uses the `Makefile`, there is different ways of doing this but this is the simplest.

The first addition to the `Makefile` is the following.

```
.PHONY: buildgo
buildgo:
    CGO_ENABLED=0 GOOS=linux go build -ldflags "-s" -a -installsuffix cgo .
```

The above is intended to be run inside of a container but you can run it anywhere.  What it does is builds a binary that is statically linked with CGO disabled so it uses the statically linked cgo binary on in the container.  This is important as Alpine uses a custom lightweight subset of glibc called [`libc`](http://www.musl-libc.org/).

The next stanza you need for your `Makefile` actually builds two containers.  One is your build container based on the `golang` image and then copies the binary to your `Alpine` container.

```
.PHONY: builddocker
builddocker:
    docker build -t yourorg/yourproject-build -f ./Dockerfile.build .
    docker run -t yourorg/yourproject-build /bin/true
    docker cp `docker ps -q -n=1`:/go/src/github.com/yourorg/yourproject/yourproject .
    chmod 755 ./yourproject
    docker build -t yourorg/yourproject .
```

To make the above work you need two Docker files.  They are below...

**Note the following is assuming your depencies are already downloaded, I do this with a make task, `make deps`

```
.PHONY: deps
deps:
    glide install

```

This is nice/elegant as you don't have to run this in the container so if you have private repo's you don't need to copy in ssh keys or GitHub tokens to download source code.  Just make sure your don't have a `.dockerignore` file as things in that file won't be copied over...

**Dockerfile.build**
```
FROM golang:1.7.1

WORKDIR /go/src/github.com/yourorg/yourproject/

ADD . /go/src/github.com/yourorg/yourproject/
RUN make buildgo
CMD ["/bin/bash"]
```


**Dockerfile**
```
FROM alpine

COPY yourproject /go/bin/

RUN apk add --update --no-cache ca-certificates

ENV GOPATH /go

ENTRYPOINT ["/go/bin/yourproject"]

# Service listens on port 6969.
EXPOSE 6969
```

The above assumes your binary is named the same as your project name.

The magic in `Dockerfile` is the ability to install the CA certs with a single command.

## Gotchas

The only issue with disabling CGO is that some functionality in go requires it, most notably is from the `os/user` package, the function `user.Current()` makes use of it to determine a user's home directory.  You might get an error like the following...

```
user: Current not implemented on linux/amd64
```

The Apache Mesos project ran into this, [you can see their solution](https://github.com/mesosphere/mesos-dns/commit/4b99d6cc16c2be170525cd572f6564b673ac90d0).  Their solution does a shortcoming though with their looping...  Check out [my change](https://github.com/jsloyer/softlayer-go/blob/af445630c2c18a51aebd3f9b0158a162310699db/session/session.go#L141-L152) in the Go library for IBM Softlayer.  The pull PR is available [here](https://github.com/softlayer/softlayer-go/pull/32).

Please follow me on Twitter at [@jsloyer](http://twitter.com/jsloyer) and follow me on [Youtube](https://www.youtube.com/channel/UCQb6E0NWy6kVglreLNigxng)!
