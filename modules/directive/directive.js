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
angular.module('core').directive('sideStyle',function($timeout){
    return{
        restrict: 'AE',
        link: function(scope, element, attr) {
            $(".menusName").each(function(ele){
                    $(this).click(function(ele){
                        $(this).find('span').show();
                        $(this).addClass("side-active").siblings().removeClass("side-active");//选中样式
                        $(this).siblings().find('.strioke').hide();//统计子元素清除样式  保留当前样式
                    });
            })     
        }
    }
});