import demoJson from 'scmsmodules/demo';
define([
  'scmsModules/ngHtmlContainer/ngHtmlContainer',
  './cssbaseDirective',
  './componentDirective',
  '../objectToView/objectToViewDirective',
  './cssbaseCtrl',
  './cssbaseService',
  './cssbase.css',
  './cssbase.html'
], function(
  ngHtmlContainer,
  cssbaseDirective,
  componentDirective,
  objectToViewDirective,
  ctrl,
  service,
  css,
  html) {
  return function(app, elem, attrs, scope){
    ngHtmlContainer(app, elem, attrs, scope);
    cssbaseDirective(app, elem, attrs, scope);
    componentDirective(app, elem, attrs, scope);
    objectToViewDirective(app, elem, attrs, scope);
    ctrl(app, elem, attrs, scope, demoJson);
    service(app, elem, attrs, scope);
    elem.append(html);
  }
});