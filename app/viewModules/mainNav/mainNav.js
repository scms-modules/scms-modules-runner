import ctrl from './mainNavCtrl';
import mainNavDirective from 'scmsModules/mainNav/mainNavDirective';
import html from './mainNav.html';

export default (app, elem, attrs, scope) => {
  ctrl(app, elem, attrs, scope);
  mainNavDirective(app, elem, attrs, scope);
  elem.append(html);
};