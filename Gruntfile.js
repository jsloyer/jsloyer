var grunt = require('grunt')
  , fs = require('fs')
  , glob = require('glob')
  , sizeOf = require('image-size')
  , YAML = require('yamljs')
  ;

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-image-resize');
grunt.loadNpmTasks('grunt-jekyll');
grunt.loadNpmTasks('grunt-shell');

grunt.initConfig({



    // ====================
    // TASK: concat
    // ====================
    concat: {
        dist: {
            options: {
                separator: ';'
            },
            src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/packery/dist/packery.pkgd.js',
          'bower_components/imagesloaded/imagesloaded.pkgd.js',
          'bower_components/fluidbox/jquery.fluidbox.js',
                '_js/site.js'
            ],
            dest: 'js/site.js'
        }
    },

    // ===============
    // TASK: CONNECT
    // ===============
    connect: {
        dev: {
            options: {
                port: 4000,
                base: "_site",
                hostname: "127.0.0.1",
                livereload: true
            }
        }
    },


    // ===============
    // TASK: CONNECT
    // ===============
    copy: {
        dist: {
            files: [
                { expand: true, src: ['bower_components/fontawesome/fonts/*'], dest: 'fonts/', flatten: true }
            ]
        },

        jsdev: {
            files: [
                { expand: true, src: ['js/*'], dest: '_site/js/', flatten: true }
            ]
        }
    },

    // ====================
    // TASK: image_resize
    // ====================
    image_resize: {

    thumbs: {
            options: {
                width: 400,
                overwrite: false
            },

            files: [{
                expand: true,
                cwd: "files/originals/",
                src: ["**/*.jpg", "**/*.png"],
                dest: "files/thumbs/",
                extDot: "first"
            }]
        },

        medium: {
            options: {
                width: 800,
                overwrite: false
            },

            files: [{
                expand: true,
                cwd: "files/originals/",
                src: ["**/*.jpg", "**/*.png"],
                dest: "files/medium/",
                extDot: "first"
            }]
        },

    large: {
            options: {
                width: 1200,
                overwrite: false
            },

            files: [{
                expand: true,
                cwd: "files/originals/",
                src: ["**/*.jpg", "**/*.png"],
                dest: "files/large/",
                extDot: "first"
            }]
        }

    },

    // ====================
    // TASK: jekyll
    // ====================
    jekyll: {
        dev: {
            options: {
                config: "_config.yml",
                drafts: true,
                verbose: true,
                raw: "exclude: [Gemfile, Gemfile.lock, bower.json, package.json, Gruntfile.js, node_modules, bower_components]"
            }
        },

        prod: {
            options: {
                config: "_config.yml,_config_prod.yml",
                verbose: true,
                raw: "exclude: [Gemfile, Gemfile.lock, bower.json, package.json, Gruntfile.js, node_modules, bower_components]"
            }
        }
    },


    // ====================
    // TASK: jshint
    // ====================
    jshint: {
        dist: ['_js/*.js']
    },


    // ====================
    // TASK: sass
    // ====================
    sass: {
        dev: {
            options: {
                loadPath: '_sass'
            },
            files: {
                '_site/css/main.css': '_sass/main.scss'
            }
        }
    },


    // ====================
    // TASK: shell
    // ====================
    shell: {
        deploy: {
            command: "rm .jekyll-metadata; cd _site; git add -A; git commit -m 'Production build'; git push origin master;"
        },

        updatesite: {
            command: "cd _site; git pull origin master;"
        }
    },


    // ====================
    // TASK: uglify
    // ====================
    uglify: {
        dev: {
            options: {
                beautify: true
            },

            files: {
                'js/site.min.js': ['js/site.js']
            }
        },

        prod: {
            files: {
                'js/site.min.js': ['js/site.js']
            },
            mangle: {
                except: ['jQuery']
            }
        }

    },



    // ====================
    // TASK: watch
    // ====================
    watch: {
        jekyll: {
            files: [
                './**/*.html',
                './**/*.markdown',
                './**/*.md',
                './**/*.yml',

                "!./node_modules/",
                "!./_site/*",
                "!./_site/**/*"
            ],
            tasks: ['jekyll:dev'],
            options: {
                livereload: true
            }
        },

        js: {
            files: ['_js/*.js'],
            tasks: ['jshint:dist', 'concat:dist', 'uglify:dev', 'copy:jsdev'],
            options: {
                livereload: true
            }
        },

        sass: {
            files: ['./**/*.scss'],
            tasks: ['sass:dev'],
            options: {
                livereload: true
            }
        }
    }
});

grunt.registerTask('default', [
    'jshint:dist',
    'concat:dist',
    'uglify:dev',
    'copy:dist',
    'jekyll:dev',
    'connect:dev',
    'watch'
]);

grunt.registerTask('build', [
    'jshint:dist',
    'concat:dist',
    'uglify:prod',
    'copy:dist',
    'processimages',
    'jekyll:prod',
]);

grunt.registerTask('deploy', [
    'shell:deploy'
])

grunt.registerTask('builddeploy', [
    'build',
    'deploy'
]);

grunt.registerTask('buildserve', [
    'build',
    'connect:dev:keepalive'
]);

grunt.registerTask('updatesite', ['shell:updatesite']);
grunt.registerTask('serve', ['connect:dev:keepalive']);


grunt.registerTask('resize', ["image_resize:thumbs", "image_resize:medium", "image_resize:large"]);
grunt.registerTask('imageinfo', function(){
    var done = this.async();
    glob('files/**/*.{jpg,gif,png}', {}, function(err, files){
        var existingYml = fs.readFileSync("./_data/images.yml").toString();
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

        fs.writeFileSync("./_data/images.yml", existingYml + yamlHeading + yamlString);
        console.log('done');
        done();
    });

});
grunt.registerTask('processimages', ['resize', 'imageinfo']);
