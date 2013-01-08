exec = require('child_process').exec

task 'build', 'rebuild accjs', (options) ->
	exec 'coffee -j -c -p src/QuoteExtension.coffee src/main.coffee > bin/accjs.js', (err, stdout, stderr) ->
		throw err if err?
		exec 'uglifyjs bin/accjs.js -c -o bin/accjs.min.js', (err, stdout, stderr) ->
			throw err if err?
			console.log 'accjs.js and accjs.min.js built.'
