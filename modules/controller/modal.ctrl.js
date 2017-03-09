/**
 * Created by sdergt on 2017/3/9.
 */
angular.module('core').controller('modalCtrl', ['$scope', '$http', '$uibModalInstance','items','$timeout',
    function ($scope, $http, $uibModalInstance,items,$timeout) {
    //var $ctrl = this;
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
}])