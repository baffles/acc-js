exec = require('child_process').exec

option '-k', '--key [KEY]', 'S3 API Key'
option '-s', '--secret [SECRET]', 'S3 API Secret'
option '-b', '--bucket [BUCKET]', 'S3 Destination Bucket'
option '-p', '--path [PATH]', 'S3 Destination Path'

task 'build', 'rebuild accjs', (options) ->
	exec 'coffee -j -c -p src/version.coffee src/QuoteExtension.coffee src/VersionFooter.coffee src/main.coffee > bin/accjs.js', (err, stdout, stderr) ->
		throw err if err?
		exec 'uglifyjs bin/accjs.js -c -o bin/accjs.min.js', (err, stdout, stderr) ->
			throw err if err?
			console.log 'accjs.js and accjs.min.js built.'

task 'upload', 'upload to S3', (options) ->
	path = require 'path'
	knox = require 'knox'
	
	gotOpts = true
	
	if not options.key?
		console.log 'S3 API Key required'
		gotOpts = false
	if not options.secret?
		console.log 'S3 API Secret required'
		gotOpts = false
	if not options.bucket?
		console.log 'S3 Bucket required'
		gotOpts = false
	
	options.path = options.path ? '/stable/'
	
	if not gotOpts
		console.log 'Run `cake` to view all available options.'
		process.exit 1
	
	console.log "Uploading accjs to #{path.join "[#{options.bucket}]", options.path}"
	
	client = knox.createClient
		key: options.key
		secret: options.secret
		bucket: options.bucket
	
	console.log 'Uploading accjs.js...'
	client.putFile 'bin/accjs.js', path.join(options.path, 'accjs.js'), { 'x-amz-acl': 'public-read', 'Cache-Control': 'no-cache' }, (err, res) ->
		console.log "Error uploading accjs.js: #{err}" if err?
		if res.statusCode is 200
			console.log 'Uploaded accjs.js.'
		else
			console.log "Error uploading accjs.js. [#{res.statusCode}]"
	
	console.log 'Uploading accjs.min.js...'
	client.putFile 'bin/accjs.min.js', path.join(options.path, 'accjs.min.js'), { 'x-amz-acl': 'public-read', 'Cache-Control': 'no-cache' }, (err, res) ->
		console.log "Error uploading accjs.min.js: #{err}" if err?
		if res.statusCode is 200
			console.log 'Uploaded accjs.min.js.'
		else
			console.log "Error uploading accjs.min.js. [#{res.statusCode}]"
