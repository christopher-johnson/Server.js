/*! @license ©2015 Ruben Verborgh - Multimedia Lab / iMinds / Ghent University */

/** An ErrorRdfView represents a 500 response in RDF. */

var RdfView = require('../RdfView');

// Creates a new ErrorRdfView
function ErrorRdfView(settings) {
  if (!(this instanceof ErrorRdfView))
    return new ErrorRdfView(settings);
  RdfView.call(this, 'Error', settings);
}
RdfView.extend(ErrorRdfView);

// Generates triples and quads by sending them to the data and/or metadata callbacks
ErrorRdfView.prototype._generateRdf = function (settings, data, metadata, done) {
  this._addDatasources(settings, data, metadata);
  done();
};

module.exports = ErrorRdfView;
