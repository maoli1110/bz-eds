'use strict';

app.service('commonService', function ($http, $q) {

    var url = "http://"+dbPort+"/rest/";

    /**
     * [testApi get-jquery-版本]
     * @param  {[type]} param [description]
     * @return {[type]}       [description]
     */
    this.testApi = function(param){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "GET",
            url: url+'feedback/problem/attach/'+param,
            contentType:'application/json;',
            success: function(data){
                delay.resolve(data);
            },
            error:function(error){
                delay.reject(JSON.parse(error.responseText));
            }
        });
        return delay.promise;
    }

    /**
     * [testApi1 get-$http-版本]
     * @param  {[type]} param [description]
     * @return {[type]}       [description]
     */
    this.testApi1 = function(param){
        alert('1');
        // param = JSON.stringify(param);
        var delay = $q.defer();
        var url_join = url+'feedback/problem/attach/'+param;
        $http.get(url_join).success(function(data){
            delay.resolve(data)
        }).error(function(err){
            delay.reject(err)
        });
        return delay.promise;
    };
    //产品列表
    this.producturl=function () {
        var delay = $q.defer();
        var url_join = url+'/enterprise/list/queryClientIdList';
        $http.get(url_join,{'withCredentials':true}).success(function(data){
            delay.resolve(data)
        }).error(function(err){
            delay.reject(err)
        });
        return delay.promise;
    };
    //日均访问量
    this.dailylonline = function (param) {
        var delay = $q.defer();
        var url_join = url+'analysis/loginlog/daily/user/average/'+param.timestamp+'/'+param.pids;
        $http.get(url_join,{'withCredentials':true}).success(function(data){
            delay.resolve(data)
        }).error(function(err){
            delay.reject(err)
        });
        return delay.promise;
    };
    //每日最高访问量
    this.dailyonlinemax=function (param) {
        var delay = $q.defer();
        var url_join = url+'analysis/loginlog/daily/user/max/'+param.dailymax;
        $http.get(url_join,{'withCredentials':true}).success(function(data){
            delay.resolve(data)
        }).error(function(err){
            delay.reject(err)
        });
        return delay.promise;
    };
    //累计装机量
    this.countdowning=function () {
        var delay = $q.defer();
        var url_join = url+'analysis/loginlog/daily/client/inclement';
        $http.get(url_join,{'withCredentials':true}).success(function(data){
            delay.resolve(data)
        }).error(function(err){
            delay.reject(err)
        });
        return delay.promise;
    };
    //累计新增用户人数
    this.countuser=function () {
        var delay = $q.defer();
        var url_join = url+'analysis/loginlog/daily/user/inclement';
        $http.get(url_join,{'withCredentials':true}).success(function(data){
            delay.resolve(data)
        }).error(function(err){
            delay.reject(err)
        });
        return delay.promise;
    };
    //在线用户
    this.onlineuser=function () {
        var delay = $q.defer();
        var url_join = url+'analysis/online/user_current';
        $http.get(url_join,{'withCredentials':true}).success(function(data){
            delay.resolve(data)
        }).error(function(err){
            delay.reject(err)
        });
        return delay.promise;
    };
    //24内在线用户
    this.WithinOneday=function () {
        var delay = $q.defer();
        var url_join = url+'analysis/online/user';
        $http.get(url_join,{'withCredentials':true}).success(function(data){
            delay.resolve(data)
        }).error(function(err){
            delay.reject(err)
        });
        return delay.promise;
    };
    //日累计登录
    this.everyDayTotal=function () {
        var delay = $q.defer();
        var url_join = url+'analysis/loginlog/daily/user/logintimes';
        $http.get(url_join,{'withCredentials':true}).success(function(data){
            delay.resolve(data)
        }).error(function(err){
            delay.reject(err)
        });
        return delay.promise;
    }

    //功能分析-查询功能列表
    this.functionList = function(params){
        var delay = $q.defer();
        var url_join = url + 'function/analysis/functionList';
        $http.post(url_join,params,{'withCredentials':true}).success(function(data){
            delay.resolve(data);
        }).error(function(error){
            delay.reject(error);
        })
        return delay.promise;
    }
    //功能分析-置顶制底设置
    this.functionStatus = function(params){
        var delay = $q.defer();
        var url_join = url + 'function/analysis/functionList/functionStatus'; 
        $http.post(url_join,params,{'withCredentials':true}).success(function(data){
            delay.resolve(data);
        }).error(function(error){
            delay.reject(error);
        })
        return delay.promise;
    }
    //功能分析-查询功能每日使用次数
    this.functionDetail = function(param){
        var delay = $q.defer();
        var url_join = url + 'function/analysis/functionDetail/'+param.productId+'/'+param.functionName;
        $http.get(url_join,{'withCredentials':true}).success(function(data){
            delay.resolve(data);
        }).error(function(error){
            delay.reject(error);
        })
        return delay.promise;
    }
    //菜单管理接口
    this.getMenu = function(param){
        var delay = $q.defer();
        var url_join = url + 'menu/'+param;
        $http.get(url_join,{'withCredentials':true}).success(function(data){
            delay.resolve(data);
        }).error(function(error){
            delay.reject(error);
        })
        return delay.promise;
    }

    /**
    * 运行Ajax请求，参数为对象
    * 调用(eg:HTS.runAjaxJson({url:''，success:function(data){}}));
    * 注意:参数url为必须，参数success为必须
    *
    * @param options
    *  sbt			//提交是使其不可用的jquery对象,一般是提交按钮(eg:$("#addUser") or )
    *  url			//请求的地址<br>
    *	data		//请求的发送的数据<br>
    *	type		//请求发送方式-默认POST<br>
    *	dataType	//返回数据类型-json<br>
    *	cache		//是否缓存-默认false<br>
    *
    *	success		//请求成功方法<br>
    *	error		//请求错误方法<br>
    *	beforeSend	//请求之前方法,如果存在该方法按钮的不可用失效<br>
    *	complete	//请求完成方法,如果存在该方法按钮的不可用失效<br>
    *	async		//同步方式(同步或异步,默认异步)
    *
    */
    this.runAjaxJson = function(options){
        var opt 		= options || {};				//参数对象
        var sbt 		= opt.sbt;						//提交是使其不可用的jquery对象-一般是提交按钮(eg:$("#addUser") or )
        var httpUrl 	= opt.httpUrl || '';				//请求的地址
        var data 		= opt.data || {};				//请求的发送的数据
        var type 		= opt.type || "POST";			//请求发送方式-默认POST
        var dataType	= opt.dataType || "json";		//返回数据类型-json
        var cache 		= opt.cache;			//是否缓存-默认false
        var success		= opt.success;					//请求成功方法
        var error		= opt.error;					//请求错误方法
        var beforeSend	= opt.beforeSend;				//请求之前方法
        var complete	= opt.complete;					//请求完成方法
        var async 		= opt.async || false;		    //同步方式(同步或异步,默认异步)
        if(opt.cache === undefined ) {
            cache = false;
        }
        if(opt.async === undefined ) {
            async = true;
        }

        $.ajax({													//合成请求
            url 	: 	url+httpUrl,
            async 	:	async,
            data	: 	data ,
            type 	: 	type ,
            dataType :dataType,
            cache 	: cache,
            xhrFields: {
                withCredentials: true
            },
            beforeSend:function(jqXHR,settings){					//请求之前方法
                if(beforeSend){//存在之前方法
                    beforeSend(jqXHR,settings);
                }else{			//不存在之前方法
                    if(sbt){//按钮对象
                        sbt.attr('disabled',true);	//按钮为不可用
                    }
                }
            },
            success : success,
            error : function(jqXHR,textStatus,errorThrown) {		//请求错误方法
                if(error){
                    error(jqXHR,textStatus,errorThrown);
                    layer.closeAll();
                }else{
                    if(layer){	//存在layer组件
                        layer.msg('请求错误,请重试!', 3, {shade : false,rate : 'top'});
                    }else{
                        alert("请求错误,请重试!"+jqXHR+" "+textStatus+" "+errorThrown);
                    }
                    layer.closeAll();
                }
            },
            complete:function(jqXHR,textStatus){					//请求完成方法
                if(complete){//存在完成方法
                    complete(jqXHR,textStatus);
                }else{		//不存在完成方法
                    if(sbt){//按钮对象
                        sbt.attr('disabled',false);//按钮为可用
                    }
                }
            }
        });

    };

});