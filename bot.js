module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var channelName = req.body.channel_name;
  var text = req.body.text;
  var botPayload;
  if(text == "!standup")
  {

    botPayload = {
      userName:'pluto',
      text : 'Good Morning, @' + channelName + '!\n\r Please type "!start" when you are ready to stand up'
    };

  }else if(text == "!start")
  {

    botPayload = {
      userName:'pluto',
      text : 'Okay lets start!\n\r 1.What did you do yesterday?\n\r 2.What are you working on today?\n\r 3.Any Blockers?\n\r When you\'re done type "!next!"\n\r\n\r Right so who\'s going first?\n\r To speak next type "!me"'
    };

  }else if(text == "!next")
  {

    botPayload = {
      userName:'pluto',
      text : 'Okay guys whos next?'
    };

  }else if(text == "!me")
  {

    botPayload = {
      userName:'pluto',
      text : 'Great, so '+userName+' you\'re next.\n\rYou may start'
    };

  }

  if (userName !== 'pluto' && botPayload) {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }


}