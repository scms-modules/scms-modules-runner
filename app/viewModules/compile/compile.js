define([
  'viewModules/compile/compileCtrl',
  'viewModules/compile/compileService',
  'css!viewModules/compile/compile.css',
  'text!viewModules/compile/compile.html',
  'viewModules/allNav/allNavDirective',
  'viewModules/objectToView/objectToViewDirective'
], function(
  ctrl,
  service,
  css,
  html,
  allNavDirective,
  objectToViewDirective) {
  return function(app, elem, attrs, scope){
    ctrl(app, elem, attrs, scope);
    service(app, elem, attrs, scope);
    elem.append(html);
    allNavDirective(app, elem, attrs, scope);
    objectToViewDirective(app, elem, attrs, scope);
  }
});