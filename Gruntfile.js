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
                cwd: "static/images/",
                src: ["**/*.jpg", "**/*.png"],
                dest: "static/img/thumbs/",
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
                cwd: "static/images/",
                src: ["**/*.jpg", "**/*.png"],
                dest: "static/img/medium/",
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
                cwd: "static/images/",
                src: ["**/*.jpg", "**/*.png"],
                dest: "static/img/large/",
                extDot: "first"
            }]
        }

    }
});

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

grunt.registerTask('default', ['processimages']);
