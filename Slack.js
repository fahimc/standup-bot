var Slack = {
  currentUserName:null,
  previousUserName:null,
  channelName:null,
  userList:{},
  callbacks:[],
  request:null,
  response:null,
  onMessage:function(req, res, next){
    this.request = req;
    this.response = res;
    this.previousUserName = this.currentUserName;
    this.currentUserName = req.body.user_name;
    this.userList[this.currentUserName] = this.currentUserName.trim();
    this.channelName = req.body.channel_name;
    this.publish(req.body.text);
  }, 
  publish:function(text){
    for(var a=0;a<this.callbacks.length;a++){
      this.callbacks[a](text);
    }
  },
  addCallback:function(callback){
    this.callbacks.push(callback);
  },
  send:function(name,text){
    if(!this.response||!name||!text){
       this.response.status(500).json({});
      return;
    }
    var payload = {
      userName:name,
      text : text
    };
    this.response.status(200).json(payload);
  }
}

module.exports = Slack;
