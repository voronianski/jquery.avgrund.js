module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= pkg.homepage %>) */\n',
                mangle: {
                    except: ['jQuery', '$', 'define', 'module', 'exports']
                }
            },
            avgrund: {
                files: {
                    'jquery.avgrund.min.js': ['jquery.avgrund.js']
                }
            }
        },
        jshint: {
            options: {
                ignores: ['jquery.avgrund.min.js']
            },
            files: ['*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['jshint', 'uglify']);
};
