'use strict';
/**
 * component
 */
angular.module('core').controller('componentCtrl', ['$scope', '$http','$uibModal','commonService','$timeout',
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
        $scope.menusArr = [];//菜单数组
        $scope.componentList = [];//组件展示数组
        $scope.isType = true;
        $scope.isStyle = true;
        $scope.isBrand = true;
        $scope.isSType = false;
        $scope.isBlock = false;

        //大类、小类数据获取
        commonService.typeList().then(function(data){
            var typeList = data.data;
            $scope.typeList = typeList;
        });

        //风格、品牌数据
        $scope.styleList = ["中式","欧式","地中海","罗马式","中式","欧式","地中海","罗马式","中式","欧式","地中海","罗马式"];
        $scope.brandsList = ["卡地亚","夏奈尔","唐纳·卡兰","范思哲","迪奥","古驰","路易·威登","乔治·阿玛尼","PRADA","GUESS","蒂芬尼","ENZO","宝诗龙","Swarovski","Georgjensen"];

        /*
        * 侧边栏构建来源
        * */
        $timeout(function() {
            $(".main-siderbar ul li:nth-child(2)>p b,.main-siderbar ul li:nth-child(3)>p b").hide();
        },0.2);

        /*function  menusEvent(obj,event){
            /!*$('.menus-childs').unbind('click').click(function(){
                return false;
            });*!/
            obj.off(event).on(event,function(){
                 $(".menusName").css({'background':'','color':'#333'});
                 $(this).toggleClass('active');
                 $(this).siblings().removeClass('active');
                 $(this).siblings().find('.menus-childs').stop().slideUp();
                 $(this).find(".menusName").css({'color':'#4990e2'});
                 if($(this).hasClass('active')){
                     $(this).find('.menus-childs').stop().slideDown();
                     $(this).find('.glyphicon-menu-down').css({'transform':'rotate(180deg)'});
                 }else{
                     $(this).find('.menus-childs').stop().slideUp();
                     $(this).find('.glyphicon-menu-down').css({'transform':'rotate(360deg)'});
                 }
             })
        }*/

        /*
         * 左侧树结构
         * */
        var setting = {
            view: {
                showIcon: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            }
        };

        var zNodes =[
            { id:1, pId:0, name:"父节点 1", open:false},
            { id:11, pId:1, name:"叶子节点 1-1"},
            { id:12, pId:1, name:"叶子节点 1-2"},
            { id:13, pId:1, name:"叶子节点 1-3"},
            { id:2, pId:0, name:"父节点 2", open:false},
            { id:21, pId:2, name:"叶子节点 2-1"},
            { id:22, pId:2, name:"叶子节点 2-2"},
            { id:23, pId:2, name:"叶子节点 2-3"},
            { id:3, pId:0, name:"父节点 3", open:false},
            { id:31, pId:3, name:"叶子节点 3-1"},
            { id:32, pId:3, name:"叶子节点 3-2"},
            { id:33, pId:3, name:"叶子节点 3-3"}
        ];
        $(document).ready(function(){
            $.fn.zTree.init($(".component-base .ztree"), setting, zNodes);
            //菜单选项
            /*$('.main-siderbar ul li .node_name').click(function(){
                if($(this).text() != '' && $(this).text() != undefined) {
                    var menusText = $(this).text();//选中的当前项的内容
                }*/
            var menusText;
            $('.main-siderbar ul li .node_name').click(function(){
                if($(this).text() != '' && $(this).text() != undefined) {
                    menusText = $(this).text();//选中的当前项的内容
                }
                if($(".main-siderbar .ztree .button").hasClass('roots_open')){
                    $('.main-siderbar .ztree ul li .node_name').click(function() {
                        menusText = $(this).text();
                        $('.filter-status .filter-ele div').eq(0).html(menusText)//把值改变到筛选条件的路径监听框
                        $('li').css({'background':'','color':'#333'});//初始化样式
                        $('.node_name').css({'background':'','color':'#333'});//初始化样式
                        $(this).parent().children().find('span').css({'background':'','color':'#333'});//隐藏父元素的选中样式
                        $(this).css({'color':'#4990e2'});//选中样式
                    })
                }

                $('.filter-status .filter-ele div').eq(0).html(menusText)//把值改变到筛选条件的路径监听框
                $('li').css({'background':'','color':'#333'});//初始化样式
                $('li span').css({'background':'','color':'#333'});//初始化样式
                $(this).parent().children().find('span').css({'background':'','color':'#333'});//隐藏父元素的选中样式
                $(this).css({'color':'#4990e2'});//选中样式
            });
        });
        /*
         * 分页器
         * */
        //所有页面中的项目总数
        $scope.totalItems = 64;
        $scope.currentPage = 1;
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
            //console.log('Page changed to: ' + $scope.currentPage);
        };
        //分页大小限制号码。
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
                $(this).children().find('.glyphicon-menu-down').css({'transform':'rotate(180deg)'});
                $(this).not('.filter-closeStatus').find('.filter-trigger').css({'height':'33px','border-bottom':'0','background':'#fff'});
                $(this).find('.switch-filter').show();
            });
           obj.on('mouseleave',function(){
                $(this).children().css({'color':'','border-color':''});
                $(this).children().find('.glyphicon-menu-down').css({'transform':''});
                $(this).find('.filter-trigger').css({'height':'30px','border-bottom':'1px solid #c9c9c9','background':''});
                $(this).find('.switch-filter').hide();
            })
        }

        /*
        * 搜索关键字生成条件标签
        * */
        //var oldText;
       $scope.search = function(searchText) {
           $('.type-filter').remove();
           $('.filter-status .filter-ele>b').remove();
           setBlank(searchText);
           closeStatus();
           isShow();
       }

        /*
        * 筛选条件（有下拉功能）生成条件标签
        * params function
        * */
        function setFilterBlank(textFilter, list){
            $('.filter-status .filter-ele').append('<b class="glyphicon glyphicon-menu-right"></b><div class="type-filter"><div class="filter-trigger "><span>'+textFilter+'</span> <b class="glyphicon glyphicon-menu-down"></b> </div><div class="switch-filter" ><div ng-repeat="item in list">{{item}}</div>');
        }
        /*
         * 筛选条件（无下拉功能）生成条件标签
         * params function
         * */
        function  setBlank(textFilter){
            $('.filter-status .filter-ele').append('<b class="glyphicon glyphicon-menu-right"></b><div class="type-filter"><div class="filter-trigger filter-closeStatus"><span>' + textFilter + '</span><b class="icon-close"></b></div>');
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


        //筛选品牌
        $scope.isBrandFilter = function(event){
            if(event.target.nodeName=='SPAN' || event.target.nodeName=='span') {
                textFilter = $(event.target).text();
                $('.filter-status .filter-ele').append('<b class="glyphicon glyphicon-menu-right"></b><div class="type-filter"><div class="filter-trigger filter-closeStatus"><span>' + textFilter + '</span><b class="icon-close"></b></div>');
                $scope.isBrand = false;
            }
            closeStatus();
            isShow();
        };
        //筛选风格
        $scope.isStyleFilter = function(event){
            if(event.target.nodeName=='SPAN' || event.target.nodeName=='span') {
                textFilter = $(event.target).text();
                setBlank(textFilter);
                $scope.isStyle = false;
            }
            closeStatus();
            isShow();
        };
        //筛选大类
        $scope.isTypeFilter = function(event){
            if(event.target.nodeName=='SPAN' || event.target.nodeName=='span'){
                textFilter = $(event.target).not('input[type="checkbox"]').text();
                console.log($scope.typeList);
                var typeList = $scope.typeList;
                /*var temp = '<b class="glyphicon glyphicon-menu-right"></b>' +
                    '<div class="type-filter">' +
                         '<div class="filter-trigger ">' +
                             '<span>'+textFilter+'</span> ' +
                            '<b class="glyphicon glyphicon-menu-down"></b> ' +
                        '</div>' +
                        '<div class="switch-filter" >' +
                             '<div ng-repeat="item in typeList">{{item.type}}</div>' +
                        '</div>' +
                    '</div>';
                angular.element($('.filter-status .filter-ele')).append(temp);*/
                $('.filter-status .filter-ele').append('<b class="glyphicon glyphicon-menu-right"></b><div class="type-filter"><div class="filter-trigger "><span>'+textFilter+'</span> <b class="glyphicon glyphicon-menu-down"></b> </div><div class="switch-filter" ><div ng-repeat="item in typeList">{{item.type}}</div>');
                setFilterStyle($('.component-base .filter-status .filter-ele .type-filter'));//筛选条件切换
                //$('.component-base .filter-status .filter-ele .type-filter').on("mouseenter", function())
                $scope.isType = false;
                //显示小类
                commonService.typeList().then(function(data){
                    var typeList = data.data;
                    angular.forEach(typeList, function(value, index){
                        if(value.type == textFilter) {
                            $scope.sTypeList = value.list;
                            //console.log($scope.sTypeList);
                        }
                    })
                });
                $scope.isSType = true;
            }
            isShow();
        };
        //筛选小类
        $scope.isSTypeFilter = function(even){
            if(event.target.nodeName=='SPAN' || event.target.nodeName=='span') {
                textFilter = $(event.target).not('input[type="checkbox"]').text();
                console.log($scope.sTypeList);
                var sTypeList = $scope.sTypeList;
                $('.filter-status .filter-ele').append('<b class="glyphicon glyphicon-menu-right"></b><div class="type-filter"><div class="filter-trigger "><span>'+textFilter+'</span> <b class="glyphicon glyphicon-menu-down"></b> </div><div class="switch-filter" ><div ng-repeat="item in sTypeList">{{item.name}}</div>');
                setFilterStyle($('.component-base .filter-status .filter-ele .type-filter'));//筛选条件切换
                $scope.isSType = false;
            }
            isShow();
        }

        /*
        * 监听筛选条件是否为空
        * */
        /*$scope.$watch('num',function(newValue,oldValue){
            console.log(newValue,oldValue);
            if(newValue > 0) {
                $scope.isBlock = true;
            } else {
                $scope.isBlock = false;
            }
        });*/
        function isShow() {
            //console.log($('type-filter').length);
            if($('type-filter').text() != ''){
                $scope.isBlock = true;
            } else {
                $scope.isBlock = false;
            }
        }
        isShow();

        //清空筛选
        $scope.cancelFilter = function(){
            if($('.filter-trigger').length){
                $scope.isBrand = true;
                $scope.isStyle = true;
                $scope.isType = true;
            }
            $('.type-filter').remove();
            $('.filter-status .filter-ele>b').remove();
            $scope.isBlock = false;
            $scope.isSType = false;
        };

        //多选
        //监听是否 菜单选项repeat 完成
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            $('.component-info ul li .preview-small span').hover(function(){
                var previewSrc = $(this).find('img').attr('src');
                $(this).parent().siblings().find('img').attr('src',previewSrc);
            });
            //菜单点击事件
            //menusEvent($('.main-siderbar ul>li'),'click');


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
                console.log(this);
                $(this).parent().siblings().find('.check-box').hide();
                $(this).parent().css({'display':'none'});
                $(this).parent().siblings().find('input[type="checkbox"]').prop('checked','');
                $scope.isType = true;
                $scope.isStyle = true;
                $scope.isBrand = true;
            });
        });
        //声明菜单内容
        siderbarArr = [
            {menus:'全部'},
            {menus:'班筑构件库'},
            {menus:'A企业库',child:['甲分公司库','乙分公司库','丙分公司库']},
            {menus:'B企业库',child:['甲分公司库','乙分公司库','丙分公司库']},
        ];
        $scope.menusArr = siderbarArr;
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
        };

        /*
        * 上传构件
        * */
        $scope.uploadCom = function() {
            var modalInstance = $uibModal.open({
                windowClass: 'uploadCom-modal',
                backdrop: 'static',
                animation: false,
                size: 'lg',
                templateUrl: 'template/component/uploadCom.html',
                controller: 'uploadComCtrl',
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
        }
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