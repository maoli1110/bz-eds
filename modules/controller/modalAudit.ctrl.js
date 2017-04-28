/**
 * Created by Administrator on 2017/4/23.
 */
/**
 * Created by sdergt on 2017/3/9.
 */
angular.module('core').controller('modalAuditCtrl', ['$scope', '$http', '$uibModalInstance','items','$timeout','commonService','$stateParams',
    function ($scope, $http, $uibModalInstance,items,$timeout,commonService,$stateParams) {
        /*
         * 审核意见修改
         * */
        $scope.opinion = items.opinion;
        $scope.ok = function () {
            var opinion = $(".modal-audit textarea").val();
            commonService.idea(
                {
                    "componentId":items.componentId,
                    "opinion":opinion
                }).then(function(data){
                console.log(data);
            })
            $uibModalInstance.close(opinion);
        };
        $scope.selected = {
            item: $scope.items
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


        //心跳
        commonService.heartBeat();
    }])