module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var channelName = req.body.channel_name;
  var text = req.body.text;
  var botPayload;
  if(text == "!standup")
  {

    botPayload = {
      userName:'pluto',
      text : 'Good Morning, @' + channelName + '! Please type "!start" when you are ready to stand up'
    };

  }else{

  }

  if (userName !== 'pluto' && botPayload) {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }


}