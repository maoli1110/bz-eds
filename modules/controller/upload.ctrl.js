'use strict';
/**
 * upload
 */
angular.module('core').controller('uploadCtrl', ['$scope', 'commonService','$uibModal',
    function ($scope, commonService,$uibModal) {
        var dumpVal;//分页器跳转框的值
        /*
        * 我的上传页面数据
        * */
        commonService.uploadList(
            {
                "status":null,
                "componentDisplayName":"",
                "originEpId":null,
                "order":"DESC",
                "currentPage":1,
                "pageSize":20
            }
        ).then(function(data){
            $scope.uploadList = data.data.itemList;
            //所有页面中的项目总数
            $scope.bigTotalItems = data.data.totalRowCount;
            changeStatus($scope.uploadList);
            $scope.totalItems = data.data.totalRowCount;
        });

        //更改状态数字为中文
        function changeStatus(list){
            angular.forEach(list,function(data,index,arr){
                if(data.status == 1){
                    data.status = "待审核"
                }
                if(data.status == 2){
                    data.status = "已通过"
                }
                if(data.status == 3){
                    data.status = "未通过"
                }
            })
        }

        //清空input框的值
        $('.searchtext').click(function () {
            $(this).val('');
        })

        //顶部搜索构件
        $scope.search = function(searchText){
            commonService.uploadList(
                {
                    "status":null,
                    "componentDisplayName":searchText,
                    "originEpId":null,
                    "order":"DESC",
                    "currentPage":1,
                    "pageSize":20
                }
            ).then(function(data){
                $scope.uploadList = data.data.itemList;
                changeStatus($scope.uploadList);
                //所有页面中的项目总数
                $scope.bigTotalItems = data.data.totalRowCount;
            });
        }

        //左侧审核状态切换
        $scope.getComponent = function(status){
            $scope.status = status;
            commonService.uploadList(
                {
                    "status":$scope.status ,
                    "componentDisplayName":"",
                    "originEpId":null,
                    "order":"DESC",
                    "currentPage":1,
                    "pageSize":20
                }
            ).then(function(data){
                $scope.uploadList = data.data.itemList;
                //changeStatus($scope.auditList);
                //所有页面中的项目总数
                $scope.bigTotalItems = data.data.totalRowCount;
            });
        }

        /*
        * 查看审核意见
        * */
        $scope.getOpinion = function(opinion){
            if(opinion == ''){
                $scope.opinion = "暂无";
            }else{
                $scope.opinion = opinion;
            }
        }

        /*
         * 分页器
         * */
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function (pageNo) {
            commonService.uploadList(
                {
                    "status":$scope.status ,
                    "componentDisplayName":"",
                    "originEpId":null,
                    "order":"DESC",
                    "currentPage":pageNo,
                    "pageSize":20
                }
            ).then(function(data){
                $scope.uploadList = data.data.itemList;
                changeStatus($scope.uploadList);
            });
        };
        //分页大小限制号码。
        $scope.maxSize = 5;

        /*分页器跳转
         * params  value
         * return currentPage
         * */
        var dumpVal;
        function getDumpVal() {
            dumpVal = $('.dump-inp input').val();
            return dumpVal;
        }

        /*分页器跳转
         * params  value
         * return currentPage
         * */
        //$scope.setPage(getDumpVal());
        $scope.getDumpOk = function () {
            $scope.setPage(getDumpVal());
            var page = parseInt(getDumpVal());
            commonService.uploadList(
                {
                    "status":null,
                    "componentDisplayName":"",
                    "originEpId":null,
                    "order":"DESC",
                    "currentPage":page,
                    "pageSize":20
                }
            ).then(function(data){
                $scope.uploadList = data.data.itemList;
                changeStatus($scope.uploadList);
            });
        };

        //返回顶部
        $('.return-top').click(function() {
            $('.component-list').animate({ scrollTop: 0 }, 500);
        });


        /*
         * 上传构件
         * */
        $scope.uploadCom = function() {
            var modalInstance = $uibModal.open({
                windowClass: 'uploadCom-modal',
                backdrop: 'static',
                animation: false,
                size: 'lg',
                templateUrl: 'template/component/uploadCom.html',
                controller: 'uploadComCtrl',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                //console.info('Modal dismissed at: ' + new Date());
            });
        }

        /*按上传时间排序*/
        $scope.asByTimes = function($event){
            var list = $scope.uploadList;
            var unit = _.sortBy(list, function(item) {
                return item.uploadTime;
            });
            $scope.uploadList = unit;
            $($event.target).addClass("funSortLeftActive");
            $($event.target).siblings().removeClass("funSortRightActive");
        }
        $scope.deByTimes = function($event){
            var list = $scope.uploadList;
            var unit = _.sortBy(list, function(item) {
                return -item.uploadTime;
            });
            $scope.uploadList = unit;
            $($event.target).addClass("funSortRightActive");
            $($event.target).siblings().removeClass("funSortLeftActive");
        }

        //心跳
        commonService.heartBeat();

    }]);