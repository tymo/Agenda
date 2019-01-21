angular.module("agenda").directive('dayCell', function ($compile) {
    return {
        scope: {eventBus: "=", dayOfMonth: "=", dateOfDay: "="},
        link: link,
        template: '{{dayOfMonth}}'
    };

    var lastSelectedDay = null;
    function link(scope, element) {
        const DAYOFMONTH = 0;
        const DATEOFDAY = 1;
        const EVENT = 2;
        const EVENTCOUNT = 1;
        scope.element = element;
        scope.selectDay = function (dayOfMonth) {
            if (scope.dayOfMonth === dayOfMonth) {
                if (lastSelectedDay) {
                    scope.unselectDay(lastSelectedDay);
                }
                $($(scope.element)).removeClass("cellNoEvent");
                $($(scope.element)).addClass("cellSelected");
                lastSelectedDay = dayOfMonth;
            }
        }
        scope.unselectDay = function (dayOfMonth) {
            if (scope.dayOfMonth === dayOfMonth) {
                $($(scope.element)).removeClass("cellSelected");
                $($(scope.element)).addClass("cellNoEvent");
            }
        }
        scope.highLightDay = function (params) {
            if (scope.dayOfMonth === params[DAYOFMONTH]) {
                $($(scope.element)).removeClass('cellSelected');
                $($(scope.element)).addClass('cellHasEvent');
                scope.eventBus.fireEvent("highLightCell", scope.dayOfMonth);
                if (params[EVENTCOUNT]) {
                    eventCount = params[EVENTCOUNT];
                }
            }
        }
        scope.hideDay = function (dayOfMonth) {
            if (scope.dayOfMonth === dayOfMonth) {
                $($(scope.element)).removeClass('cellHasEvent');
                $($(scope.element)).addClass('cellNoEvent');
                scope.eventBus.fireEvent("hideCell", scope.dayOfMonth);
            }
        }
        scope.setDateToDay = function (params) {
            if (scope.dayOfMonth === params[DAYOFMONTH]) {
                scope.dateOfDay = angular.copy(params[DATEOFDAY]);
            }
        }
        scope.removeListener = function () {
            scope.eventBus.removeListener("addEvent", scope.addEvent);
            scope.eventBus.removeListener("removeEvent", scope.removeEvent);
            scope.eventBus.removeListener("selectDay", scope.selectDay);
            scope.eventBus.removeListener("unselectDay", scope.unselectDay);
            scope.eventBus.removeListener("setDateToDay", scope.setDateToDay);
            scope.eventBus.removeListener("removeListener", scope.removeListener);
            scope.eventBus.removeListener("highLightDay", scope.highLightDay);
        }
        scope.addEvent = function (params) {
            if (scope.dayOfMonth === params[DAYOFMONTH] && params[EVENT]) {
                params[EVENT].dateOfDay = angular.copy(params[DATEOFDAY]);
                params[EVENT].dayOfMonth = angular.copy(params[DAYOFMONTH]);
                scope.eventBus.fireEvent("insertEvent", angular.copy(params[EVENT]));
                eventCount++;
                if (eventCount === 1) {
                    scope.highLightDay([angular.copy(params[DAYOFMONTH])]);
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
        scope.eventBus.addListener("selectDay", scope.selectDay);
        scope.eventBus.addListener("unselectDay", scope.unselectDay);
        scope.eventBus.addListener("setDateToDay", scope.setDateToDay);
        scope.eventBus.addListener("removeListener", scope.removeListener);
        scope.eventBus.addListener("highLightDay", scope.highLightDay);
        $compile(element.contents())(scope);
    }
});
