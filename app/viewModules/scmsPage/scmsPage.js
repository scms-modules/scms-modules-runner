import demoJson from 'scmsmodules/demo';
define([
  './scmsPageCtrl',
  '../standard/standard.css',
  './scmsPage.html'
], function(
  ctrl,
  css,
  html) {
  return function(app, elem, attrs, scope){
    ctrl(app, elem, attrs, scope, demoJson);
    elem.append(html);
  }
});