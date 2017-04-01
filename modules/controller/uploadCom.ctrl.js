'use strict';
/**
 * uploadCom
 */
angular.module('core').controller('uploadComCtrl', ['$scope', '$http', '$uibModalInstance','items','$timeout','commonService',
    function ($scope, $http, $uibModalInstance,items,$timeout,commonService) {
        $scope.items = items;
        $scope.selected = {
            item: $scope.items
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        commonService.treeList().then(function(data){
            console.log(data.data);
            zNodes = data.data;
        })

        /*
        * 左侧树结构
        * */
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

        var zNodes; /*=[
            { id:1, pId:0, name:"父节点 1", open:true},
            { id:11, pId:1, name:"叶子节点 1-1"},
            { id:12, pId:1, name:"叶子节点 1-2"},
            { id:13, pId:1, name:"叶子节点 1-3"},
            { id:2, pId:0, name:"父节点 2", open:true},
            { id:21, pId:2, name:"叶子节点 2-1"},
            { id:22, pId:2, name:"叶子节点 2-2"},
            { id:23, pId:2, name:"叶子节点 2-3"},
            { id:3, pId:0, name:"父节点 3", open:true},
            { id:31, pId:3, name:"叶子节点 3-1"},
            { id:32, pId:3, name:"叶子节点 3-2"},
            { id:33, pId:3, name:"叶子节点 3-3"}
        ];*/
        $(document).ready(function(){
            $.fn.zTree.init($("#ztree"), setting, zNodes);
        });


    }])