var net = require('net');
var server = net.createServer(function(connection) { 
   console.log('client connected');
   
   connection.on('end', function() {
      console.log('client disconnected');
   });
   
   connection.write('Hello World!\r\n');
   connection.pipe(connection);
});

server.listen(8080, function() { 
   console.log('server is listening');
});

let sockets = [];

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);

  let originalSock = sock;

    sock.on('data', function(data) {
        console.log(sock.remotePort + ': ' + data);
        sockets.forEach(function (eachSock, index, array) {

        let sockPort = sock.remotePort;
        if (eachSock != sock) {
          sock.write(sock.remotePort + " said " + data + '\n');
        }
        });
    });
  
  sock.on('end', function (data) {
    let closedSocket = sockets.indexOf(sock.index)
    sockets.splice(sock, closedSocket)
  });
});