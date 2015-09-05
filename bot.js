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
      text : 'Okay lets start!\n\r\n\r 1.What did you do yesterday?\n\r 2.What are you working on today?\n\r 3.Any Blockers?\n\r\n\r When you\'re done type "!next!"\n\r If you want tp speak next type "!me" \n\r\n\r Right so who\'s going first? '+userName+'?'
    };

  }else if(text == "!next")
  {

    botPayload = {
      userName:'pluto',
      text : 'Okay guys who\'s next?'
    };

  }else if(text == "!me")
  {

    botPayload = {
      userName:'pluto',
      text : 'Great, so '+userName+' you\'re next.\n\rYou may start'
    };

  }
  else if(text == "!end")
  {

    botPayload = {
      userName:'pluto',
      text : 'That concludes todays stand up!'
    };

  }

  if (userName !== 'pluto' && botPayload) {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }


}