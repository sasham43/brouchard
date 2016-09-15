module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        expand: true,
        cwd: 'node_modules/',
        src: [
          'angular/angular.min.js',
          'angular/angular.min.js.map',
          'socket.io-client/socket.io.js',
          'synaptic/dist/synaptic.js',
          'bootstrap/dist/css/bootstrap.min.css'
        ],
        dest: 'server/public/vendor'
      }
    },
    watch: {
      scripts: {
        files: ['client/client.js'],
        tasks: ['uglify', 'copy'],
        options: {
          spawn: false,
        },
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'client/client.js',
        dest: 'server/public/assets/scripts/client.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s)
  grunt.registerTask('default', ['copy', 'uglify']);
}
