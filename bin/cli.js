#!/usr/bin/env node
/*jshint node: true */
'use strict';

/**
 * command-line utility
 */
(function() {
    var verbose = false;
    var program = require('commander');
    var thisPackage = require(__dirname + '/../package.json');
    program._name = thisPackage.name;
    var app = require('../index');
    var path = require('path');

    // Setup the commands of the program
    program
        .version(thisPackage.version)
        .command('process')
        .description('Execute the "process" command with the given parameters')
        .option("-v, --verbose", "Verbose mode", Boolean)
        .option("-f, --from <from>", "Source directory", String, "")
        .option("-i, --itype <inputType>", "MIME-Type of inputs", String, "application/json")
        .option("-t, --to <to>", "Target directory", String, "")
        .option("-o, --otype <outputType>", "MIME-Type of outputs", String, "application/json")
        .action(function(options) {
                verbose = options.verbose;
                app.process.execute({
                    verbose: verbose,
                    fromDir: path.resolve(process.cwd(), options.from), // '../test/data/input'
                    inputType: options.itype,
                    toDir: path.resolve(process.cwd(), options.to),      // '../test/data/output/'
                    outputType: options.otype,
                    postprocessors: []
                });
            });

    program.parse(process.argv);
})();