'use strict';
/**
 * component
 */
angular.module('core').controller('componentCtrl', ['$scope', '$http','$uibModal','commonService',
    function ($scope, $http,$uibModal,commonService) {
            /*
             * 左侧菜单
             * param:一个带有数据的数组
             * return 一个字符串拼接的变量
             * */
            var  siderbarArr = [];//菜单项
            var  filterCount = 1;//筛选开关
            var  dumpVal;//分页器跳转框的值
            var showBtn = 0;//控制筛选条件控制按钮是否显示
            $scope.menusArr = [];//菜单数组
            $scope.componentList = [];//组件展示数组
        function  menusEvent(obj,event){
            $('.menus-childs').unbind('click').click(function(){
                return false;
            });
            obj.off(event).on(event,function(){
                 $(this).toggleClass('active');
                 $(this).siblings().removeClass('active');
                 $(this).siblings().find('.menus-childs').stop().slideUp();
                 $(".menusName").css({'background':'','color':'#333'});
                 $(this).siblings().find('.strioke').hide();
                 $(this).find(".menusName").css({'background':'#666','color':'#fff'});
                 $(this).find('.strioke').show();

                 if($(this).hasClass('active')){
                     $(this).find('.menus-childs').stop().slideDown();
                 }else{
                     $(this).find('.menus-childs').stop().slideUp();
                 }
                     //$(this).find('.menus-childs').slideDown().parent().siblings().find('.menus-childs').slideUp();
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
        /*
        * typeFilter 样式
        * params obj event
        *
        * */
        function setFilterStyle(obj){
           obj.on('mouseenter',function(){
                $(this).children().css({'color':'blue','border-color':'blue'});
                $(this).children().find('.glyphicon-menu-up').css({'transform':'rotate(180deg)'});
                $(this).find('.filter-trigger').css({'height':'33px','border-bottom':'0'});
                $(this).find('.switch-filter').show();
            })
           obj.on('mouseleave',function(){
                $(this).children().css({'color':'','border-color':''});
                $(this).children().find('.glyphicon-menu-up').css({'transform':''});
                $(this).find('.filter-trigger').css({'height':'30px','border-bottom':'1px solid #000'});
                $(this).find('.switch-filter').hide();
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
            });
            //菜单选项
            $('.main-siderbar ul li p').click(function(){
                $('.strioke').hide();//隐藏父元素的线条样式
                $(this).parent().children().find('p').css({'background':'','color':'#333'});//隐藏父元素的选中样式
                $('p').css({'background':'','color':'#333'});//初始化样式
                $(this).css({'background':'#666','color':'#fff'});//选中样式
                $(this).siblings().find('.strioke2').hide();//统计子元素清除样式  保留当前样式
                $(this).find('.strioke2').show();//选中样式线条
                var menusText = $(this).text();//选中的当前项的内容
                $('.filter-status .filter-ele div').eq(0).html(menusText)//把值改变到筛选条件的路径监听框
            })
        });
            //声明菜单内容
            siderbarArr = [
                {menus:'全部'},
                {menus:'版筑构件库'},
                {menus:'A企业库',child:['甲分公司库','乙分公司库','丙分公司库']},
                {menus:'B企业库',child:['甲分公司库','乙分公司库','丙分公司库']},
            ];
             $scope.menusArr = siderbarArr;
            /*
             *筛选状态
             * */
            $scope.typeFilter  = ['单人沙发','多人沙发','沙发','沙发沙发'];

        //setFilterStyle($('.filter-condition .filter-ele>span'),'click')
            $('.filter-condition .filter-ele>span').click(function(){
                $('.filter-status .filter-ele').append('<b class="glyphicon glyphicon-menu-right"></b><div class="type-filter"><div class="filter-trigger">'+$(this).text()+' <b class="glyphicon glyphicon-menu-up"></b> </div><div class="switch-filter" ><div>沙发</div><div>沙发</div><div>沙发</div><div>沙发</div></div></div>');
                $(this).parent().parent().parent().hide();
                setFilterStyle( $('.component-base .filter-status .filter-ele .type-filter'),'mouseenter');
                setFilterStyle( $('.component-base .filter-status .filter-ele .type-filter'),'mouseleave');
            });
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
            //筛选条件点击更多显示全部
            $('.filter-infoList ').css({'height':'50px','overflow':'hidden'});
            $('.filter-tool .filter-more').click(function(){
               $(this).parent().parent().parent().css({'height':'auto','overflow':''})
            })
            //筛选条件多选
            $('.filter-infoList .filter-tool').map(function(i,val){
               $(this).find('.checkMore').click(function(){
                  $(this).parent().parent().find('.check-box').show();
                  $(this).parent().parent().parent().css({'height':'auto','overflow':''});
                  $(this).parent().parent().find('.btns-item').css({'display':'block'});
               });
            });
            //是否选中筛选多选框 选中的话可以提交
            $('.filter-infoList .check-box>input').click(function(event){
                    showBtn=0;
                    var i=0;
                    $('.filter-infoList .check-box').map(function(i,val){
                        console.info($(val))
                        //console.log();
                        //console.info($(this).parent().find('input[type="checkbox"]').prop('checked'))
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
            //  取消选择的时候条件清空
            $('.filter-infoList .btn-cancel').click(function(){
                $(this).parent().siblings().find('.check-box').hide();
                $(this).parent().css({'display':'none'});
                $(this).parent().siblings().find('input[type="checkbox"]').prop('checked','');
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