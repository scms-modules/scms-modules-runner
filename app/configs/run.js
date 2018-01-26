/**
 * @ngdoc overview
 * @name 
 * @description
 *
 */
define(function(
) {
	'use strict';

	var user = {};
	var appName = 'App';
	var module = angular.module(appName, [
		'ui.router',
		'components',
		'ngSanitize',
		'ngCookies',
		'angularFileUpload',
		'ui.sortable',
		'jcs-autoValidate'
	]).config( [  
		'$compileProvider',  
		function( $compileProvider )  
		{     
			$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|javascript):/);  
			// Angular v1.2 之前使用 $compileProvider.urlSanitizationWhitelist(...)  
		}  
	]);  

	G(module);
	routerData(module);
	routerConfigs(module, 'allRouterData');
	reqInterceptor(module);
	loadingDirective(module);
	navsData(module);

	module.run(['G', '$rootScope', '$compile', '$location', 'validator', 'defaultErrorMessageResolver',
		function(G, $rootScope, $compile, $location, validator, defaultErrorMessageResolver) {

			G.init({
				isDebug: IS_DEBUG,
				baseUrl: BASE_URL,
				envType: ENV_TYPE,
				version: V
			}, $rootScope, $compile);

			
			
			
			validator.makeInvalid = function(el, errorMsg, a) {
				var $parents = el.parents('.form-content');
				$parents.find('.error-msg').html(errorMsg);
				el.parent().addClass('has-error');
				el.parents('.form-content-error').addClass('has-error');
			};
			validator.makeDefault = function(el) {
				var $parents = el.parents('.form-content');
				$parents.find('.error-msg').html('');
				el.parent().removeClass('has-error');
				el.parents('.form-content-error').removeClass('has-error');
			}
			
			defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
          		errorMessages['required'] = '必填项';
          		errorMessages['minlength'] = '输入不能少于{0}个字符';
          		errorMessages['maxlength'] = '输入不能多于{0}个字符';
          		errorMessages['pattern'] = '格式不正确';
          		errorMessages['email'] = '邮箱格式不正确';
          		errorMessages['number'] = '输入必须是数字';
          		errorMessages['url'] = '格式不正确';
          		errorMessages['firstNameRequired'] = "yonghuming";
          		errorMessages['max'] = "输入不能大于{0}";
          		errorMessages['phone'] = "请输入正确的手机号";
          		errorMessages['integer'] = "请输入正确的数值";
          		errorMessages['taxrate'] = "请输入正确的税率";          		
          		
        	});

        	validator.setValidElementStyling(false);
		}
	]);
	
	/*
	 * 表单验证指令
	 * phone 手机号
	 * minlength 最小字符数
	 * integer 正整数
	 * taxrate 税率 小数点>0 <1
	*/
	module.directive('phone',function(){
	    return {
	        restrict:"A",
	        require:"ngModel",
	        link:function(scope,ele,attrs,ngModelController){
	            ngModelController.$parsers.push(function(viewValue){
	                if((viewValue && viewValue.length === 11 && !viewValue.match(/\D/)) || !viewValue){
	                    ngModelController.$setValidity('phone',true);
	                }else{
	                    ngModelController.$setValidity('phone',false);
	                }
	                return viewValue;
	            });
	        }
	    }
	});
	module.directive('minlength',function(){
	    return {
	        restrict:"A",
	        require:"ngModel",
	        link:function(scope,ele,attrs,ngModelController){
	            ngModelController.$parsers.push(function(viewValue){
	                if((viewValue && viewValue.length >= 2) || !viewValue){
	                    ngModelController.$setValidity('minlength',true);
	                }else{
	                    ngModelController.$setValidity('minlength',false);
	                }
	                return viewValue;
	            });
	        }
	    }
	});
	module.directive('integer',function(){
	    return {
	        restrict:"A",
	        require:"ngModel",
	        link:function(scope,ele,attrs,ngModelController){
	            ngModelController.$parsers.push(function(viewValue){
	                if((viewValue && !viewValue.match(/\D/) && viewValue > 0) || !viewValue){
	                    ngModelController.$setValidity('integer',true);
	                }else{
	                    ngModelController.$setValidity('integer',false);
	                }
	                return viewValue;
	            });
	        }
	    }
	});
	module.directive('taxrate',function(){
	    return {
	        restrict:"A",
	        require:"ngModel",
	        link:function(scope,ele,attrs,ngModelController){
	            ngModelController.$parsers.push(function(viewValue){
	                if((viewValue && parseFloat(viewValue) + '' == viewValue && parseFloat(viewValue) > 0 && parseFloat(viewValue) < 1) || !viewValue){
	                    ngModelController.$setValidity('taxrate',true);
	                }else{
	                    ngModelController.$setValidity('taxrate',false);
	                }
	                return viewValue;
	            });
	        }
	    }
	});

	return {
		start: function(ngAppELem) {
			
			//启动angular
			angular.bootstrap(ngAppELem || document, [appName]);
		}
	}
});