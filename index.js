var express = require('express')
var app = express()
var fs = require('fs')
// var users = []
var User = require('./db').User

// fs.readFile('user.json', {encoding: 'utf8'}, function(err, data){
// 	if(err) throw err

// 	JSON.parse(data).forEach(function(user){
// 		users.push(user)
// 	})
// });


app.get('/', function(req, res){
	var HTML = ''
	User.find({}, function(err, users){
		// console.log(users)
		users.forEach(function(user){
			HTML += '<a href="/' + user.login + '">' + user.login + '</a><br>'
		})
		res.send(HTML)
	})
	// res.send(JSON.stringify(users, null, 2))
})

app.get(/top.*/, function(req, res, next){
	console.log('TOP USER ACCESS')
	next()
})

app.get('/:username', function(req, res){
	var username = req.params.username
	User.findOne({login: username}, function(err, user){
		// console.log(user)
		res.send('<img src=' + user.avatar_url + ' width="100" /><br>' + username)
	})
	// res.send(username)
})

app.use('/profilepics', express.static('images'))

var server = app.listen(3000, function(){
	console.log('Server running at http://localhost:' + server.address().port)
})