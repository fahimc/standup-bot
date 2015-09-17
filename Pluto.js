var Pluto ={
	config:{
		timings:{
			9:"Good Morning",
			12:"Guys, Lunch?",
			17:"Cool. Its home time! See you all tomorrow!",
			21:"Cool. Its home time! See you all tomorrow!"
		}
	},
	Slack:null,
	init:function(Slack){
		this.Slack = Slack;
		this.start();
	},
	start:function(){
		var count = 3600000;
		count = 30000;
		setInterval(this.checkTime.bind(this),count);
	},
	onMessage:function(text){
		//console.log(text);
		//this.Slack.send("pluto","got it");
	},
	checkTime:function(){
		var hour = new Date().getHours();

		for(var key in this.config.timings){
			if(key == hour){
				console.log("auto message", this.config.timings[key]);
					//this.Slack.send("pluto",this.config.timings[key]);
				}
			}
		}
	}

	module.exports = Pluto;