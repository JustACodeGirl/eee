app.factory('WS', function () {
  var ws = null;
  var factory = {};

  factory.connect = function () {
    if('WebSocket' in window){
      try {
        ws = new WebSocket("ws://"+location.host.toString()+"/ws/message");
      } catch (e) {
        console.log(e.message);
      }

      if (ws != null) {
        ws.onopen = function () {
          var date = new Date();
          console.log('onopen\t'+date);
        };
        ws.onmessage = function (event) {};
        ws.onclose = function () {
          var date = new Date();
          console.log('onclose\t'+date);
        };
        ws.onerror = function () {
          var date = new Date();
          console.log('onerror\t'+date);
        };
      }
    }

    return ws;
  };

  factory.disconnect = function () {
    if(ws != null){
      ws.close();
      ws = null;
    }
  }

  factory.sendMessage = function (message) {
    if(ws != null){
      ws.send(message);
    }
  }

  return factory;
});
