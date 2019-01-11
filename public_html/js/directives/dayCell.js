angular.module("agenda").directive('dayCell', function ($compile) {
    return {
        scope: {eventBus: "=", dayOfMonth: "="},
        link: link,
        template: ''
    };

    function link(scope, element) {
        scope.element = element;
        scope.highLightDay = function (dayOfMonth) {
            if (scope.dayOfMonth === dayOfMonth) {
                $($(scope.element)).toggleClass('cellHasEvent');
                scope.eventBus.fireEvent("highLightCell", scope.dayOfMonth);
            }
        }
        scope.hideDay = function (dayOfMonth) {
            if (scope.dayOfMonth === dayOfMonth) {
                $($(scope.element)).toggleClass('cellNoEvent');
                scope.eventBus.fireEvent("hideCell", scope.dayOfMonth);
            }
        }
        scope.getHighLightCLass = function () {
            return 'cellHasEvent';
        };
        if (scope.dayOfMonth !== "") {
            angular.element(element).append(scope.dayOfMonth);
        }
        scope.addEvent = function (params) {
            if (scope.dayOfMonth === params[0] && params[1]) {
                params[1].dayOfMonth = params[0];
                scope.eventBus.fireEvent("insertEvent", angular.copy(params[1]));
                eventCount++;
                if (eventCount === 1) {
                    scope.highLightDay(angular.copy(scope.dayOfMonth));                    
                }
                delete params;
            }
        }
        scope.removeEvent = function (event) {
            if (event && scope.dayOfMonth === event.dayOfMonth) {
                scope.eventBus.fireEvent("deleteEvent", event);
                eventCount--;
                if (eventCount === 0) {
                    scope.hideDay(angular.copy(scope.dayOfMonth));
                }
                delete event;
            }
        }
        var eventCount = 0;
        scope.eventBus.addListener("addEvent", scope.addEvent);
        scope.eventBus.addListener("removeEvent", scope.removeEvent);
        $compile(element.contents())(scope);
    }
});
