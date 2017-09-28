#!/usr/bin/env node
'use strict';
const exec = require('child_process').exec;
let cli = require('commander');
let path = require("path");

let executed;
cli
  .name('s3')
  .description('Managing vipyme\'s s3 bucket')

cli
  .command('sync')
  .description('Synchronize site resources in s3')
  .option('-t, --template <required>', 'template/theme name')
  .action(obj => {
    executed = true;
    if (!obj.template) return console.error('\n  error: option `-t, --template <required>\' argument missing\n');
    const awsS3Sync = exec(`aws s3 sync ${path.resolve("./") + '\\templates\\' + obj.template} s3://vipyme-templates/${obj.template} --delete --cache-control public,max-age=31556926`);

    awsS3Sync.stdout.on('data', function (data) {
      console.log(data);
    });

    awsS3Sync.stderr.on('data', function (data) {
      console.log(data);
    });

  });

cli.parse(process.argv);

const NO_COMMAND_SPECIFIED = cli.args.length === 0;

if (NO_COMMAND_SPECIFIED) cli.help();

if (!executed) cli.help();
