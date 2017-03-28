'use strict';
/**
 * upload
 */
angular.module('core').controller('uploadCtrl', ['$scope', 'commonService',
    function ($scope, commonService) {
        /*
        * 我的上传页面数据
        * */
        var data;
        var num
        commonService.auditList().then(function(data){
            //$scope.auditList = data.data;
            data = data.data;
            num = data.length;
            $scope.totalItems = num;
            //$scope.auditList = data.slice(0,10);
            /*
            * 分页
            * */
            var  dumpVal;//分页器跳转框的值
            //共有多少条数据
            //$scope.totalItems = 64;
            $scope.currentPage = 1;
            //$scope.setPage($scope.currentPage);
            //最多显示5页其他的用···代替
            $scope.maxSize = 5;
            //$scope.setPage($scope.currentPage);
            $scope.setPage = function (pageNo) {
                pageNo = pageNo?pageNo:1;
                $scope.currentPage = pageNo;
                $scope.auditList = data.slice((10 * (pageNo - 1)), (10 * pageNo));
                console.log((10 * (pageNo - 1)), (10 * pageNo))
            };
           // 每当页面更改时，这可以用于调用函数。
            $scope.pageChanged = function(currentPage) {
                console.log('Page changed to: ' + $scope.currentPage);
                $scope.setPage(currentPage);
            };
            $scope.setPage($scope.currentPage);

            /*分页器跳转
             * params  value
             * return currentPage
             * */
            function getDumpVal(){
                dumpVal =  $('.dump-inp input').val();
                return dumpVal;

            }
            $scope.setPage(getDumpVal());
            //跳转到多少页
            $scope.getDumpOk = function(){
                $scope.setPage(getDumpVal());
            };
        });

        //返回顶部
        $('.return-top').click(function() {
            $('.component-list').animate({ scrollTop: 0 }, 500);
        });

        /*
        * 排序逻辑
        * */
        function toQfw(){
            var str_n=n.toString();
            var result="";
            var re=/\d{3}$/;
            while(re.test(str_n)){
                result=RegExp.lastMatch+result;
                if(str_n!=RegExp.lastMatch){
                    result=","+result;
                    str_n=RegExp.leftContext; //匹配成功，返回匹配内容左侧的字符信息
                }
                else{
                    num="";
                }
            }
            if(str_n){
                return(str_n+result);
            }
        }

        /*按上传时间排序*/

    }]);