module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= pkg.homepage %>) */\n',
				mangle: {
					except: ['jQuery', '$']
				}
			},
			avgrund: {
				files: {
					'jquery.avgrund.min.js': ['jquery.avgrund.js']
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['uglify']);
};