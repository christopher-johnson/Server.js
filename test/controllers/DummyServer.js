var http = require('http');

/* Dummy server that emulates LinkedDataFragmentsServer */
function DummyServer(controller) {
  var server = http.createServer();
  server.on('request', function (request, response) {
    // End the response if the controller did not handle the request
    controller.next = sinon.spy(function (error) {
      controller.error = error;
      if (!response.headersSent)
        response.writeHead(error ? 500 : 200);
      response.end(error && error.message || '');
    });
    try { controller.result = controller.handleRequest(request, response, controller.next); }
    catch (error) { controller.next(error); }
  });
  return server;
}

module.exports = DummyServer;
