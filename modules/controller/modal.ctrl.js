/**
 * Created by sdergt on 2017/3/9.
 */
angular.module('core').controller('modalCtrl', ['$scope', '$http', '$uibModalInstance','items','$timeout','commonService','$stateParams',
    function ($scope, $http, $uibModalInstance,items,$timeout,commonService,$stateParams) {
    /*
     * 构件库数据展示
     * */
    commonService.comDetails(items).then(function(data){
        var list = data.data;
        $scope.list = data.data;
        //判断上传、下载、应用按钮显隐（来源id待补）
        $scope.status = BzCloudComp.GetCompType(list.subClassName, list.guid, list.md5, list.epId, list.originEpId, list.lastestClientVersion);
    })
    $scope.otherList = JSON.parse(BzCloudComp.GetCompDetail(items)).detail;
        /*$scope.otherList =
            [
                {
                    "key": "CompName",
                    "value": "现代单人沙发01",
                    "name": "构件名称"
                },
                {
                    "key": "Length",
                    "value": "950",
                    "name": "长度"
                },
                {
                    "key": "Width",
                    "value": "800",
                    "name": "宽度"
                },
                {
                    "key": "Height",
                    "value": "840",
                    "name": "高度"
                },
                {
                    "key": "HeightToFlr",
                    "value": "0",
                    "name": "离地高度"
                },
                {
                    "key": "Mat",
                    "value": "无",
                    "name": "材质"
                },
                {
                    "key": "Brand",
                    "value": "无",
                    "name": "品牌"
                },
                {
                    "key": "Series",
                    "value": "无",
                    "name": "系列"
                },
                {
                    "key": "Specifications",
                    "value": "无",
                    "name": "规格"
                },
                {
                    "key": "Model",
                    "value": "无",
                    "name": "型号"
                }
            ]*/

    $scope.selected = {
        item: $scope.items
    };

    //构建下载
    $scope.down = function (componentId) {
        BzCloudComp.DownloadComp(componentId);
        commonService.comDetails(items).then(function(data){
            console.log(data.data);
            var list = data.data;
            $scope.list = data.data;
            //判断上传、下载、应用按钮显隐
            $scope.status = BzCloudComp.GetCompType(list.subClassName, list.guid, list.md5, list.epId, list.originEpId, list.lastestClientVersion);
            var e = {
                componentId: componentId,
                status: $scope.status
            }
        })
        var e = {
            componentId: componentId,
            status: $scope.status
        }
        $uibModalInstance.close(e);
    };

    //应用
    $scope.apply = function(subClassName,guid,componentId,originEpId){
        BzCloudComp.UseComp(subClassName,guid,componentId,originEpId);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.$on('ngComponeted', function (ngRepeatFinishedEvent) {
        $('.component-modal .modal-left li .preview-small span').hover(function () {
            var previewSrc = $(this).find('img').attr('src');
            $(this).parent().siblings().find('img').attr('src', previewSrc)
        })

    })

    //心跳
    commonService.heartBeat();
    }])