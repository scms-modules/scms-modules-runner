import demoJson from 'scmsmodules/demo';
import ngHtmlContainer from 'scmsModules/ngHtmlContainer/ngHtmlContainer';
import scmsUiDirective from './scmsUiDirective';
import componentDirective from './componentDirective';
import objectToViewDirective from '../objectToView/objectToViewDirective';
import ctrl from './scmsUiCtrl';
import './scmsUi.css';
import html from './scmsUi.html';

export default (app, elem, attrs, scope) => {
  ngHtmlContainer(app, elem, attrs, scope);
  scmsUiDirective(app, elem, attrs, scope);
  componentDirective(app, elem, attrs, scope);
  objectToViewDirective(app, elem, attrs, scope);
  ctrl(app, elem, attrs, scope, demoJson);
  elem.append(html);
};
