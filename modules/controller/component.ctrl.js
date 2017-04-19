'use strict';
/**
 * component
 */
angular.module('core').controller('componentCtrl', ['$scope', '$http','$uibModal','commonService','$timeout','$compile',
    function ($scope, $http,$uibModal,commonService,$timeout,$compile) {

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

        //大类、风格、品牌数据获取
        commonService.getTypeStyle().then(function(data){
            var list = data.data;
            $scope.typeList = list.compClassInfos;
            $scope.styleList = list.styles;
            $scope.brandsList = list.brands;
            console.log(list);
        })

        //清空input框的值
        $('.searchtext').click(function(){
            $(this).val('');
        })

        /*
        * 侧边栏构建来源
        * */
        $timeout(function() {
            $(".main-siderbar ul li:nth-child(2)>p b,.main-siderbar ul li:nth-child(3)>p b").hide();
        },0.2);

        /*
         * 左侧树结构
         * */
        var zNodes;
        var setting = {
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
            zNodes = data.data;
            $.fn.zTree.init($(".component-base .ztree"), setting, zNodes);
            //菜单选项
            var menusText;
            $('.main-siderbar ul:not(.line) .node_name').click(function(){
                if($(this).text() != '' && $(this).text() != undefined) {
                    menusText = $(this).text();//选中的当前项的内容
                }
                if($(".main-siderbar .ztree .button").hasClass('roots_open')){
                    $('.main-siderbar .ztree ul li .node_name').click(function() {
                        menusText = $(this).text();
                        $('.filter-status .filter-ele div').eq(0).html(menusText).attr("title",menusText)//把值改变到筛选条件的路径监听框
                        $('li').css({'background':'','color':'#333'});//初始化样式
                        $('.node_name').css({'background':'','color':'#333'});//初始化样式
                        $(this).parent().children().find('span').css({'background':'','color':'#333'});//隐藏父元素的选中样式
                        $(this).css({'color':'#4990e2'});//选中样式
                    })
                }

                $('.filter-status .filter-ele div').eq(0).html(menusText).attr("title",menusText)//把值改变到筛选条件的路径监听框
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
        * 点击构建来源移除除搜索外的条件
        * */
        $scope.source = function(){
            $('.ltype').prev().remove();
            $('.ltype').remove();
            $('.stype').prev().remove();
            $('.stype').remove();
            $('.selectType').prev().remove();
            $('.selectType').remove();
            console.log($('.addSearch').text());
            if($('.addSearch').text() == ''){
                $scope.isBlock = false;
            } else {
                $scope.isBlock = true;
            }
        }
        /*
        * 条件标签 样式
        * params obj event
        *
        * */
        function setFilterStyle(obj){
           obj.on('mouseenter',function(){
                $(this).children().not('.filter-closeStatus').css({'color':'#E5383C','border-color':'#E5383C'});
                $(this).children().find('.glyphicon-menu-down').css({'transform':'rotate(180deg)'});
                $(this).not('.filter-closeStatus').find('.filter-trigger').css({'height':'33px','border-bottom':'0','background':'#fff'});
                $(this).find('.switch-filter').show();
               $('.switchFilter').click(function(){
                   var text = $(this).text();
                   $(this).parent().siblings().children('span').text(text);
                   sType(text);
                   if($(this).parent().parent().hasClass('ltype')){
                       $('.stype').prev().remove();
                       $('.stype').remove();
                       $('.selectType').prev().remove();
                       $('.selectType').remove();
                       $scope.isSType = true;
                       $scope.isStyle = true
                   }else if($(this).parent().parent().hasClass('stype')){
                       $('.selectType').prev().remove();
                       $('.selectType').remove();
                       $scope.isStyle = true
                   }
               })
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
       $scope.search = function(searchText) {
           //setBlank(searchText);
           var html = '<b class="glyphicon glyphicon-menu-right"></b><div class="type-filter addSearch"><div class="filter-trigger filter-closeStatus"><span>' + searchText + '</span><b class="icon-close"></b></div>';
           var template=angular.element(html);
           var pagination=$compile(template)($scope);
           angular.element($('.filter-status .filter-ele').append(pagination));
           closeStatus();
           isShow();
       }
        /*
         * 筛选条件（无下拉功能）生成条件标签
         * params function
         * */
        function  setBlank(textFilter){
            var html = '<b class="glyphicon glyphicon-menu-right"></b><div class="type-filter selectType"><div class="filter-trigger filter-closeStatus"><span>' + textFilter + '</span><b class="icon-close"></b></div>';
            var template=angular.element(html);
            var pagination=$compile(template)($scope);
            angular.element($('.filter-status .filter-ele').append(pagination));
        }
        /*
        * 关闭筛选条件
        * */
        function closeStatus(status){
            $('.filter-closeStatus').click(function(){
                $(this).parent().prev().remove();
                $(this).parent().remove();
                isShow();
            })
            status = true;
        }

        //筛选品牌
        $scope.isBrandFilter = function(event){
            if(event.target.nodeName=='I' || event.target.nodeName=='I') {
                textFilter = $(event.target).text();
                $('.filter-status .filter-ele').append('<b class="glyphicon glyphicon-menu-right"></b><div class="type-filter selectType"><div class="filter-trigger filter-closeStatus"><span>' + textFilter + '</span><b class="icon-close"></b></div>');
                $scope.isBrand = false;
            }
            isShow();
            closeStatus($scope.isBrand);
        };

        //筛选风格
        $scope.isStyleFilter = function(event){
            if(event.target.nodeName=='I' || event.target.nodeName=='I') {
                textFilter = $(event.target).text();
                $('.filter-status .filter-ele').append('<b class="glyphicon glyphicon-menu-right"></b><div class="type-filter selectType"><div class="filter-trigger filter-closeStatus"><span>' + textFilter + '</span><b class="icon-close"></b></div>');
                $scope.isStyle = false;
            }
            isShow();
            closeStatus($scope.isStyle);
        };
        //筛选大类
        $scope.isTypeFilter = function(event){
            if(event.target.nodeName=='SPAN' || event.target.nodeName=='span'){
                textFilter = $(event.target).not('input[type="checkbox"]').text();
                var typeList = $scope.typeList;
                var html = '<b class="glyphicon glyphicon-menu-right"></b><div class="type-filter ltype"><div class="filter-trigger "><span>'+textFilter+'</span> <b class="glyphicon glyphicon-menu-down"></b> </div><div class="switch-filter" ><div class="switchFilter" style="cursor: pointer" ng-repeat="item in typeList">{{item.compClassName}}</div></div></div>'
                var template=angular.element(html);
                var pagination=$compile(template)($scope);
                angular.element($('.filter-status .filter-ele').append(pagination));
                //显示小类
                sType(textFilter);
                $scope.isType = false;
                $scope.isSType = true;
                setFilterStyle($('.component-base .filter-status .filter-ele .type-filter'));//筛选条件切换
            }
            isShow();
        };

        function sType(textFilter){
            commonService.getTypeStyle().then(function(data){
                var list = data.data.compClassInfos;
                angular.forEach(list, function(value, index){
                    if(value.compClassName == textFilter) {
                        $scope.sTypeList = value.subClassInfo;
                    }
                })
            });
        }
        //筛选小类
        $scope.isSTypeFilter = function(even){
            if(event.target.nodeName=='SPAN' || event.target.nodeName=='span') {
                textFilter = $(event.target).not('input[type="checkbox"]').text();
                var sTypeList = $scope.sTypeList;
                var html = '<b class="glyphicon glyphicon-menu-right"></b><div class="type-filter stype"><div class="filter-trigger "><span>'+textFilter+'</span> <b class="glyphicon glyphicon-menu-down"></b> </div><div class="switch-filter" ><div class="switchFilter" style="cursor: pointer" ng-repeat="item in sTypeList">{{item.subClassName}}</div></div></div>'
                var template=angular.element(html);
                var pagination=$compile(template)($scope);
                angular.element($('.filter-status .filter-ele').append(pagination));
                $scope.isSType = false;
                setFilterStyle($('.component-base .filter-status .filter-ele .type-filter'));//筛选条件切换
            }
            isShow();
        }

        //清空筛选显隐
        function isShow() {
            console.log($('.type-filter').length);
            if($('.type-filter').length == 0){
                $scope.isBlock = false;
            } else {
                $scope.isBlock = true;
            }
        }


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
        //$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        $timeout(function(){
            $('.component-info ul li .preview-small span').hover(function(){
                var previewSrc = $(this).find('img').attr('src');
                $(this).parent().siblings().find('img').attr('src',previewSrc);
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
                var arr = [];
                $('.filter-infoList .check-box').map(function(i,val){
                    //console.log($(val).find('input[type="checkbox"]').prop('checked'));
                    if($(val).find('input[type="checkbox"]').prop('checked')==true){
                        textFilter = ($(this).parent().children('i').text());
                        arr.push(textFilter);
                        i=1;
                        showBtn= i;
                    }
                });
                $('.btn-ok').off().click(function(){
                    for(var i = 0; i < arr.length; i++){
                        setBlank(arr[i]);
                    }
                    isShow();
                    closeStatus();
                })

                if(showBtn==0){
                    $(this).parent().parent().parent().siblings().find('.btn-ok').hide();
                }else{
                    $(this).parent().parent().parent().siblings().find('.btn-ok').show();
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
                $(this).siblings('.btn-ok').hide();
                $scope.isType = true;
                $scope.isStyle = true;
                $scope.isBrand = true;
            });
        },0.1)

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
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
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
        //应用、下载、更新按钮转换
        // strCompGUID 构件的GUID
        // strCompMd5 构件的MD5值
        // strCompID 构件的企业ID
        function getStatus(strCompGUID, strCompMd5, strCompID){
            var status;
            $scope.status = status;
            BzCloudComp.GetCompType(strCompGUID, strCompMd5, strCompID);
        }
        // strCompGUID 构件的GUID
        // strCompID 构件的企业ID
        var value = 0;
        var time = 100;
        $scope.down = function(){
            //BzCloudComp.DownloadComp(strCompGUID, strCompID);
            $('.progressWrap').show();
            prograss();
        }
        //进度条函数
        function prograss(){
            function reset( ) {
                value = 0
                $("#prog").removeClass("progress-bar-success").css("width","0%").text("等待启动");
                //setTimeout(increment,5000);
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
        var prom = JSON.stringify({
            epId: "-2",
            orgId:282,
            compClassName: "户型",
            subClassName: "套装门",
            styleName: "欧式",
            brandName: "西贝",
            componentDisplayName: "沙发",
            currentPage: 1,
            pageSize: "20"
        })
        console.log(prom);
        commonService.about(prom).then(function(data){
            console.info(data)
        })

    }]);