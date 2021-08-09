const fs = require('fs')
const express = require('express');
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
		
		app.get('/', function(req, res) {
			console.log('Vote API ping received');
			res.send('This is SpaceProject\'s API for Votes ');
		});
		//const topwh = new Webhook('votebot')
		/*app.post('/topgg',topwh.listener(vote=>{

		}))*/
		app.use(express.urlencoded({ extended: true }));

		app.post('/topgg',(req, res)=>{
			if(!req.headers.password){
				return res.status(403).json({ body:req.body, err:true, code:403, message:'Invalid password !' });
			}
			console.log(req.body)
			console.log(req.data)
			const output = req.query ? req.query : JSON.parse(req.body);
			const userid = output.user;
		})
	}
}