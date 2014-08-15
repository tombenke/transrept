#!/usr/bin/env node
/*jshint node: true */
'use strict';

var verbose = false;

var ftools = require('./ftools');

var mimeTypes = {
    'text/xml' : {
        reader : ftools.convXmlToJson,
        writer : null, //ftools.saveToXml,
        fileExtension : 'xml'
    },
    'application/json' : {
        reader : ftools.readJson,
        writer : ftools.saveToJson,
        fileExtension : 'json'
    }
};

// Alias types
mimeTypes['application/xml'] = mimeTypes['text/xml'];

var findMimeType = function(job, type) {
    if (mimeTypes.hasOwnProperty(type)) {
        return mimeTypes[type];
    } else {
        console.error('ERROR: There is no %s for "%s" mime-type.', job, type);
        process.exit(1);
    }
};

/**
 * Executes the process command
 * 
 * @param  {Object} config   Configuration parameters
 * @param  {bool} verbose    Work in verbose mode if `true`
 */
exports.execute = function( config ) {
    verbose = config.verbose;
    var reader = findMimeType('reader', config.inputType);
    var writer = findMimeType('writer', config.outputType);

    config.converter = reader.reader;
    config.fromExt = reader.fileExtension;
    config.writer = writer.writer;
    config.toExt = writer.fileExtension;

    ftools.processFiles(config);
};