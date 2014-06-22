#! /usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var fs = require('fs');
var util = require('util');

var tag = '[[ -s /Users/derek/.nvm/nvm.sh ]] && . /Users/derek/.nvm/nvm.sh'

program
  .version('0.1.0')
  .usage('[options] [command]')
  .option('-t, --test', 'Test');
  
program
  .command('install')
  .description('install dotfiles for local user')
  .action(function(env, options) {
    console.log( chalk.green('Installing files...') );
    
    try {
      console.log( chalk.blue('In DIR: ' + process.cwd() ));
      // console.log( chalk.yellow('2: ' + process.env.HOME )); // mac
      // console.log( chalk.yellow('2: ' + process.env.HOMEPATH ));
      // console.log( chalk.yellow('2: ' + process.env.USERPROFILE ));
      
      process.chdir(process.env.HOME);
      console.log( chalk.blue('In DIR: ' + process.cwd() ));
      
      fs.exists('./.bash_profile', function(exists) {
        
        // if(!exists) new Error('.bash_profile is not in you home dir.');
        // 
        
        if (exists) {
          fs.appendFile('./.bash_profile', '', function(err) {
            
          });
        }
        
        console.log(exists ? 'it\'s here' : 'nope');
      });
    }
    catch (err) {
      console.log( chalk.red('chdir:' + err) );
    }
    
  });

program.parse(process.argv);
  
if (!program.args.length) program.help();

