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
        $scope.cancelSet = function(){
            $('.uploadComSet').hide();
        }

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
        var zNodes = BzCloudComp.GetUpLoadDetail();
        alert(zNodes);
        $(document).ready(function(){
            $.fn.zTree.init($(".uploadCom .ztree"), setting, zNodes);
            treeObj = $.fn.zTree.getZTreeObj("treeLeft");
        });
        $scope.upload = function(){
            var check;
            if($('.uploadCom .public>input').attr("checked")){
                check = 0;
            }else{
                check = 1;
            }
            nodes = treeObj.getChangeCheckedNodes();
            for(var i = 0;i < nodes.length;i++){
                delete nodes[i].name;
                //判断上传构件中是否存在新增构件
                if(nodes[i].status == 1){
                    //如果是，弹出权限设置,选择后上传
                    $('uploadComSet').show();
                } else {
                    //如果否，直接上传
                    BzCloudComp.UpLoadDetail(check,nodes);
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
        })


        //权限设置
        $scope.ok = function () {
            var check;
            if($('.uploadCom .public>input').attr("checked")){
                check = 0;
            }else{
                check = 1;
            }
            nodes = treeObj.getChangeCheckedNodes();
            for(var i = 0;i < nodes.length;i++) {
                delete nodes[i].name;
            }
            var strJson=[];
            node = rTreeObj.getChangeCheckedNodes();
            for(var i=0;i<node.length;i++){
                strJson.push(node[i].orgId.toString());
            }
            strJson =  strJson.join(",");
            BzCloudComp.UpLoadDetail(check,nodes, strJson);
        };

        function uploadProgress (currentNum,total){
            //显示滚动条
            if(currentNum == 1){
                $('.progressWrap').show();
                prograss();
            }
            //动态改变当前个数
            if(total === currentNum){
                //隐藏滚动条
                $('.progressWrap').hide();
            }
        }

        //进度条函数
        var time = 100;
        function prograss(){
            function reset() {
                var value = 0;
                $("#prog").removeClass("progress-bar-success").css("width","0%").text("等待启动");
            }
            function increment(){
                value += 1;
                $("#prog").css("width",value + "%").text(value + "%");
                if(value == 100){
                    $('.progressWrap').hide();
                    reset();
                    return;
                }
                setTimeout(increment,time);
            }
            increment();
        }
    }])