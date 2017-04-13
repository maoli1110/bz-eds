'use strict';
/**
 * uploadCom
 */
angular.module('core').controller('uploadComCtrl', ['$scope', '$http', '$uibModalInstance','items','$timeout','commonService','$uibModal',
    function ($scope, $http, $uibModalInstance,items,$timeout,commonService,$uibModal,$routeParams) {
        /*
        * 弹框的最大化和还原(待续)
        * */
        $scope.status = 0;
        $scope.statusSet = 0;
        function max(obj){
            $(this)
        }
        $scope.max = function() {
            $scope.status = 1;
        }
        $scope.revert = function() {
            $scope.status = 0;
        }
        $scope.maxSet = function() {
            $scope.statusSet = 1;
        }
        $scope.revertSet = function() {
            $scope.statusSet = 0;
        }
        $scope.items = items;
        $scope.selected = {
            item: $scope.items
        };

        $scope.ok = function () {
            //$uibModalInstance.close($scope.selected.item);
            var strJson = {
                /*[
                 {"GUID":"","typeID":"","BigTypeID":""}
                 ]*/
            };
            //BzCloudComp.UpLoadDetail(strJson, strCompID);
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
            zNodes = data.data;
        })
        $(document).ready(function(){
            $.fn.zTree.init($(".uploadCom .ztree"), setting, zNodes);
        });

    }])