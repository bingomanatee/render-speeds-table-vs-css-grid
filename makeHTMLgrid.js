const ejs = require('ejs');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const fns = require('./lib/fns');

function call(name, ...args) {
  if (fns[name]) {
    return fns[name].apply(this, args);
  } else {
    throw new Error('call cannot find function ' + name);
  }
}

function getHead(i, config) {
  const {head} = config.cells[i] || _.last(config.cells);
  const {content} = head;
  if (Array.isArray(content)) {
    return call(...content);
  } else {
    return `${content}`;
  }
}

function getColWidth(i, config) {
  const def = config.cells[i] || _.last(config.cells);
  const {width} = def;

  if (!width) return 'auto';
  if (Array.isArray(width)) {
    return call(...width);
  } else {
    return `${width}`;
  }
}

function getBody(i, config) {
  const {body} = config.cells[i] || _.last(config.cells);
  const {content} = body;
  if (Array.isArray(content)) {
    return call(...content);
  } else {
    return `${content}`;
  }
}

module.exports = (config) => {
  const {rows, cols, colums, rowHeight, tableWidth} = config;

  return ejs.renderFile(__dirname + '/templates/html-grid.ejs', {
    ...config,
    _,
    getHead: (i) => getHead(i, config),
    getBody: (i) => getBody(i, config),
    getColWidth: (i) => `${getColWidth(i, config)}`,
  });
};
