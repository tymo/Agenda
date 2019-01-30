angular.module("agenda").directive('patientList', function () {
    return {
        scope: {eventBus: "="},
        link: link,
        template:
                '<div ng-show="hasPatients()">\
                <table class="tableRoot">\
                <tr class="agendaHeader"><th class="agendaHeader" colspan="6">Pacientes</th></tr>\
                <tr class="agendaHeader">\
                <th class="agendaHeader">Nome</th>\
                <th class="agendaHeader">Nascimento</th>\
                <th class="agendaHeader">Telofone</th>\
                <th class="agendaHeader">Cidade</th>\
                <th class="agendaHeader">Bairro</th>\
                <th class="agendaHeader">Rua</th>\
                <th class="agendaHeader">Número</th>\
                <th class="agendaHeader">Excluir</th></tr>\
                <tr class="tr-patient-item" patient-Item event-bus="eventBus" patient="patient" \
                ng-repeat="patient in store.get(\'patientList\')"></tr></table>'
    };
    function link(scope, element) {
        class Store {
            constructor() {
                this.data = {};
                this.listeners = {};
            }
            set(property, value) {
                this.data[property] = value;
                if (this.listeners[property]) {
                    this.listeners[property](value);
                }
            }

            get(property) {
                if (this.data[property]) {
                    return this.data[property];
                }
            }

            subscribe(property, func) {
                this.listeners[property] = func;
            }
        }

        scope.element = element;
        scope.store = new Store();
        scope.insertPatient = function (patient) {
            if (!scope.store.get('patientList').includes(patient)) {
                scope.store.get('patientList').push(angular.copy(patient));
                scope.eventBus.fireEvent("setPatientList", scope.store.get('patientList'));
            }
            delete patient;
        }
        scope.deletePatient = function (patient) {
            if (scope.store.get('patientList').includes(patient)) {
                delete scope.store.get('patientList').splice(scope.store.get('patientList').indexOf(patient), 1)
                ;
                if (scope.store.get('patientList').length > 0) {
                    scope.eventBus.fireEvent("setPatientList", scope.store.get('patientList'));
                }
            }
            delete patient;
        }
        scope.hasPatients = function () {
            return (scope.store.get('patientList').length > 0);
        };
        
        scope.store.set("patientList", []);
        scope.eventBus.addListener("insertPatient", scope.insertPatient);
        scope.eventBus.addListener("deletePatient", scope.deletePatient);
        scope.eventBus.addListener("getPatientList", scope.getPatientList);
    }
    ;
}

);
