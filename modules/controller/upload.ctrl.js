'use strict';
/**
 * upload
 */
angular.module('core').controller('uploadCtrl', ['$scope', 'commonService',
    function ($scope, commonService) {
        /*
        * 我的上传页面数据
        * */
        commonService.auditList().then(function(data){
            $scope.auditList = data.data;
        });

        /*
        * 分页
        * */
        var  dumpVal;//分页器跳转框的值
        $scope.totalItems = 64;
        $scope.currentPage = 1;
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
            //console.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
        /*分页器跳转
         * params  value
         * return currentPage
         * */
        function getDumpVal(){
            dumpVal =  $('.dump-inp input').val();
            return dumpVal;

        }
        $scope.setPage(getDumpVal());
        $scope.getDumpOk = function(){
            $scope.setPage(getDumpVal());
        };

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