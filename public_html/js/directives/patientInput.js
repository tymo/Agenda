angular.module("agenda").directive('patientInput', function ($compile) {
    return {
        scope: {
            eventBus: "="},
        link: link,
        template:
                '<form name="patientForm">\
                <input class="form-control" type="text" ng-model="patient.nome" name="nome" placeholder="Nome" ng-required="true" ng-minlength="5"/>\
                <input class="form-control" type="text" ng-model="patient.data" name="data" placeholder="Data de nascimento: DD/MM/YYYY" ui-date/>\
                <input class="form-control" type="text" ng-model="patient.telefone" name="telefone" placeholder="Telefone" ng-pattern="/^\d{4,5}-\d{4}$/"/>\
                <input class="form-control" type="text" ng-model="patient.rua" name="rua" placeholder="Rua" />\
                <input class="form-control" type="text" ng-model="patient.numero" name="numero" placeholder="Número" />\
                <input class="form-control" type="text" ng-model="patient.cidade" name="cidade" placeholder="Cidade" />\n\
                <input class="form-control" type="text" ng-model="patient.bairro" name="bairro" placeholder="Bairro" />\
                <button class="addButton" name="sendButton" ng-click="addPatient(event)">Adicionar</button>\
                </form>'
    };
    function link(scope, element) {
        scope.addPatient = function (patient) {
            if (patient) {
                scope.eventBus.fireEvent("insertPatient", angular.copy(patient));
                delete scope.patient;
            }
        }
    }
    ;
});
