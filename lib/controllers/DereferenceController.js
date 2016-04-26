/*! @license ©2015 Ruben Verborgh - Multimedia Lab / iMinds / Ghent University */

/** A DeferenceController responds to dereferencing requests */

var Controller = require('./Controller'),
    url = require('url'),
    _ = require('lodash'),
    Util = require('../Util');

// Creates a new DeferenceController
function DeferenceController(options) {
  if (!(this instanceof DeferenceController))
    return new DeferenceController(options);
  options = options || {};
  Controller.call(this, options);

  var paths = this._paths = options.dereference || {};
  if (!_.isEmpty(paths))
    this._matcher = new RegExp('^(' + Object.keys(paths).map(Util.toRegExp).join('|') + ')');
}
Controller.extend(DeferenceController);

// This default matcher never matches
DeferenceController.prototype._matcher = /$0^/;

// Dereferences a URL by redirecting to its subject fragment of a certain data source
DeferenceController.prototype._handleRequest = function (request, response, next) {
  var match = this._matcher.exec(request.url), datasource;
  if (datasource = match && this._paths[match[1]]) {
    var entity = url.format(_.defaults({
      pathname: '/' + datasource,
      query: { subject: url.format(request.parsedUrl) },
    }, request.parsedUrl));
    response.writeHead(303, { 'Location': entity, 'Content-Type': Util.MIME_PLAINTEXT });
    response.end(entity);
  }
  else
    next();
};

module.exports = DeferenceController;
