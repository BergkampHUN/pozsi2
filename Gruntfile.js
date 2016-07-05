module.exports = function(grunt) {

  grunt.initConfig({
    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['source/img/*'], dest: 'build/img/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['node_modules/normalize.css/normalize.css'], dest: 'build/css/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['node_modules/bootstrap-grid/dist/grid.min.css'], dest: 'build/css/', filter: 'isFile'},
        ]
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'build/css/style.css': 'source/scss/main.scss'
        }
      }
    },

    autoprefixer: {
      compile: {
        files: {
          'build/css/style.css': 'build/css/style.css'
        }
      }
    },

    cssmin: {
      clean: {
        files: {
          'build/css/style.css': 'build/css/style.css'
        }
      }
    },

    jade: {
      compile: {
        files: {
          "build/index.html": "source/jade/main.jade"
        }
      }
    },

    uglify: {
      my_target: {
        files: {
          'build/js/script.min.js': [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/jquery.scrollto/jquery.scrollTo.js',
            'source/js/script.js'
          ]
        }
      }
    },

    watch: {
      sass: {
        files: [ 'source/scss/main.scss', 'source/scss/components/*', 'source/scss/config/*' ],
        tasks: ['sass', 'autoprefixer', 'cssmin']
      },
      jade: {
        files: [ 'source/jade/*.jade' ],
        tasks: ['jade']
      },
      uglify: {
        files: ['source/js/script.js'],
        tasks: ['uglify']
      },
      copy: {
        files: ['source/img/*.jpg'],
        tasks: ['copy']
      }
    },

    express: {
      all: {
        options: {
          bases: 'build',
          livereload: true,
          open: 'http://localhost:3000'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'jade', 'uglify', 'copy']);
  grunt.registerTask('start', ['express', 'watch']);
};