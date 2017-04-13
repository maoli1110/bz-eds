'use strict';

angular.module('core').service('commonService', function ($http, $q) {

    // var url = "http://"+dbPort+"/rest/";
    var url ="";

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
    this.componentList = function(){
        var  url="json/data.json";
        var delay = $q.defer();
        $http.get(url).then(function(data){
            delay.resolve(data);
        },function(err){
            delay.reject(err)
        });
        return delay.promise;
    }
    this.auditList = function(){
        var url="json/uploadList.json";
        var delay = $q.defer();
        $http.get(url).then(function(data){
            delay.resolve(data);
        },function(error){
            delay.reject(error);
        });
        return delay.promise;
    }
    //自定义大类小类数据获取
    this.typeList = function(){
        var url="json/type.json";
        var delay = $q.defer();
        $http.get(url).then(function(data){
            delay.resolve(data);
        },function(error){
            delay.reject(error);
        });
        return delay.promise;
    }
    //上传构件树结构
    this.treeList = function(){
        var url="json/tree.json";
        var delay = $q.defer();
        $http.get(url).then(function(data){
            delay.resolve(data);
        },function(error){
            delay.reject(error);
        });
        return delay.promise;
    }
    //上传构件树结构
    this.getComponent = function(){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "GET",
            url: "http://192.168.3.103:9000/banzhucls/rs/component/getOrgInfo",
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
});