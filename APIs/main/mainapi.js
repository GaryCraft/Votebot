const fs = require('fs')
const express = require('express');
const https = require('https');
//const { Webhook } = require('@top-gg/sdk')



const app = express();
module.exports ={
	requireclient:true,

	

	async startAPI(client){
		const port = client.config.mainapi.port
		https.createServer({
			key: process.env['httpsprivkey'] ? process.env['httpsprivkey'].toString() : fs.readFileSync('./APIs/https/key.pem'),
			cert: fs.readFileSync('./APIs/https/cert.pem'),
		},app).listen(port, function(){
			console.log(`sp VoteBot listening port ${port}...`)
		})
		
		app.get('/', function(req, res) {
			console.log('Vote API ping received');
			res.send('This is SpaceProject\'s API ');
		});

	}
}