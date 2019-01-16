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
        scope.element = element;
        scope.highLightDay = function (dayOfMonth) {
            if (scope.dayOfMonth === dayOfMonth) {
                $($(scope.element)).removeClass('cellSelected');
                $($(scope.element)).addClass('cellHasEvent');
                scope.eventBus.fireEvent("highLightCell", scope.dayOfMonth);
            }
        }
        scope.hideDay = function (dayOfMonth) {
            if (scope.dayOfMonth === dayOfMonth) {
                $($(scope.element)).removeClass('cellHasEvent');
                $($(scope.element)).addClass('cellNoEvent');
                scope.eventBus.fireEvent("hideCell", scope.dayOfMonth);
            }
        }
        scope.selectDay = function (dayOfMonth) {
            if (scope.dayOfMonth === dayOfMonth) {
                if (lastSelectedDay) {
                    scope.eventBus.fireEvent("unselectDay", lastSelectedDay);
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
        scope.addEvent = function (params) {
            if (scope.dayOfMonth === params[DAYOFMONTH] && params[EVENT]) {
                params[EVENT].dateOfDay = params[DATEOFDAY];
                params[EVENT].dayOfMonth = params[DAYOFMONTH];
                scope.eventBus.fireEvent("insertEvent", angular.copy(params[EVENT]));
                eventCount++;
                if (eventCount === 1) {
                    scope.highLightDay(angular.copy(params[DAYOFMONTH]));
                }
                delete params;
            }
        }
        scope.removeEvent = function (event) {
            if (event && scope.dateOfDay === event.dateOfDay) {
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
        $compile(element.contents())(scope);
    }
});
