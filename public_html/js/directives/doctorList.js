angular.module("agenda").directive('doctorList', function () {
    return {
        scope: {eventBus: "="},
        link: link,
        template:
                '<div ng-show="hasDoctor()">\
                <table class="tableRoot">\
                <tr class="listHeader"><th class="listHeader" colspan="2">Doctors</th></tr>\
                <tr class="listHeader">\
                <th class="listHeader">Nome</th>\
                <th class="listHeader">Excluir</th></tr>\
                <tr class="tr-doctor-item" doctor-Item event-bus="eventBus" doctor="doctor" \
                ng-repeat="doctor in store.get(\'doctorList\')"></tr></table>'
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
        scope.insertDoctor = function (doctor) {
            if (!scope.store.get('doctorList').includes(doctor)) {
                scope.store.get('doctorList').push(angular.copy(doctor));
            }
            delete doctor;
        }
        scope.deleteDoctor = function (doctor) {
            if (scope.store.get('doctorList').includes(doctor)) {
                delete scope.store.get('doctorList').splice(scope.store.get('doctorList').indexOf(doctor), 1)
                ;
            }
            delete doctor;
        }
        scope.hasDoctor = function () {
            return (scope.store.get('doctorList').length > 0);
        };

        scope.store.set("doctorList", []);
        scope.eventBus.fireEvent("setDoctorList", scope.store.get('doctorList'));
        scope.eventBus.addListener("insertDoctor", scope.insertDoctor);
        scope.eventBus.addListener("deleteDoctor", scope.deleteDoctor);        
    };
}

);
