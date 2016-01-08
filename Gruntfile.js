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
            src: ['**/*.{jpg,gif,png}'],
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
