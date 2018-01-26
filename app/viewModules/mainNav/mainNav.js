define([
  './mainNavCtrl',
  'scmsModules/mainNav/mainNavDirective',
  './mainNav.html'
], function(
  ctrl,
  mainNavDirective,
  html) {
  return function(app, elem, attrs, scope){
    ctrl(app, elem, attrs, scope);
    mainNavDirective(app, elem, attrs, scope);
    elem.append(html);
  }
});