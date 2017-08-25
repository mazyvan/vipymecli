#!/usr/bin/env node
'use strict';

let cli = require('commander');

cli
  .version('1.0.1')
  .name('vipymecli')
  .description('The Official ViPyME Command Line Interface');

cli
  .command('s3 <subcommand>', 'managing vipyme\'s s3 bucket');

cli.parse(process.argv);