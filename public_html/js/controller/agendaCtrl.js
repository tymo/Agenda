angular.module("agenda", []);
angular.module("agenda").controller("agendaCtrl", function ($scope) {
    $scope.app = "Agenda";

    $scope.listeners = {};
    var listeners = [];
    $scope.eventBus = {
        addListener: function (eventName, method) {
            // add listener on the list of listeners
            let listener = {
                name: eventName,
                callback: method,
            }
            if (!listeners.includes(listener)) {
                listeners.push(listener);
            }
        },
        removeListener(eventName, func) {
            eventMatches = listeners.filter(function (listener) {
                return listener.callback === func;
            });
            eventMatches.forEach(function (evt) {
                delete listeners.splice(listeners.indexOf(evt), 1)
                ;
            });
        },
        fireEvent: function (eventName, param) {
            eventMatches = listeners.filter(function (listener) {
                return listener.name === eventName;
            });
            eventMatches.forEach(function (evt) {
                evt.callback.call(this, param);
            });
        },
    }

    $scope.patientInputFields = [
        {type: 'TXT', name: 'name', model: 'patient.name', placeholder: 'Nome'},
        {type: 'TXT', name: 'telefone', model: 'patient.telefone', placeholder: 'Telefone'},
        {type: 'TXT', name: 'cidade', model: 'patient.cidade', placeholder: 'Cidade'},
        {type: 'TXT', name: 'bairro', model: 'patient.bairro', placeholder: 'Bairro'},
        {type: 'TXT', name: 'rua', model: 'patient.rua', placeholder: 'Rua'},
        {type: 'TXT', name: 'numero', model: 'patient.numero', placeholder: 'Numero'},
//        {type: 'BTN', listener: 'insert-patient', objectname:'patient'}
        {type: 'BTP'}
    ];

    $scope.doctorInputFields = [
        {type: 'TXT', name: 'name', model: 'doctor.name', placeholder: 'Nome'},
//        {type: 'BTN', listener: 'insertDoctor', objectname:'doctor'}
        {type: 'BTD'}
    ];

});