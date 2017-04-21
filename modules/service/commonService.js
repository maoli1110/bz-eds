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
    //我的上传、审核假数据
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
    //构件来源树结构
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
    //获取类型和风格
    this.getTypeStyle = function(){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "GET",
            url: "http://192.168.3.103:9000/banzhucls/rs/component/findFeature",
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
    //删除构件
    this.deleteCom = function(){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "POST",
            url: "http://192.168.3.103:9000/banzhucls/rs/component/delete",
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
    /*//我的审核审核状态查询列表
    this.auditList() = function(){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "POST",
            url: "http://192.168.3.103:9000/banzhucls/rs/component/findReviewComponent",
            contentType:'application/json;',
            success: function(data){
                delay.resolve(data);
            },
            error:function(error){
                delay.reject(JSON.parse(error.responseText));
            }
        });
        return delay.promise;
    }*/
    //查询
    this.about = function(param){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "post",
            data: JSON.stringify(param),
            url: 'http://192.168.3.103:9000/banzhucls/rs/component/findComponent',
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
    //我的上传--搜索大图模式
    this.largePattern = function(param){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "post",
            data: JSON.stringify(param),
            url: 'http://192.168.3.103:9000/banzhucls/rs/review/findReviewComponent',
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
    this.uplaodList = function(param){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "post",
            data: JSON.stringify(param),
            url: 'http://192.168.3.103:9000/banzhucls/rs/review/find',
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
    //审核状态更新
    this.auditStatus = function(param){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "post",
            data: JSON.stringify(param),
            url: 'http://192.168.3.103:9000/banzhucls/rs/component/findComponent',
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
    //审核意见更新
    this.idea = function(param){
        // param = JSON.stringify(param);
        var delay = $q.defer();
        $.ajax({
            type: "post",
            data: JSON.stringify(param),
            url: 'http://192.168.3.103:9000/banzhucls/rs/component/findComponent',
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
            url: "http://192.168.3.103:9000/banzhucls/rs/component/findOriginEp",
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