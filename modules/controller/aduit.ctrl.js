'use strict';
/**
 * audit
 */
angular.module('core').controller('auditCtrl', ['$scope', 'commonService', '$http','$uibModal','$timeout', function ($scope, commonService, $http, $uibModal,$timeout) {
	$scope.sidebar = 'audit';
    $scope.flag = {}
    //获取auditList
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
        console.log(data.data);
        $scope.auditList = data.data.itemList;
        changeStatus($scope.auditList);
        //所有页面中的项目总数
        $scope.bigTotalItems = data.data.totalRowCount;
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
            $scope.auditList = data.data.itemList;
            changeStatus($scope.auditList);
            //所有页面中的项目总数
            $scope.bigTotalItems = data.data.totalRowCount;
        });
    }


    commonService.getSourceList().then(function(data){
        $scope.sourceList = data.data;
    })
    //根据构件来源查询构件
    $scope.companySelect = function(ele){
        commonService.uploadList(
            {
                "status":null,
                "componentDisplayName":"",
                "originEpId":ele,
                "order":"DESC",
                "currentPage":1,
                "pageSize":20
            }
        ).then(function(data){
            $scope.auditList = data.data.itemList;
            changeStatus($scope.auditList);
            //所有页面中的项目总数
            $scope.bigTotalItems = data.data.totalRowCount;
        });
    }

    //左侧审核状态切换
    $scope.getComponent = function(status){
        if(status == '' || status == undefined){
            status = null;
        }
        console.log(status);
        commonService.uploadList(
            {
                "status":status,
                "componentDisplayName":"",
                "originEpId":null,
                "order":"DESC",
                "currentPage":1,
                "pageSize":20
            }
        ).then(function(data){
            $scope.auditList = data.data.itemList;
            changeStatus($scope.auditList);
            //所有页面中的项目总数
            $scope.bigTotalItems = data.data.totalRowCount;
        });
    }


    //修改审核状态
    $scope.getAuditList = function (source,componentId){
        $scope.flag.auditStatus = false;
        $scope.listStatus = false;
        commonService.auditStatus(
            {
                "componentIds": [componentId],
                "status": source
            }
        ).then(function(data){
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
                $scope.auditList = data.data.itemList;
                changeStatus($scope.auditList);
                //所有页面中的项目总数
                $scope.bigTotalItems = data.data.totalRowCount;
            });
        })

    }

    $scope.flag.auditStatus = false;
    $scope.editAudit = function() {
        $scope.flag.auditStatus = !$scope.flag.auditStatus;
        console.log($scope.flag.auditStatus);
        $('.audit .edi .glyphicon-menu-down').css({'transform':'rotate(180deg)'});
    }
    $timeout(function(){
        $('.aduitStatus').map(function(){
            $(this).find('.tdStatus').click(function(){
                console.log("aaaaaaaa")
                $(this).toggleClass('showMore');
                if($(this).hasClass('showMore')){
                    $(this).find('.glyphicon-menu-down').css({'transform':'rotate(180deg)'});
                }else{
                    $(this).find('.glyphicon-menu-down').css({'transform':'rotate(360deg)'});
                }
            });
        });
    },0.1)

    /*
     * 分页器
     * */
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.pageChanged = function (pageNo) {
        commonService.uploadList(
            {
                "status":null,
                "componentDisplayName":"",
                "originEpId":null,
                "order":"DESC",
                "currentPage":pageNo,
                "pageSize":20
            }
        ).then(function(data){
            $scope.auditList = data.data.itemList;
            changeStatus($scope.auditList);
            $scope.bigTotalItems = data.data.totalRowCount;
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
            $scope.auditList = data.data.itemList;
            changeStatus($scope.auditList);$scope.bigTotalItems = data.data.totalRowCount;
        });
    };

    function setFilterStyle(obj,event){
        obj.on(event,function(){
            $(this).parent().siblings().css({'height':'auto','overflow':''})
        })
    }

    //全选
    $scope.allSelected = function () {
        $(".table-list label>input").prop("checked",true);
    }
    //反选
    $scope.invertSelected = function () {
        //$(".table-list label>input").prop("checked",!$(".table-list label>input").prop("checked"));
        $(".table-list label>input").each(function () {
            $(this).prop("checked", !$(this).prop("checked"));
        });
    }



    //单个选择
    $scope.updateSelection = function($event,item){
        var delItems;
        var checkbox = $event.target;
        var action = (checkbox.checked?'add':'remove');
        updateSelected(action,item);
        $scope.delItemsTotals = delItems.length;
    }

    function updateSelected(action,item){
        var findIndex = delItems.indexOf(item);
        if(action == 'add' && findIndex == -1){
            delItems.push(item);
        }
        if(action == 'remove' && findIndex !=-1){
            delItems.splice(findIndex,1);
        }
    }
    
    //auditStatusShow
    //$scope.auditStatusShow = function () {
    //    $scope.flag.auditStatus = !$scope.flag.auditStatus
    //}

    //点击审核的其他区域，收起下拉
    $(document).click(function(event) {
        if($(event.target).attr("class") && $(event.target).attr("class").indexOf("pop-signal")!==-1){
            return false;
        }
        if($scope.flag.auditStatus){
            $scope.flag.auditStatus = false;
            $scope.$apply();
        }
        if($scope.listStatus) {
            $scope.listStatus = false;
            $scope.$apply();
        }
    });
    $(document).click(function(event) {
        /*if($(event.target).attr("class") && $(event.target).attr("class").indexOf("pop-signal")!==-1){
            return false;
        }*/
        if($scope.listStatus) {
            $scope.listStatus = false;
            $scope.$apply();
        }

    });

    /*
    * 初始化模态框
    * 初始化参数配置
    * */
    $scope.showModal = function (componentId,opinion) {
        $scope.items = {
            componentId: componentId,
            opinion: opinion
        };
        var modalInstance = $uibModal.open({
            windowClass: 'component-modal audit-modal',
            backdrop: 'static',
            animation: false,
            size: 'lg',
            templateUrl: 'template/core/modalAudit.html',
            controller: 'modalAuditCtrl',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
            //console.log(selectedItem);
            window.location.reload();
        }, function () {

        });
    };


    /*
     * 返回顶部
     * */
    $('.return-top').click(function() {
        $('.audit-list').animate({ scrollTop: 0 }, 500);
    })

    //心跳
    commonService.heartBeat();

}]);