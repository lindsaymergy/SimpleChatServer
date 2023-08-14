var net = require('net');
var server = net.createServer(function(connection) { 
   console.log('client connected');
   
   connection.on('end', function() {
      console.log('client disconnected');
   });
   
   connection.write('Welcome to the chat!\r\n');
   connection.pipe(connection);
});

server.listen(8080, function() { 
   console.log('server is listening');
});

let sockets = [];

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ' : ' + sock.remotePort);
    sockets.push(sock);

    sock.on('data', function(data) {
        console.log(sock.remotePort + ': ' + data);
        sockets.forEach(function (eachSock, index, array) {
        if (eachSock != sock) {
          sock.write(sock.remotePort + " said " + data + '\n');
        }
        });
    });
  
  sock.on('end', function (data) {
    // TODO - incomplete, still need to handle client disconnection gracefully
    let closedSocket = sockets.indexOf(sock.index)
    sockets.splice(sock, closedSocket)
  });
});