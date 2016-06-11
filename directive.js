(function() {
    "use strict";
    angular.module('fileManager')
        .directive('customFocus', function() {
            return {
                restrict: 'A',
                link: function($scope, $element, attrs) {
                     $element[0].focus();
                }
            }
        });
})();