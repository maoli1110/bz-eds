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
                chkboxType: { "Y": "s", "N": "s" }
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
        var treeObj;
        var nodes;
        zNodes = BzCloudComp.GetUpLoadDetail();
        zNodes = JSON.parse(zNodes);
        status(zNodes);
        function status(param) {
            if(null != param)
            {
                switch (param.status) {
                    case "1":
                        param.name = "(新增)" + param.name;
                        break;
                    case "2":
                    case "3":
                        param.name = "(更新)" + param.name;
                        break;
                    default:
                        break;
                }
            }

            if (null == param || null == param.children
                || "" == param.children) {
                return;
            }

            for (var i=0; i < param.children.length;i++) {
                status(param.children[i]);
            }
        }
        $(document).ready(function(){
            $.fn.zTree.init($(".uploadCom .ztree"), setting, zNodes);
            treeObj = $.fn.zTree.getZTreeObj("treeLeft");
            treeObj.expandAll(true);
        });
        $scope.upload = function(){
            var check;
            if($('.uploadCom .public>input').prop('checked') == true){
                check = 0;
            }else{
                check = 1;
            }
            nodes = treeObj.getChangeCheckedNodes();
            var selectNodes = [];
            for(var i = 0;i < nodes.length;i++){
                var obj = {
                    identify: nodes[i].identify,
                    type: nodes[i].type,
                    status: nodes[i].status
                }
                selectNodes.push(obj);
                //判断上传构件中是否存在新增构件
                if(nodes[i].status == '' || nodes[i].status == undefined){
                    alert("请选择构件！")
                }
                if(nodes[i].status == 1){
                    //如果是，弹出权限设置,选择后上传
                    $('.uploadComSet').show();
                    $('.uploadCom').hide();
                } else {
                    //如果否，直接上传
                    BzCloudComp.UpLoadDetail(check,selectNodes);
                    $('.uploadCom').hide();
                    $('.progressWrap').show();
                }
            }
        }

        /*
        * 获取右侧树结构
        * */
        var node;
        var rTreeObj;
        var zNode;
        var rSetting = {
            check: {
                enable: true,
                chkStyle: "checkbox",
                chkboxType: { "Y": "s", "N": "s" }
            },
            view: {
                showIcon: false
            },
            data: {
                simpleData: {
                    enable: true,
                    idKey: "orgId",
                    pIdKey: "parentId"
                },
                key: {
                    name: "orgName"
                }
            }
        };
        commonService.getComponent().then(function(data){
            zNode = data.data;
            $.fn.zTree.init($(".uploadComSet .ztree"), rSetting, zNode);
            rTreeObj = $.fn.zTree.getZTreeObj("treeRight");
            rTreeObj.expandAll(true);
        });


        //权限设置
        $scope.ok = function () {
            var check;
            if($('.uploadCom .public>input').prop('checked') == true){
                check = 0;
            }else{
                check = 1;
            }
            var nodes = treeObj.getChangeCheckedNodes();
            var selectNodes = [];
            for(var i = 0;i < nodes.length;i++){
                var obj = {
                    identify: nodes[i].identify,
                    type: nodes[i].type,
                    status: nodes[i].status
                }
                selectNodes.push(obj);
            }
            var strJson=[];
            node = rTreeObj.getChangeCheckedNodes();
            for(var i=0;i<node.length;i++){
                strJson.push(node[i].orgId.toString());
            }
            strJson =  strJson.join(",");
            $('.uploadComSet').hide();
            $('.progressWrap').show();
            BzCloudComp.UpLoadDetail(check, JSON.stringify(selectNodes), strJson);
        };

        $scope.close = function(){
            var pro = $(".progressWrap #prog").width();
            if(pro != "100%"){
                $('.progressWrap .proModal').show();
            }else{
                $uibModalInstance.dismiss('cancel');
            }
        }

        $scope.btnCancel = function(){
            $('.progressWrap .proModal').hide();
        }

        $scope.btnOk = function(){
            $uibModalInstance.dismiss('cancel');
            BzCloudComp.CancelUpLoad();
        }

        //心跳
        commonService.heartBeat();
    }])