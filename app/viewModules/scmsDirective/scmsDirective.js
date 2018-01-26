import demoJson from 'scmsmodules/demo';
define([
  'scmsModules/ngHtmlContainer/ngHtmlContainer',
  './componentDirective',
  '../objectToView/objectToViewDirective',
  './scmsDirectiveCtrl',
  './scmsDirective.css',
  './scmsDirective.html'
], function(
  ngHtmlContainer,
  componentDirective,
  objectToViewDirective,
  ctrl,
  css,
  html) {
  return function(app, elem, attrs, scope){
    ngHtmlContainer(app, elem, attrs, scope);
    componentDirective(app, elem, attrs, scope);
    objectToViewDirective(app, elem, attrs, scope);
    ctrl(app, elem, attrs, scope, demoJson);
    elem.append(html);
  }
});