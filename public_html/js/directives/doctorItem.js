angular.module("agenda").directive('doctorItem', function () {
    return {
        scope: {eventBus: "=", doctor: "="},
        link: link,
        template:
       '<td>{{doctor.name}}</td>\
        <td><button class="removeButton" ng-click="removeDoctor(doctor)">X</button></td>'
    };

    function link(scope, element) {        
        scope.element = element;              
        scope.removeDoctor = function (doctor) {
            scope.eventBus.fireEvent("deleteDoctor", doctor);
        };
    }
});
