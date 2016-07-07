var http = require("http");

function convertDate(path) {
  var timestamp;
  
  if (/^\d+$/.test(path) ) {
    path = parseInt(path);
  }
  
  timestamp = new Date(path);
  
  if (!isNaN(timestamp.getTime())) {
    return {
      unix: timestamp.getTime(),
      natural:timestamp.toDateString()
    }
  } else {
    return {
      unix: null,
      natural:null
    }
  }
}

var server = http.createServer(function(req, res){
  
  var path = req.url.substr(1);
  path = decodeURI(path);
  
  var result = convertDate(path)
  
  
  res.writeHead(200, {"Content-Type":"text/json"});
  res.end(JSON.stringify(result))
  
});

server.listen(process.env.PORT)
