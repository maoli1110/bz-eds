/**
 * Created by sdergt on 2017/3/9.
 */
angular.module('core').directive('profit',function($timeout){
        return{
            restrict: 'AE',
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function() {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
});
angular.module('core').directive('componentFinish',function($timeout){
    return{
        restrict: 'AE',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngComponeted');
                });
            }
        }
    }
});