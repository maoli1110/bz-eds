'use strict';
/**
 * audit
 */
angular.module('core').controller('auditCtrl', ['$scope', 'commonService', '$http','$uibModal', function ($scope, commonService, $http, $uibModal) {
	$scope.sidebar = 'audit';
    $scope.flag = {}
    //获取auditList
    $scope.getAuditList = function (source,currentPage) {
        if((source == "pass") || (source =="noPass")) {
            $scope.flag.auditStatus = false;
            $scope.listStatus = false;

        }
        commonService.auditList().then(function(data){
            //console.log('success');
            $scope.auditList = data.data.slice(0,20);
            //console.log($scope.auditList);
        });
    }
    $scope.getAuditList(); 
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
    $scope.flag.auditStatus = false;
    $scope.editAudit = function() {
        $scope.flag.auditStatus = !$scope.flag.auditStatus;
        if($scope.flag.auditStatus = 'true') {
            $('.audit .edit>span').removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
        }
    }
    /*
     * 返回顶部
     * */
    $('.return-top').click(function() {
        $('.audit-list').animate({ scrollTop: 0 }, 500);
    })

}]);