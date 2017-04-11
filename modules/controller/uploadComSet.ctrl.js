'use strict';
/**
 * uploadCom
 */
angular.module('core').controller('uploadComSetCtrl', ['$scope', '$http', '$uibModalInstance','items','$timeout','commonService',
    function ($scope, $http, $uibModalInstance,items,$timeout,commonService) {
        $scope.items = items;
        $scope.selected = {
            item: $scope.items
        };

        $scope.ok = function () {
            //$uibModalInstance.close($scope.selected.item);
            $('#container').show();
            var strJson = {
                /*[
                 {"GUID":"","typeID":"","BigTypeID":""}
                 ]*/
            };
            BzCloudComp.UpLoadDetail(strJson, strCompID);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        /*
         * 左侧树结构
         * */
        var zNodes;
        var setting = {
            check: {
                enable: true,
                chkStyle: "checkbox",
                chkboxType: { "Y": "p", "N": "s" }
            },
            view: {
                showIcon: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            }
        };

        /*获取上传构件左侧树结构*/
        //var zNodes = BzCloudComp.GetUpLoadDetail();
        commonService.treeList().then(function(data){
            console.log(data.data);
            zNodes = data.data;
            console.log(zNodes);
        })

        $(document).ready(function(){
            $.fn.zTree.init($("#ztree"), setting, zNodes);
        });

    }])
