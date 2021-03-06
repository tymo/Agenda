angular.module("agenda").directive('todoItem', function () {
    return {
        scope: {eventBus: "=", event: "="},
        link: link,
        template:
       '<td>{{event.patient.name}}</td>\
        <td>{{event.doctor.name}}</td>\
        <td>{{event.hour| date:\'HH:mm\'}}</td>\
        <td><button class="removeButton" ng-click="removeEvent(event)">X</button></td>'
    };

    function link(scope, element) {
        scope.element = element;

        scope.removeEvent = function (event) {
            scope.eventBus.fireEvent("removeEvent", event);
        };
    }
});
