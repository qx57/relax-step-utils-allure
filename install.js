#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const scriptPath = path.resolve(__dirname);

console.log('Configurate reporter...');
fs.copyFileSync(`${scriptPath}/../relax-steps-allure/reporterConfig.json`, `${scriptPath}/../../reporterConfig.json`);
console.info('reporterConfig.json created');
console.log('Configure mocha...');
fs.copyFileSync(`${scriptPath}/../relax-steps-allure/.mocharc.json`, `${scriptPath}/../../.mocharc.json`);
console.info('Mocha configuration file created. Use `mocha ----config .mocharc.json your/test/files` command');