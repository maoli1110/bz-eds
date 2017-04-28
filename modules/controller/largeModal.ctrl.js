angular.module('core').controller('largeModalCtrl', ['$scope', '$http', '$uibModalInstance','items','$timeout','commonService','$stateParams',
    function ($scope, $http, $uibModalInstance,items,$timeout,commonService,$stateParams) {
        /*
         * 构件库数据展示
         * */
        console.log(items);
        commonService.uploadDetails(items).then(function(data){
            console.log(data.data);
        })

        $scope.otherList = JSON.parse(BzCloudComp.GetCompDetail(items)).detail;

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.$on('ngComponeted', function (ngRepeatFinishedEvent) {
            $('.component-modal .modal-left li .preview-small span').hover(function () {
                var previewSrc = $(this).find('img').attr('src');
                console.log(previewSrc);
                $(this).parent().siblings().find('img').attr('src', previewSrc)
            })
        })

        $scope.delete = function(items){
            commonService.deleteCom(items).then(function(data){
                alert(data);
            })
        }
        //心跳
        commonService.heartBeat();
    }])