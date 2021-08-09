const fs = require('fs')
const express = require('express');
const http = require('http');
//const { Webhook } = require('@top-gg/sdk')



const app = express();
module.exports ={
	requireclient:true,

	

	async startAPI(client){
		const port = client.config.mainapi.port
		http.createServer({
			/*key: process.env['httpsprivkey'].toString(),
			cert: fs.readFileSync('./APIs/https/cert.pem'),*/
		},app).listen(port, function(){
			console.log(`sp MainAPI listening port ${port}...`)
		})
		
		app.get('/', function(req, res) {
			console.log('Vote API ping received');
			res.send('This is SpaceProject\'s API ');
		});

	}
}