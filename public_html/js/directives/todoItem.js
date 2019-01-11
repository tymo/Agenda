angular.module("agenda").directive('todoItem', function () {
    return {
        scope: {eventBus: "=", event: "=", store: "="},
        link: link,
        template:
       '<td>{{event.description}}</td>\
        <td>{{event.hour| date:\'HH:mm\'}}</td>\
        <td><button class="removeButton" ng-click="removeEvent(event)">X</button></td>'
    };

    function link(scope, element) {
        scope.getColorByDate = function (eventData) {
            if (!eventData) {
                return 'selecionada';
            }
            var t = (eventData - new Date()) / 1000 / 60 / 60 / 24;
            if (t <= 2) {
                return 'urgent';
            }
            if (t > 2 && t <= 5) {
                return 'warn';
            }
            if (t > 5) {
                return 'fine';
            }
        };
        scope.element = element;
        scope.store.subscribe("set-data-prv-color", function (eventDataPrv) {
            var idx = ($(scope.element).find('#td-data-prv').length - 1);
            $($(scope.element).find('#td-data-prv')[idx]).toggleClass(scope.getColorByDate(eventDataPrv));
        });
        if (!scope.event.selecionada) {
            scope.store.set("set-data-prv-color", scope.event.hour);
        }
        
        scope.removeEvent = function (event) {
            scope.eventBus.fireEvent("removeEvent", event);
        };
    }
});
