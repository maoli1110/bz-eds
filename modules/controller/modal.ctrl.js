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

    $scope.delect = function(){
        
    }

}])