require.config({
	baseUrl: BASE_URL || './',
	paths: {
		jquery: LIBS_URL + 'jquery/dist/jquery.min',
		jqueryCookie: '/scms/login/js/jquery.cookie',
		dragSort: LIBS_URL + 'jquery.dragsort/jquery.dragsort-0.5.2.min',
		css: BASE_URL + 'libs/requirejs/css',
		text: LIBS_URL + 'requirejs/text',
		angular: LIBS_URL + 'angular/angular.min',
		bootstrap: BASE_URL + 'libs/bootstrap-3.3.7-dist/js/bootstrap',
		ngResource: LIBS_URL + 'angular-resource/angular-resource.min',
		ngCookies: LIBS_URL + 'angular-cookies/angular-cookies.min',
		ngSanitize: LIBS_URL + 'angular-sanitize/angular-sanitize.min',
		uiRouter: LIBS_URL + 'angular-ui-router/release/angular-ui-router.min',
		components: BASE_URL + 'configs/components',
		angularFileUpload: LIBS_URL + 'angular-file-upload/angular-file-upload.min',

		//图表
		echarts: 'modules/chart/echarts/echarts.common.min',

		//表单验证
		autoValidate: LIBS_URL + 'angular-auto-validate/dist/jcs-auto-validate.min',

		//弹出框
		//artDialog: LIBS_URL + 'artdialog/dialog.min',

		//
		spin: LIBS_URL + 'ladda/spin.min',

		//按钮的动态样式插件
		Ladda: LIBS_URL + 'ladda/ladda.min',

		//日期选择器插件
		datepicker: LIBS_URL + 'eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',

		//日期转换插件
		moment: LIBS_URL + 'moment/min/moment.min',
		localDate: LIBS_URL + 'moment/locale/zh-cn',

		//富文本编辑器插件
		//umeditorConfig: LIBS_URL + 'umeditor/umeditor.config',
		//umeditorLang: LIBS_URL + 'umeditor/lang/zh-cn/zh-cn',
		//umeditor: LIBS_URL + 'umeditor/umeditor.min',

		//amap:'http://webapi.amap.com/maps?v=1.2&key=494b0eec4115b82c8fc4d96408ad7fa5',
		jqueryQrcode: LIBS_URL + 'jquery.qrcode/jquery.qrcode.min',
		ngSortable: LIBS_URL + 'ng-sortable/ng-sortable.min',
		ELayoutJs: '/scms/ELayout/ELayout'

	},
	packages: [
		{name: 'commonCss', location: 'css'},
		{name: 'configs', location: 'configs'},
		{name: 'libsDirective', location: LIBS_URL + 'angular-directive'},
		{name: 'modules', location: 'modules'},
		{name: 'crmModules', location: '/crm/crmModules'},
		{name: 'scmsModules', location: '/scms/scmsModules'},
		{name: 'woodpeckerModules', location: '/woodpeckerWeb/woodpeckerModules'},
		{name: 'interface', location: 'interface'},
		{name: 'hAdmin', location: 'libs/hAdmin'}
	],
	urlArgs: 'v=' + (V || '20150806'),
	shim: {
		angular: {
			deps: ['jquery', 'ELayoutJs'],
			exports: 'angular'
		},
		dragSort: ['jquery'],
		bootstrap: {
			deps: ['jquery']
		},
		ngResource: {
			deps: ['angular']
		},
		ngSanitize: {
			deps: ['angular']
		},
		ngCookies: {
			deps: ['angular']
		},
		uiRouter: {
			deps: ['angular']
		},
		components: {
			deps: ['angular']
		},
		angularFileUpload: {
			deps: ['angular']
		},
		autoValidate: {
			deps: ['angular']
		},
		//artDialog:{
		//	deps:['jquery']
		//},
		datepicker: {
			deps: ['jquery', 'moment', 'bootstrap', 'localDate']
		},
		//umeditor:{
		//	deps:['jquery','umeditorConfig']
		//},
		//umeditorLang: {
		//	deps:['umeditor']
		//},
		ngSortable: {
			deps:['angular']
		},

		ELayoutJs: {
			deps:['jquery']
		}
	}
});

require([
	'jquery',
	'jqueryCookie',
	'css!'+BASE_URL + 'libs/bootstrap-3.3.7-dist/css/bootstrap.min.css',
	'css!'+LIBS_URL + 'base.css',
	//'css!hAdmin/css/bootstrap.min.css',
	'css!hAdmin/css/font-awesome.css',
	//'css!hAdmin/css/style.css',
	'css!'+LIBS_URL + 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
	'css!commonCss/layerout.css',
	'css!/scms/ELayout/ELayout.css'
	], function($) {
		//login
		var login = function() {
			var json = {
				username: '12613',
				password: '123456',
				captcha: '5735'
			}
			$.ajax({
	            url: '/ehuodiBedrockApi/baseconfigcs/login',
	            type: 'post',
	            data: {
	                username: json.username,
	                password: json.password,
	                identifycode: json.captcha
	            },
	            success: function(data) {
	                if(data){
	                    if(data.result==='success'){	                        
	                        $.cookie('session_key',data.data.session_key, {
	                            path: '/',
	                            // domain: window.location.hostname !== 'location' ? window.location.host : ''
	                        });
	                        $.cookie('jobcard',data.data.jobcard, {
	                            path: '/',
	                            // domain: window.location.hostname !== 'location' ? window.location.host : ''
	                        });
	                        $.cookie('username',data.data.username, {
	                            path: '/',
	                            // domain: window.location.hostname !== 'location' ? window.location.host : ''
	                        });
	                        $('.form-logo').addClass('logo-show');
	                        $('.login-mascot').removeClass('login-mascot-bounce');
	                        setTimeout(function(){
	                            $('.login-mascot').addClass('login-mascot-fly');
	                        });
	                        setTimeout(function(){
	                            window.location.reload();
	                        },700);
	                    }else{
	                        $text.text(data.msg.replace(regExp, ''));
	                    }
	                }else{
	                    $text.text('登录失败');
	                }
	            },
	            error: function(){
	                $text.text('登录失败');
	            }
	        });
		}

		//获取用户信息
		var userInfo, jobcard;
		jobcard = document.cookie.match(/jobcard\=\d+/);
		if(jobcard && jobcard[0] && jobcard[0].indexOf('=') > 0) {
			jobcard = jobcard[0].split('=')[1];
		}
		var isLogin = jobcard ? true : false;
		if(!isLogin) {
			login();
			return;
		}
		$.ajax({
	        url: '/ehuodiBedrockApi/ehdrbacuserscs/selectRbacUserByParam',
	        type: 'post',
	        data: {
	            jobcard: jobcard,
	            resultstyle: '2'
	        },
	        async: false,
	        success: function(data) {
	            if(data.result === 'error' && data.msg === 'authorityFailure') {
	            	window.location.href = '/scms/login.html';
	            	login();
	            	isLogin = false;
	            	return;
	            }
	            data = data.data[0] || {};
	            data.realname = data.username;
	            data.mobilenumber = data.usermobilenumber;
	            userInfo = data;
	            userInfo.orgCodeGroup = userInfo.organizationcode;
	            userInfo.orgNameGroup = userInfo.organizationname;
	            if(userInfo.organizationcode){
	                userInfo.organizationcode = userInfo.organizationcode.split(',')[0]; //第一个为默认组织
	            }
	            if(userInfo.organizationname){
	                userInfo.organizationname = userInfo.organizationname.split(',')[0]; //第一个为默认组织
	            }
	        }
	    });
	});

require(['configs/run'], function(run){
	'use strict';
	run.start();
});
