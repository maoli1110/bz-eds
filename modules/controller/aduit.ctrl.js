'use strict';
/**
 * audit
 */
angular.module('core').controller('auditCtrl', ['$scope', 'commonService', '$http','$uibModal','$timeout', function ($scope, commonService, $http, $uibModal,$timeout) {
	$scope.sidebar = 'audit';
    $scope.flag = {}
    //获取auditList
    commonService.auditList().then(function(data){
        $scope.auditList = data.data.slice(0,20);
    });

    commonService.getSourceList().then(function(data){
        console.log(data.data);
        $scope.sourceList = data.data;
    })

    $scope.companySelect = function(ele){
        commonService.about().then();
    }


    //修改审核状态
    $scope.getAuditList = function (source,currentPage) {
        if((source == "pass") || (source =="noPass")) {
            $scope.flag.auditStatus = false;
            $scope.listStatus = false;

        }
        commonService.auditList().then(function(data){
            $scope.auditList = data.data.slice(0,20);
        });
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
    //分页器
	$scope.totalItems = 64;
	$scope.currentPage = 1;
	$scope.setPage = function (pageNo) {
	$scope.currentPage = pageNo;
	};
	$scope.pageChanged = function() {
	};
	$scope.maxSize = 5;
	$scope.bigTotalItems = 175;
	$scope.bigCurrentPage = 1;
   
    /*分页器跳转
     * params  value
     * return currentPage
     * */
    function getDumpVal(){
        var dumpVal =  $('.dump-inp input').val();
        return dumpVal;
    }

    function setFilterStyle(obj,event){
        obj.on(event,function(){
            $(this).parent().siblings().css({'height':'auto','overflow':''})
        })
    }

    //跳转按钮
    $scope.getDumpOk = function(){
        $scope.setPage(getDumpVal());
    };

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

    //左侧审核状态切换
    /*scope.getComponent = function(status){
        commonService.auditList(status).then(function(data){
            $scope.auditList = data.data;
        })
    }*/

    //单个选择
    $scope.updateSelection = function($event,item){
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

    /*
    * 初始化模态框
    * 初始化参数配置
    * */
    $scope.showModal = function () {
        var modalInstance = $uibModal.open({
            windowClass: 'component-modal audit-modal',
            backdrop: 'static',
            animation: false,
            size: 'lg',
            templateUrl: 'template/component/modalAudit.html',
            controller: 'modalCtrl',
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
    };


    /*
     * 返回顶部
     * */
    $('.return-top').click(function() {
        $('.audit-list').animate({ scrollTop: 0 }, 500);
    })

}]);