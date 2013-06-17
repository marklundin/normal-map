module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		connect: {
	        combined: {
	          port: 1337,
	          base: '',
	          combine: [
	            'source/',
	            'build/'
	          ]
	        }
	    }
		
	});

	grunt.loadNpmTasks('grunt-connect');
	

};
