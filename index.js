#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var fs = require('fs');
var util = require('util');
var mkdirp = require('mkdirp');

var cwd = process.cwd();
var uhome = process.env.HOME; // mac

// dest path
var pkgFolder = './.dosx';
var pkgBin = pkgFolder + '/bin';

// this module path
var mod = __dirname;
var moduleBin = mod + '/bin';

// The script to append to `.bash_profile`
var comment = '\n\n# Load the osx dotfiles';
var script = '\n[[ -s '+ pkgFolder +'/bootstrap.sh ]] && . ' + pkgFolder +'/bootstrap.sh';
var tag = comment + script;

function createPkg() {
  mkdirp(pkgBin, function(err) {
    if (err) throw err;
    fs.readdir(moduleBin, function(err, files) {
      var _files = files;
      _files.forEach(function(file) {
        fs.exists(pkgBin + '/' + file, function(exists) {
          if(!exists) {
            fs.symlink(moduleBin + '/' + file, pkgBin + '/' + file, function(err) {
              if (err) throw err;
            });
          }
        });
      });
    });

    fs.exists(pkgFolder + '/bootstrap.sh', function(exists) {
      if(!exists) {
        fs.symlink(mod + '/bootstrap.sh', pkgFolder + '/bootstrap.sh', function(err) {
          if(err) throw err;
        });
      }
    });
  });
}

function addLoadScript() {
  fs.exists('./.bash_profile', function(exists) {
    if (exists) {
      fs.readFile('./.bash_profile', 'utf8', function(err, data) {
        if (err) throw err;

        if (data.indexOf(tag) > -1) {
          console.log( chalk.yellow('Scripts already installed...') );
        } else {
          console.log( chalk.green('Installing files...') );
          fs.appendFile('./.bash_profile', tag, function(err) {
            if (err) throw err;
            console.log( chalk.green('Success.') );
            createPkg();
          });
        }
      });
    } else {
      console.log( chalk.yellow('.bash_profile doesn\'t exists...') );
    }
  });
}

program
  .version('0.1.0')
  .usage('[options] [command]')
  .option('-t, --test', 'Test');

program
  .command('install')
  .description('install dotfiles for local user')
  .action(function(env, options) {
    try {
      process.chdir(uhome);
      addLoadScript();
    }
    catch (err) {
      console.log( chalk.red('chdir:' + err) );
    }
  });

program.parse(process.argv);
if (!program.args.length) program.help();