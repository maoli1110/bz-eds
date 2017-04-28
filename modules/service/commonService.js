'use strict';

angular.module('core').service('commonService', function ($http, $q) {

    // var url = "http://"+dbPort+"/rest/";
    var url ="";
    var urls = "http://192.168.3.103:9001/banzhucls/rs/";

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

    //正常情况下getData
    this.getData = function(){
        var delay = $q.defer();
        var url_join = 'json/data.json';
        $http.get(url_join,{'withCredentials':true}).then(function(data){
            delay.resolve(data);
        },function(error){
            delay.resolve(error)
        });
        return delay.promise;
    }

    //正常情况下postData
    this.postData = function(params){
        var delay = $q.defer();
        var url_join = url + 'function/analysis/functionList';
        $http.post(url_join,params,{'withCredentials':true}).success(function(data){
            delay.resolve(data);
        }).error(function(error){
            delay.reject(error);
        })
        return delay.promise;
    }

    //获取后台数据503错误解决示例getData
    this.getData = function (params) {
        var delay = $q.defer();
        var url_join = 'json/data.json';
        $http.get(url_join,{transformRequest: angular.identity}).then(function(data){
            delay.resolve(data);
        },function(error){
            delay.reject(error);
        })
        return delay.promise;
    }
    //获取后台数据503错误解决示例postData
    this.postData = function(obj){
        var delay = $q.defer();
        var url_join = url+"rs/trends/projectTrends";
        $http.post(url_join,obj,{transformRequest: angular.identity}).then(function(data){
            delay.resolve(data);
        },function(error){
            delay.resolve(error);
        });
        return delay.promise;
    }
    /*
    *构件数据ajax请求
    * type:get;
    * return data
    * */
    /*this.componentList = function(){
        var  url="json/data.json";
        var delay = $q.defer();
        $http.get(url).then(function(data){
            delay.resolve(data);
        },function(err){
            delay.reject(err)
        });
        return delay.promise;
    }*/
    //我的上传、审核假数据
    /*this.auditList = function(){
        var url="json/uploadList.json";
        var delay = $q.defer();
        $http.get(url).then(function(data){
            delay.resolve(data);
        },function(error){
            delay.reject(error);
        });
        return delay.promise;
    }*/
    //构件来源树结构
    this.getComponent = function(){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "GET",
            url: urls + "component/getOrgInfo",
            contentType:'application/json;',
            success: function(data){
                delay.resolve(data);
            },
            error:function(error){
                //delay.reject(JSON.parse(error.responseText));
            }
        });
        return delay.promise;
    }
    //获取类型和风格
    this.getTypeStyle = function(){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "GET",
            url:  urls + "component/findFeature",
            contentType:'application/json;',
            success: function(data){
                delay.resolve(data);
            },
            error:function(error){
                //delay.reject(JSON.parse(error.responseText));
            }
        });
        return delay.promise;
    }
    //删除构件
    this.deleteCom = function(){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "POST",
            url: urls + "component/delete",
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
    //按大类、小类、风格、品牌、查询
    this.about = function(param){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "post",
            data: JSON.stringify(param),
            url: urls + 'component/findComponent',
            contentType:'application/json;',
            success: function(data){
                delay.resolve(data);
            },
            error:function(error){
                //delay.reject(JSON.parse(error.responseText));
            }
        });
        return delay.promise;
    }
    //我的上传--搜索大图模式
    this.largePattern = function(param){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "post",
            data: JSON.stringify(param),
            url: urls + 'review/findReviewComponent',
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
    //我的上传--搜索列表模式
    this.uploadList = function(param){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "post",
            data: JSON.stringify(param),
            url: urls + 'review/find',
            contentType:'application/json;',
            success: function(data){
                delay.resolve(data);
            },
            error:function(error){
                //delay.reject(JSON.parse(error.responseText));
            }
        });
        return delay.promise;
    }
    //审核状态更新
    this.auditStatus = function(param){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "post",
            data: JSON.stringify(param),
            url: urls + 'review/update/status',
            contentType:'application/json;',
            success: function(data){
                delay.resolve(data);
            }/*,
            error:function(error){
                delay.reject(JSON.parse(error.responseText));
            }*/
        });
        return delay.promise;
    }
    //审核意见更新
    this.idea = function(param){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "post",
            data: JSON.stringify(param),
            url: urls + 'review/update/opinion',
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
    //来源企业列表
    this.getSourceList = function(){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "GET",
            url: urls + "component/findOriginEp",
            contentType:'application/json;',
            success: function(data){
                delay.resolve(data);
            },
            error:function(error){
                //delay.reject(JSON.parse(error.responseText));
            }
        });
        return delay.promise;
    }
    //云构件库构件详情
    this.comDetails = function(param){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "GET",
            url: urls + 'component/findComponentDetail/'+param,
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
    //我的上传构件详情
    this.uploadDetails = function(param){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "GET",
            url: urls + 'review/get/'+param,
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
    //心跳机制
    function getheartBeat  () {
        var delay = $q.defer();
        var url_join="rs/co/heartBeat";
        $http.get(url_join)
            .success(function (data) {
                delay.resolve(data);
            }).error(function (data, status) {
            delay.reject(data);
        });
        return delay.promise;
    };

    function refreshState() {
        getheartBeat().then(function(){});
    }
    //设置间隔获取状态
    this.heartBeat = function () {
        ApplicationConfiguration.refreshID = setInterval(refreshState, 20*60*1000);
        // ApplicationConfiguration.refreshID = setInterval(refreshState, 10*1000);
    }
    //登录
    this.login = function(param){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "GET",
            url: 'http://pdstest5.lubansoft.net/login/'+param,
            contentType:'application/x-www-form-urlencoded;',
            success: function(data){
                delay.resolve(data);
            },
            error:function(error){
                delay.reject(JSON.parse(error.responseText));
            }
        });
        return delay.promise;
    }

});