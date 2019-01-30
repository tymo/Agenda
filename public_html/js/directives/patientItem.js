angular.module("agenda").directive('patientItem', function () {
    return {
        scope: {eventBus: "=", patient: "="},
        link: link,
        template:
       '<td>{{patient.name}}</td>\
       <td>{{patient.data| date:\'dd/MM/yyyy\'}}</td>\
        <td>{{patient.telefone}}</td>\
        <td>{{patient.endereco.cidade}}</td>\
        <td>{{patient.endereco.bairro}}</td>\
        <td>{{patient.endereco.rua}}</td>\
        <td>{{patient.endereco.numero}}</td>\
        <td><button class="removeButton" ng-click="removePatient(patient)">X</button></td>'
    };

    function link(scope, element) {        
        scope.element = element;
                
        scope.removePatient = function (patient) {
            scope.eventBus.fireEvent("deletePatient", patient);
        };
    }
});
