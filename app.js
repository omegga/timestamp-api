var http = require("http");

var months = [
  "",
  "January",
  "February",
  "March",
  "April",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function convertDate(path) {
  var timestamp;
  
  if (/^\d+$/.test(path)) {
    path = parseInt(path);
  }
  
  timestamp = new Date(path);
  
  if (!isNaN(timestamp.getTime())) {
    return {
      unix: timestamp.getTime(),
      natural: timestamp.toDateString(),
      "message to user": "Write a date in the URL to get a timestamp"
    }
  } else {
    return {
      unix: null,
      natural: null,
      "message to user": "Write a date in the URL to get a timestamp"
    };
  }
}

var server = http.createServer(function(req, res) {
  
  if (req.url === "/") {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var urlToAdd = "/" + months[m] + " " + d + ", " + y;
    res.writeHead(301, {Location: urlToAdd});
    res.end();
  } else {
    var path = req.url.substr(1);
    path = decodeURI(path);
  
    var result = convertDate(path);
  
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(result));
  }
  
  
});

server.listen(process.env.PORT);