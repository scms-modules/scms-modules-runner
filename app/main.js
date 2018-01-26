//main.js 

import '../app/main.css';

//import 'angular';
import 'angular-ui-router';
import ngCookies from 'angular-cookies';
import ngSanitize from 'angular-sanitize';
import angularFileUpload from 'angular-file-upload';
import 'angular-auto-validate/dist/jcs-auto-validate.min';
import 'ng-sortable/dist/ng-sortable.min';

import './configs/components.js';
import routerConfigs from './configs/routerConfigs.js';
import reqInterceptor from './configs/reqInterceptor.js';
import G from './configs/G.js';
import routerData from './configs/routerData.js';
import scmsmodules from 'scmsmodules';


var appName = 'App';
var module = angular.module(appName, [
    'ui.router',
    'components',
    'ngSanitize',
    'ngCookies',
    'angularFileUpload',
    'ui.sortable',
    'jcs-autoValidate'
]).config(['$compileProvider',  
    function($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|javascript):/);  
    }  
]);

G(module);
routerData(module);
routerConfigs(module, 'allRouterData');
//reqInterceptor(module);


angular.bootstrap(document, [appName]);