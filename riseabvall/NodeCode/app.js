var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require('http');
var mongo = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var mysql = require('mysql');
var nodemailer = require('nodemailer');

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Tableau-Auth");
	next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.set('port', 3438);
var server = http.createServer(app);
server.listen(3438, () => {
	console.log("server started running");
})


app.post('/registerdata', (req, res) => {
	console.log("iNto registration data");
	var url = "mongodb://localhost:27017/Register";

	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		else {
			console.log("Database created!");
			var dbo = db.db("Register");
			dbo.createCollection("Details", function (err, resi) {
				if (err) throw err;
				else {
					console.log("Collection created!");
					var myobj = {
						name: req.body.FirstName,
						email: req.body.Email,
						mobile: req.body.Mobile,
						password: req.body.Password
					};
					dbo.collection("Details").insertOne(myobj, function (err, resp) {

						if (err) throw err;
						console.log("1 document inserted");

					});
				}
			});
		}
		db.close;

	});
	res.send("1");
});

app.post('/logindata', (req, res) => {
	console.log("Into login data");
	console.log(req.body);
	var url = "mongodb://localhost:27017/Register";

	MongoClient.connect(url, {
		useUnifiedTopology: true
	}, function (err, db) {
		if (err) throw err;
		var dbo = db.db("Register");
		var query = {
			email: req.body.Email,
			password: req.body.Password
		};
		dbo.collection("Details").find(query).toArray(function (err, result) {
			if (err) {
				console.log(err);
				res.send("0");
			} else {
				console.log(result);
				res.send("1");
				db.close();
			}
		});
	});

})

app.post('/qrydata', (req, res) => {
	console.log("Into submit query form");
	console.log(req.body);
	var con = mysql.createConnection({
		host: "localhost",
		port: 8889,
		user: "root",
		password: "root",
		database: "Vishnu"
	});
	contact = req.body.cocontact;
	email = req.body.coemail;
	name = req.body.coname;
	querys = req.body.coquer;

	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
		var sql = "INSERT INTO QueryData VALUES ('" + name + "','" + email + "','" + contact + "','" + querys + "')";
		con.query(sql, function (err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log("Information of query added");
				var transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: 'mvishnumehta97@gmail.com',
						pass: '18011995Khushboo#'
					}
				});
				var mailOptions = {
					from: 'mvishnumehta97@gmail.com',
					to: `${email}`,
					subject: `Congratulations ${name}`,
					text: 'Thank You For connecting with us. We will look out for your Query. Hope to connect with you in Future! Have a great day Ahead'
				};
				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						console.log(error);
						res.send("0");
					} else {
						console.log(`Email sent to ${email}`);
						res.send("1");
					}
				});

			}
		});
	});
})