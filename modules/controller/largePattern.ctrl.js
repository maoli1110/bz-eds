'use strict';
/**
 * component
 */
angular.module('core').controller('largePatternCtrl', ['$scope', '$http','$uibModal','commonService',
    function ($scope, $http,$uibModal,commonService) {
        /*
         * 左侧菜单
         * param:一个带有数据的数组
         * return 一个字符串拼接的变量
         * */
        var  siderbarArr = [];//菜单项
        var  filterCount = 1;//筛选开关
        var  dumpVal;//分页器跳转框的值
        $scope.menusArr = [];//菜单数组
        $scope.componentList = [];//组件展示数组
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
        /*
         * 分页器
         * */

        //function getInitPagination(){
        $scope.totalItems = 64;
        $scope.currentPage = 1;
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
            //console.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
        //}
        /*分页器跳转
         * params  value
         * return currentPage
         * */
        function getDumpVal(){
            dumpVal =  $('.dump-inp input').val();
            return dumpVal;

        }
        function setFilterStyle(obj,event){
            obj.on(event,function(){
                $(this).parent().siblings().css({'height':'auto','overflow':''})
            })
        }
        /*分页器跳转
         * params  value
         * return currentPage
         * */
        $scope.setPage(getDumpVal());
        $scope.getDumpOk = function(){
            $scope.setPage(getDumpVal());
        };


        //getInitPagination();
        //监听是否 菜单选项repeat 完成
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            //菜单点击事件
            menusEvent($('.main-siderbar ul>li'),'click');
            $('.component-info ul li .preview-small span').hover(function(){
                var previewSrc = $(this).find('img').attr('src');
                $(this).parent().siblings().find('img').attr('src',previewSrc)
            })
        });

        /*
         *筛选状态
         * */
        //setFilterStyle($('.filter-condition .filter-ele>span'),'click')
        $('.filter-condition .filter-ele>span').click(function(){
            $('.filter-status .filter-ele').append('<b class="glyphicon glyphicon-menu-right"></b><span>'+$(this).text()+'<span></span></span></span>');
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
        });
        $('.filter-infoList ').css({'height':'50px','overflow':'hidden'});
        $('.filter-tool .filter-more').click(function(){
            $(this).parent().parent().parent().css({'height':'auto','overflow':''})
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
                //console.info('Modal dismissed at: ' + new Date());
            });
        };

        /*
         * 返回顶部
         * */
        $('.return-top').click(function() {
            $('.component-list').animate({ scrollTop: 0 }, 500);
        })
        /*
         * 构件库数据展示
         * */
        commonService.componentList().then(function(data){
            $scope.componentList = data.data;
            //console.info( $scope.componentList)
        })



    }]);