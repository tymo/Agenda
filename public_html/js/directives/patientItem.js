angular.module("agenda").directive('patientItem', function () {
    return {
        scope: {eventBus: "=", patient: "="},
        link: link,
        template:
       '<td>{{patient.name}}</td>\
       <td>{{patient.birthdate| date:\'dd/MM/yyyy\'}}</td>\
        <td>{{patient.phonenumber}}</td>\
        <td>{{patient.address.city}}</td>\
        <td>{{patient.address.neighborhood}}</td>\
        <td>{{patient.address.street}}</td>\
        <td>{{patient.address.number}}</td>\
        <td><button class="removeButton" ng-click="removePatient(patient)">X</button></td>'
    };

    function link(scope, element) {        
        scope.element = element;
                
        scope.removePatient = function (patient) {
            scope.eventBus.fireEvent("deletePatient", patient);
        };
    }
});
