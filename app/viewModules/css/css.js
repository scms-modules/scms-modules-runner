define([
  './cssCtrl',
  './cssService',
  './css.css',
  './css.html'
], function(
  ctrl,
  service,
  css,
  html) {
  return function(app, elem, attrs, scope){
    ctrl(app, elem, attrs, scope);
    service(app, elem, attrs, scope);
    elem.append(html);
  }
});