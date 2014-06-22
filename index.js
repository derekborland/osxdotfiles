#! /usr/bin/env node

var program = require('commander');
var chalk = require('chalk');

program
  .version('0.1.0')
  .usage('[options] [command]')
  .option('-t, --test', 'Test');
  
program
  .command('install')
  .description('install dotfiles for local user')
  .action(function(env, options) {
    console.log( chalk.green('Installing files...') );
  });

program.parse(process.argv);
  
if (!program.args.length) program.help();

