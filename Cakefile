exec = require('child_process').exec

option '-c', '--config [FILE]', 'Configuration File, defaults to config.json'
option '-o', '--output [OUTDIR]', 'Output directory for build, defaults to bin'
option '-k', '--key [KEY]', 'S3 API Key'
option '-s', '--secret [SECRET]', 'S3 API Secret'
option '-b', '--bucket [BUCKET]', 'S3 Destination Bucket'
option '-p', '--path [PATH]', 'S3 Destination Path, defaults to /stable/'

getConfig = (options) ->
	fs = require 'fs'
	configFile = options.config ? 'config.json'
	
	try
		configData = fs.readFileSync configFile, 'utf8'
	catch err
		configData = null
	
	try
		config = JSON.parse configData if configData?.length > 0
	catch err
		console.log "Error parsing #{configFile}: #{err}"
	
	effectiveConfig =
		output: options.output ? config?.output ? './bin'
		key: options.key ? config?.key
		secret: options.secret ? config?.secret
		bucket: options.bucket ? config?.bucket
		path: options.path ? config?.path ? '/stable/'

task 'build', 'rebuild accjs', (options) ->
	fs = require 'fs'
	path = require 'path'
	
	options = getConfig options
	
	if not fs.existsSync options.output
		console.log "Making directory #{options.output}"
		fs.mkdirSync options.output
	
	outFull = path.join options.output, 'accjs.js'
	outMin = path.join options.output, 'accjs.min.js'
	
	exec "coffee -j -c -p src/version.coffee src/QuoteExtension.coffee src/VersionFooter.coffee src/main.coffee > #{outFull}", (err, stdout, stderr) ->
		throw err if err?
		exec "uglifyjs bin/accjs.js -c -o #{outMin}", (err, stdout, stderr) ->
			throw err if err?
			console.log "#{outFull} and #{outMin} built."

task 'upload', 'upload to S3', (options) ->
	path = require 'path'
	knox = require 'knox'
	
	gotOpts = true
	options = getConfig options
	
	if not options.key?
		console.log 'S3 API Key required'
		gotOpts = false
	if not options.secret?
		console.log 'S3 API Secret required'
		gotOpts = false
	if not options.bucket?
		console.log 'S3 Bucket required'
		gotOpts = false
	
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
