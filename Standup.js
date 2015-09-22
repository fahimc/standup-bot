var Standup ={
	name:"pluto",
	responses:{
		start:'Good Morning, @channelName!\n\r Please type "!start" when you are ready to stand up',
		first:'Okay lets start!\n\r\n\r 1.What did you do yesterday?\n\r 2.What are you working on today?\n\r 3.Any Blockers?\n\r\n\r When you\'re done type "!next!" or "!end" when everyone is finished\n\r\n\r Right so @userName will go first!',
		next:'Great @previousUserName.\n\r@userName you\'re next!',
		last:'Thanks @previousUserName. @userName you\'re the last one',
		done:'Thanks Everyone Stand up is now complete. Have a productive day',
		interupted:'@userName, please allow @previousUserName to finish and type !next or !end',
		removed:'@userName has been removed from the standup list',
		cancel:'!standup has been cancelled by @userName'
	},
	Slack:null,
	started:false,
	saidStart:false,
	isDone:false,
	isNext:false,
	list:[],
	previousPerson:'',
	selected:{},
	init:function(Slack){
		this.Slack = Slack;
	},
	onMessage:function(text){
		this.getResponse(text);
	},
	getResponse:function(text){
		if(this.Slack.currentUserName.trim() == 'slackbot'){
			this.Slack.send(null,null);
			return;
		}
		if(text.indexOf("!cancel") >= 0 ){
			this.purge();
			this.Slack.send(this.name,this.replace(this.responses.cancel,this.Slack.currentUserName));
			return;
		}else if(text.indexOf("!remove:") >= 0 ){
			var name = text.replace("!remove:","").trim();
			var removed = this.removeMember(name);
			this.Slack.send(this.name,this.replace(this.responses.removed,name));
			return;
		}
		if(this.isNext && this.Slack.currentUserName.trim() != this.previousPerson.trim())
		{
			this.Slack.send(this.name,this.replace(this.responses.interupted,this.Slack.currentUserName,this.previousPerson));
			return;
		}
			//check start
			if(this.started && text.indexOf("!standup") < 0 )
			{
				this.listen(text);
				return;
			}
			this.checkStart(text);
		},
		checkStart:function(text){
			var trigger = "!standup:";
			if(text.indexOf(trigger) >= 0){
				this.purge();
				this.list = text.replace(trigger,"").split(",");
				this.trim();
				this.started = true;
				this.selected = {};
				this.Slack.send(this.name,this.replace(this.responses.start));
			}else{
				this.Slack.send(null,null);
			}
		},
		trim:function(){
			for(var a=0;a<this.list.length;a++){
				this.list[a] = this.list[a].trim();
				console.log(this.list[a]);
			}
		},
		listen:function(text){
			if(text.indexOf("!start") >=0){
				var name = this.getNextPerson();
				this.previousPerson = name;
				this.saidStart=true;
				this.isNext=true;
				this.Slack.send(this.name,this.replace(this.responses.first,name));
			}else if(text.indexOf("!next") >=0){
				this.isNext=true;
				this.next();
			}else if(text.indexOf("!end") >=0){
				this.purge();
				this.Slack.send(this.name,this.replace(this.responses.done));
			}else{
				this.Slack.send(null,null);
			}
		},
		next:function(){
			if(this.saidStart)
			{
				var name = this.getNextPerson();	
				if(this.isDone){
					this.purge();
					this.Slack.send(this.name,this.replace(this.responses.done));
				}
				else if(this.size(this.selected) == this.list.length)
				{
					this.isDone=true;
					this.Slack.send(this.name,this.replace(this.responses.last,name,this.previousPerson));
				}else{
					this.Slack.send(this.name,this.replace(this.responses.next,name,this.previousPerson));
				}	
				this.previousPerson = name;	
			}else{
				this.Slack.send(this.name,this.replace(this.responses.start));
			}
		},
		getNextPerson:function(){
			if(this.size(this.selected) == this.list.length){
				return null;
			}
			var found=false;
			var index;
			while(!found){
				index = Math.floor(Math.random()*((this.list.length-1)-0+1)+0);
				if(!this.selected[index])
				{
					this.selected[index] = true;
					console.log("found index",index,this.list[index]);
					found=true;
					break;
				}
			}
			return this.list[index].trim();
		},
		replace:function(text,name,previous){
			text = text.replace("@channelName!","#"+this.Slack.channelName);
			if(name)text = text.replace("@userName","@"+name.trim());
			if(previous)text = text.replace("@previousUserName","@"+previous.trim());

			return text;
		},
		removeMember:function(name){
			var found = false;
			for(var a=0;a<this.list.length;a++){
					if(name.trim() == this.list[a]){
							this.selected[a] = true;
							found = true;
					}
			}
			return found;
		},
		purge:function(){
			this.started=false;
			this.isDone=false;
			this.saidStart=false;
			this.isNext=false;
			this.list=[];
			this.selected={};
		},
		size: function(obj) {
			var size = 0, key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) size++;
			}
			return size;
		}
	}

	module.exports = Standup;