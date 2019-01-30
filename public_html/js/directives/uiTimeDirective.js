angular.module("agenda").directive("uiTime", function ($filter) {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            var _formatTime = function (time) {
                if (time) {
                    time = time.replace(/[^0-9]+/g, "");
                    if (time.length > 2) {
                        time = time.substring(0, 2) + ":" + time.substring(2);
                    }
                    if (time.length > 5) {
                        time = time.substring(0, 5);
                    }
                    return time;
                }
            };

            element.bind("keyup", function () {
                ctrl.$setViewValue(_formatTime(ctrl.$viewValue));
                ctrl.$render();
            });

            ctrl.$formatters.push(function (value) {
                return $filter("date")(value, "HH:mm");
            });
        }
    };
});