/**
 * Created by sdergt on 2017/3/9.
 */
angular.module('core').controller('modalCtrl', ['$scope', '$http', '$uibModalInstance','items','$timeout','commonService',
    function ($scope, $http, $uibModalInstance,items,$timeout,commonService) {
    //var $ctrl = this;
    /*
     * 构件库数据展示
     * */
    commonService.componentList().then(function(data){
        $scope.componentList = data.data;
        $scope.componentDescr = $scope.componentList[0];
        console.info($scope.componentList[0])
        console.info($scope.componentList)
    })

    $scope.items = items;
    $scope.selected = {
        item: $scope.items
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
        $('.progressWrap').show();
        prograss();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.$on('ngComponeted', function (ngRepeatFinishedEvent) {
        $('.component-modal .modal-left li .preview-small span').hover(function () {
            var previewSrc = $(this).find('img').attr('src');
            $(this).parent().siblings().find('img').attr('src', previewSrc)
        })

    })

    $scope.delete = function(){
        $('#myModal').modal('hide');
        /*commonService.deleteCom(componentId).then(function(data){

        })*/
    }

    //进度条函数
    var value = 0;
    var time = 100;
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
}])