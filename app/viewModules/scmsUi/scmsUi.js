import demoJson from 'scmsmodules/demo';
define([
  'scmsModules/ngHtmlContainer/ngHtmlContainer',
  './scmsUiDirective',
  './componentDirective',
  '../objectToView/objectToViewDirective',
  './scmsUiCtrl',
  './scmsUi.css',
  './scmsUi.html'
], function(
  ngHtmlContainer,
  scmsUiDirective,
  componentDirective,
  objectToViewDirective,
  ctrl,
  css,
  html) {
  return function(app, elem, attrs, scope){
    ngHtmlContainer(app, elem, attrs, scope);
    scmsUiDirective(app, elem, attrs, scope);
    componentDirective(app, elem, attrs, scope);
    objectToViewDirective(app, elem, attrs, scope);
    ctrl(app, elem, attrs, scope, demoJson);
    elem.append(html);
  }
});