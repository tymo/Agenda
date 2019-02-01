angular.module("agenda").directive('patientInput', function ($compile) {
    return {
        scope: {
            eventBus: "="},
        link: link,
        template:
                '<form name="patientForm">\
                <input class="form-control" type="text" ng-model="patient.name" name="name" placeholder="Nome"/>\
                <input class="form-control" type="text" ng-model="patient.data" name="data" placeholder="Data de nascimento" ui-date/>\
                <input class="form-control" type="text" ng-model="patient.telefone" name="telefone" placeholder="Telefone"/>\
                <input class="form-control" type="text" ng-model="patient.endereco.cidade" name="cidade" placeholder="Cidade" />\
                <input class="form-control" type="text" ng-model="patient.endereco.bairro" name="bairro" placeholder="Baurro" />\
                <input class="form-control" type="text" ng-model="patient.endereco.rua" name="rua" placeholder="Rua" />\
                <input class="form-control" type="text" ng-model="patient.endereco.numero" name="numero" placeholder="Número"/>\
                <button class="addButton" name="sendButton" ng-click="addPatient(patient)">Adicionar</button>\
        </form>'
    };
    function link(scope, element) {
        scope.element = element;
        scope.addPatient = function (patient) {
            if (patient) {
                scope.nameIsBlank = !patient.name;
                if (!scope.nameIsBlank) {
                    scope.eventBus.fireEvent("insert_patient", angular.copy(patient));
                }                
            } else {
                scope.nameIsBlank = true;
            }
            delete scope.patient;
        };
    }
});
