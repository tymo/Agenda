angular.module("agenda").directive('patientInput', function ($compile) {
    return {
        scope: {
            eventBus: "="},
        link: link,
        template:
                '<form name="patientForm">\
                <input type="text" name="name" ng-model="patient.name" placeholder="Nome" class="textInput"/>\
                <button class="addButton" name="sendButton" ng-click="addPatient(patient)">Adicionar</button>\
        </form>\
        <div ng-show="dayNotSelected" class="alert alert-danger">\
          Por favor, primeiro selecione um dia do mês.!\
        </div>\
        <div ng-show="nameIsBlank" class="alert alert-danger">\
          Por favor, preencha o campo nome!\
        </div>'
    };
    function link(scope, element) {
        scope.element = element;
        scope.addPatient = function (patient) {
            if (patient) {
                scope.nameIsBlank = !patient.name;
                if (patient.name) {
                    scope.eventBus.fireEvent("insertPatient", angular.copy(patient));
                }
                delete scope.patient;
            }
        };
    }
});
