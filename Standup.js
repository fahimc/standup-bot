var Standup ={
	name:"Pluto",
	responses:{
		start:'Good Morning, @channelName!\n\r Please type "!start" when you are ready to stand up',
		first:'Okay lets start!\n\r\n\r 1.What did you do yesterday?\n\r 2.What are you working on today?\n\r 3.Any Blockers?\n\r\n\r When you\'re done type "!next!"\n\r If you want tp speak next type "!me" \n\r\n\r Right so @userName will go first!'
	},
	Slack:null,
	started:false,
	list:[],
	selected:{},
	init:function(Slack){
		this.Slack = Slack;
	},
	onMessage:function(text){
		this.getResponse(text);
	},
	getResponse:function(text){
			//check start
			if(this.started)
			{
				this.listen(text);
				return;
			}
			this.checkStart(text);
		},
		checkStart:function(text){
			var trigger = "!standup:";
			if(text.indexOf(trigger) >= 0){
				this.list = text.replace(trigger,"").split(",");
				this.started = true;
				this.selected = {};
				this.Slack.send(this.name,this.replace(this.responses.start));
			}else{
				this.Slack.send(null,null);
			}
		},
		listen:function(text){
			if(text.indexOf("!start")){
				var name = this.getNextPerson();
				this.Slack.send(this.name,this.replace(this.responses.first,name));
			}else{
				this.Slack.send(null,null);
			}
		},
		next:function(name){

		},
		getNextPerson:function(){
				var index = Math.floor(Math.random()*((this.list.length-1)-0+1)+0);
				var found=false;
				while(!found){
						if(!this.selected[index])
						{
							this.selected[index] = index;
							found=true;
							return this.list[index];
						}
				}
		},
		replace:function(text,name){
			text = text.replace("@channelName!",this.Slack.channelName);
			if(name)text = text.replace("@userName",name);

			return text;
		}
	}

	module.exports = Standup;