const fs = require('fs')
const express = require('express');
const bodyParser = require("body-parser")
const https = require('https');
//const { Webhook } = require('@top-gg/sdk')



const app = express();
module.exports ={
	requireclient:true,

	

	async startAPI(client){
		const port = client.config.voteapi.port

		https.createServer({
			key: process.env['httpsprivkey'] ? process.env['httpsprivkey'].toString() : fs.readFileSync('./APIs/https/key.pem'),
			cert: fs.readFileSync('./APIs/https/cert.pem'),
		},app).listen(port, function(){
			console.log(`sp VoteBot listening port ${port}...`)
		})

		app.use(bodyParser.json()); // this will parse Content-Type: application/json
		app.use(bodyParser.urlencoded({ extended: true })); // this will parse Content-Type:  application/x-www-form-urlencoded


		app.get('/', function(req, res) {
			console.log('Vote API ping received');
			res.send('This is SpaceProject\'s API for Votes ');
		});
		//const topwh = new Webhook('votebot')
		/*app.post('/topgg',topwh.listener(vote=>{

		}))*/
		

		app.post('/topgg',(req, res)=>{
			if(!req.headers.password){
				return res.status(403).json({ body:req.body, err:true, code:403, message:'Invalid password !' });
			}
			console.log(req.body)
			console.log(req.data)
			//console.log(req)

			const output = req.body;
			const userid = output.user;
			if(!userid) return res.status(400).json({ body:req.body, err:true, code:403, message:'Invalid userid !' });
			console.log('Vote received on /topgg');
			return res.status(200).json({ body:req.body ? req.body : 'false', ok:true, code:200, message:'Success' });
		})
	}
}