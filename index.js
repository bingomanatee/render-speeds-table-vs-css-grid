const mt = require('./makeHTMLtable');
const mg = require('./makeHTMLgrid');

const baseline = require('./configs/baseline');
const fixed = require('./configs/fixed');
const rich = require('./configs/rich-content');
const rich2 = require('./configs/rich-content-with-image');

const fs = require('fs');
mt(baseline)
  .then(str => fs.writeFileSync('output/' + baseline.cols + 'x' + baseline.rows + '-' + baseline.name + '.table.html', str));

mg(baseline)
  .then(str => fs.writeFileSync('output/' + baseline.cols + 'x' + baseline.rows + '-' + baseline.name + '.grid.html', str));

mt(fixed)
  .then(str => fs.writeFileSync('output/' + fixed.cols + 'x' + fixed.rows + '-' + fixed.name + '.table.html', str));

mg(fixed)
  .then(str => fs.writeFileSync('output/' + fixed.cols + 'x' + fixed.rows + '-' + fixed.name + '.grid.html', str));

mt(rich)
  .then(str => fs.writeFileSync('output/' + rich.cols + 'x' + rich.rows + '-' + rich.name + '.table.html', str));

mg(rich)
  .then(str => fs.writeFileSync('output/' + rich.cols + 'x' + rich.rows + '-' + rich.name + '.grid.html', str));

mt(rich2)
  .then(str => fs.writeFileSync('output/' + rich2.cols + 'x' + rich2.rows + '-' + rich2.name + '.table.html', str));

mg(rich2)
  .then(str => fs.writeFileSync('output/' + rich2.cols + 'x' + rich2.rows + '-' + rich2.name + '.grid.html', str));
