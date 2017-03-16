'use strict';
/**
 * component
 */
angular.module('core').controller('largePatternCtrl', ['$scope', '$http','$uibModal','commonService','$timeout',
    function ($scope, $http,$uibModal,commonService,$timeout) {
        /*
         * 左侧菜单
         * param:一个带有数据的数组
         * return 一个字符串拼接的变量
         * */
        var  siderbarArr = [];//菜单项
        var  filterCount = 1;//筛选开关
        var  dumpVal;//分页器跳转框的值
        var showBtn = 0;//控制筛选条件控制按钮是否显示
        var textFilter = '';//筛选条件生成筛选标签的内容
        //$scope.menusArr = [];//菜单数组
        $scope.componentList = [];//组件展示数组
        $scope.isType = true;
        $scope.isStyle = true;
        $scope.isBrand = true;
        //function  menusEvent(obj,event){
        //    //menusCliCount =1;
        //    obj.on(event,function(){
        //        var menusCliCount =1;
        //        menusCliCount++;
        //        $(this).addClass('active').siblings().removeClass('active');
        //        if($(this).has('.menus-childs')){
        //            $(this).find('.menus-childs').slideDown().parent().siblings().find('.menus-childs').slideUp();
        //        }
        //    })
        //}
        /*
         * 分页器
         * */
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
        /*分页器跳转
         * params  value
         * return currentPage
         * */
        function getDumpVal(){
            dumpVal =  $('.dump-inp input').val();
            return dumpVal;

        }
        /*分页器跳转
         * params  value
         * return currentPage
         * */
        $scope.setPage(getDumpVal());
        $scope.getDumpOk = function(){
            $scope.setPage(getDumpVal());
        };

        /*
         * typeFilter 样式
         * params obj event
         *
         * */
        function setFilterStyle(obj){
            obj.on('mouseenter',function(){
                $(this).children().not('.filter-closeStatus').css({'color':'#E5383C','border-color':'#E5383C'});
                $(this).children().find('.glyphicon-menu-up').css({'transform':'rotate(180deg)'});
                $(this).not('.filter-closeStatus').find('.filter-trigger').css({'height':'33px','border-bottom':'0','background':'#fff'});
                $(this).find('.switch-filter').show();
            });
            obj.on('mouseleave',function(){
                $(this).children().css({'color':'','border-color':''});
                $(this).children().find('.glyphicon-menu-up').css({'transform':''});
                $(this).find('.filter-trigger').css({'height':'30px','border-bottom':'1px solid #c9c9c9','background':''});
                $(this).find('.switch-filter').hide();
            })
        }

        /*
         * 筛选条件生成条件标签
         * params function
         * */
        function setFilterBlank(textFilter){
            $('.filter-status .filter-ele').append('<b class="glyphicon glyphicon-menu-right"></b><div class="type-filter"><div class="filter-trigger ">'+textFilter+' <b class="glyphicon glyphicon-menu-up"></b> </div><div class="switch-filter" ><div>沙发</div><div>沙发</div><div>沙发</div><div>沙发</div></div></div>');
        }
        /*
         * 关闭筛选条件
         * */
        function closeStatus(){
            $('.filter-closeStatus').click(function(){
                $(this).parent().prev().remove();
                $(this).parent().remove();
                $scope.isBrand = true;
            })
        }
        /*
         * 清空筛选条件
         * */
        //筛选品牌
        $scope.isBrandFilter = function(event){
            if(event.target.nodeName=='SPAN' || event.target.nodeName=='span') {
                textFilter = $(event.target).text();
                $('.filter-status .filter-ele').append('<b class="glyphicon glyphicon-menu-right"></b><div class="type-filter"><div class="filter-trigger filter-closeStatus">' + textFilter + '<b class="icon-close"></b></div>');
                $scope.isBrand = false;
            }
            closeStatus();
        };
        //筛选风格
        $scope.isStyleFilter = function(event){
            if(event.target.nodeName=='SPAN' || event.target.nodeName=='span') {
                textFilter = $(event.target).text();
                setFilterBlank(textFilter);
                setFilterStyle($('.component-base .filter-status .filter-ele .type-filter'));//筛选条件切换
                $scope.isStyle = false;
            }
        };
        //筛选类型
        $scope.isTypeFilter = function(event){
            if(event.target.nodeName=='SPAN' || event.target.nodeName=='span'){
                textFilter = $(event.target).not('input[type="checkbox"]').text();
                setFilterBlank(textFilter);
                setFilterStyle($('.component-base .filter-status .filter-ele .type-filter'));//筛选条件切换
                $scope.isType = false;
            }

        };
        //取消筛选
        $scope.cancelFilter = function(){
            if($('.filter-trigger').length){
                $scope.isBrand = true;
                $scope.isStyle = true;
                $scope.isType = true;
            }
            $('.type-filter').remove();
            $('.filter-status .filter-ele>b').remove();
        };
        //多选
        //监听是否 菜单选项repeat 完成
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            //菜单点击事件
            menusEvent($('.main-siderbar ul>li'),'click');
            $('.component-info ul li .preview-small span').hover(function(){
                var previewSrc = $(this).find('img').attr('src');
                $(this).parent().siblings().find('img').attr('src',previewSrc)
            });
            //菜单选项
            $('.main-siderbar ul li p').click(function(){
                var menusText = $(this).text();//选中的当前项的内容
                $('.filter-status .filter-ele div').eq(0).html(menusText)//把值改变到筛选条件的路径监听框
                $('p').css({'background':'','color':'#333'});//初始化样式
                $('.glyphicon-menu-up').css({'transform':'rotate(0deg)'});
                $(this).parent().children().find('p').css({'background':'','color':'#333'});//隐藏父元素的选中样式
                $(this).css({'color':'#4990e2'});//选中样式
                $(this).find('.glyphicon-menu-up').css({'transform':'rotate(180deg)'})

            });
            $('.filter-infoList ').css({'height':'50px','overflow':'hidden'});
            $('.filter-infoList .filter-tool').map(function(i,val){
                $('.checkMore').click(function(){
                    $(this).parent().parent().find('.check-box').show();
                    $(this).parent().parent().parent().css({'height':'auto','overflow':''});
                    $(this).parent().parent().find('.btns-item').css({'display':'block'});
                })
            });
            //是否选中筛选多选框 选中的话可以提交
            $('.filter-infoList .check-box input').click(function(event){
                showBtn=0;
                var i=0;
                $('.filter-infoList .check-box').map(function(i,val){
                    if($(val).find('input[type="checkbox"]').prop('checked')==true){
                        i=1;
                        showBtn= i;
                    }
                });
                if(showBtn==0){
                    $(this).parent().parent().siblings().find('.btn-ok').hide();
                }else{
                    $(this).parent().parent().siblings().find('.btn-ok').show();
                }
            });
            //筛选条件点击更多显示全部
            $('.filter-tool ').map(function(){
                $(this).find('.filter-more').unbind('click').click(function(){
                    $(this).toggleClass('showMore');
                    if($(this).hasClass('showMore')){
                        $(this).parent().parent().parent().css({'height':'auto','overflow':''});
                        $(this).find('.glyphicon-menu-up').css({'transform':'rotate(0deg)'});
                    }else{
                        $(this).parent().parent().parent().css({'height':'50px','overflow':'hidden'});
                        $(this).find('.glyphicon-menu-up').css({'transform':'rotate(180deg)'});
                    }
                });
            });
            //  取消选择的时候条件清空
            $('.filter-infoList .btn-cancel').click(function(){
                $(this).parent().siblings().find('.check-box').hide();
                $(this).parent().css({'display':'none'});
                $(this).parent().siblings().find('input[type="checkbox"]').prop('checked','');
                $scope.isType = true;
                $scope.isStyle = true;
                $scope.isBrand = true;
            });
        });
        /*
         *筛选状态
         * */
        $scope.typeFilter  = ['单人沙发','多人沙发','沙发','沙发沙发'];
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
            /*
            * 详情框内容样式更改
            * */
            $timeout(function () {
                var template = '<div class="modal-modify"> <p>---------------<span class="modify-text">审核意见</span>------------------</p></div>'+
                    '<div class="text" style="border: 1px solid black;width: 90%;height: 30%;">暂无</div>'
                 $('.pro-info').after(template);
                 $('.modal-footer').css({
                     'display': 'none'
                 });
                $( '.modal-modify').css({
                    'margin-top': '25px',
                    'margin-bottom': '25px'
                });
                $('.pro-info div >p').css({
                    'margin-bottom': '9px'
                });
            }, 0.01);

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
            //console.info( $scope.componentList);
        })



    }]);