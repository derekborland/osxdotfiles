#! /usr/bin/env node

var program = require('commander');

program
  .version('0.1.0')
  .usage('[options] [command]')
  .option('-t, --test', 'Test')
  .parse(process.argv);

/**
 * If no args are passed in, return `help()`
 * 
 */
if(program.rawArgs.length == 2) {
  program.help();
}