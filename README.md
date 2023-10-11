# SimpleChatServer
Establishes a basic chat server in Node.js using the 'net' module. This server is designed to handle client connections and facilitate communication over a TCP connection. It listens on port 8080 and displays a "server is listening" message upon initialization.

# Explanation of functionality: 
It uses the 'net' module to create a TCP server.
The server listens on port 8080, and when it's ready, it logs "server is listening."
The server handles client connections as follows:
- When a client connects, it logs "client connected."
- It sends a welcome message to the client.
- It sets up a data event listener on the client connection to handle incoming messages.
- When data is received from a client, it broadcasts the message to all connected clients except the sender.


TODO: handle client disconnections gracefully:
- There's an 'end' event listener to handle client disconnections, but the implementation needs improvement. Currently t attempts to remove disconnected clients from the 'sockets' array, but there are issues with this part of the code.
