'use strict';
/**
 * component
 */
angular.module('core').controller('componentCtrl', ['$scope', '$http','$uibModal',
    function ($scope, $http,$uibModal) {
            /*
             * 左侧菜单
             * param:一个带有数据的数组
             * return 一个字符串拼接的变量
             * */
            var  siderbarArr = [];//菜单项
            var  filterCount = 1;
            $scope.menusArr = [];
            //function manageMenus(arr){
            //    var li = '';
            //    for(var key in arr){
            //        console.info(arr[key])
            //        if(arr[key].child){
            //            var eleDom = '';
            //            for(var i = 0;i<arr[key].child.length;i++){
            //                eleDom += '<p>'+arr[key].child[i]+'</p>'
            //            }
            //            li += '<li>'+arr[key].menus+'<div class="menus-childs">'+eleDom+'</div></li>';
            //        }else{
            //            li += '<li>'+arr[key].menus+'</li>'
            //        }
            //    }
            //    return li;
            //}
            /*
             *菜单事件动画
             * */
            function  menusEvent(obj,event){
                //menusCliCount =1;
                obj.on(event,function(){
                    var menusCliCount =1;
                    menusCliCount++;
                    $(this).addClass('active').siblings().removeClass('active');
                    if($(this).has('.menus-childs')){
                        $(this).find('.menus-childs').slideDown().parent().siblings().find('.menus-childs').slideUp();
                    }
                })
            }
            function getAjax(url){
                $.ajax({
                    type:'Get',
                    data:'',
                    url:url,
                    success:function(data){
                        //processData(data);
                        $('.component-info ul').append(processData(data));
                        /*
                         *商品放大镜效果
                         * */
                        $('.component-info ul li .preview-small span').hover(function(){
                            var previewSrc = $(this).find('img').attr('src');
                            $(this).parent().siblings().find('img').attr('src',previewSrc)
                        })
                    },
                    error:function(error){

                    }
                })
            }
            function processData(data){
                var li = '';
                var span = '';
                for(var i = 0;i<data.length;i++){
                    span+='<span><img src="'+data[i].previewSrc+'" alt=""></span>'
                }
                for(var key in data){
                    li+='<li>'
                        +'<div class="preview-model">'
                        +'<div class="preview-big"><img src="'+data[0].previewSrc+'"><b></b></div>'
                        +'<div class="preview-small">'
                        +span
                        +'</div>'
                        +'<p class="preview-descText">'+data[0].previewText+'</p>'
                        +'</div>'
                        +'<div class="preview-tool">'
                        +'<a >更多详情</a>'
                        +'<a >应用</a>'
                        +'</div>'
                        + '</li>'
                }
                return li;
            }
        //监听是否 菜单选项repeat 完成
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            //菜单点击事件
            menusEvent($('.main-siderbar ul>li'),'click')
        })
            //声明菜单内容
            siderbarArr = [
                {menus:'全部'},
                {menus:'版筑构件库'},
                {menus:'A企业库',child:['甲分公司库','乙分公司库','丙分公司库']},
                {menus:'B企业库',child:['甲分公司库','乙分公司库','丙分公司库']},
            ];
             $scope.menusArr = siderbarArr;
            /*ajax
             * ajax请求列表数据
             * */
            getAjax('json/data.json')
            //插入菜单
            //$('.main-siderbar ul').append(manageMenus(siderbarArr));

            /*
             *筛选状态
             * */
            $('.filter-condition .filter-ele>span').click(function(){
                $('.filter-status .filter-ele').append('<b class="glyphicon glyphicon-menu-right"></b><span>'+$(this).text()+'</span>');
                $(this).parent().parent().parent().hide()
            })
            /*
             * .filter-down更多选项
             * */
            $('.filter-down').bind('click',function(){
                filterCount++;
                if(filterCount%2==0){
                    $(this).addClass('activeShow');

                }else{
                    $(this).removeClass('activeShow')
                }
                if($(this).hasClass('activeShow')){
                    $('.filter-brand').show()
                }else{

                    $('.filter-brand').hide()
                }
            })
        /*
        * 初始化模态框
        * 初始化参数配置
        * */
        $scope.componetModal = function () {
            var modalInstance = $uibModal.open({
                windowClass: 'component-modal',
                backdrop: 'static',
                animation: false,
                size: 'lg',
                templateUrl: 'template/core/modal.html',
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
                $log.info('Modal dismissed at: ' + new Date());
            });

        }
}]);