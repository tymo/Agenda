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
        {type: 'TXD', name: 'birthdate', model: 'patient.birthdate', placeholder: 'Data nascimento'},
        {type: 'TXT', name: 'phonenumber', model: 'patient.phonenumber', placeholder: 'Telefone'},
        {type: 'TXT', name: 'city', model: 'patient.address.city', placeholder: 'Cidade'},
        {type: 'TXT', name: 'neighborhood', model: 'patient.address.neighborhood', placeholder: 'Bairro'},                
        {type: 'TXT', name: 'street', model: 'patient.address.street', placeholder: 'Rua'},                
        {type: 'TXT', name: 'number', model: 'patient.address.number', placeholder: 'Número'},                        
        {type: 'BTN', listener: 'insertPatient', dataObject: 'patient'}
//        {type: 'BTP'}
    ];

    $scope.doctorInputFields = [
        {type: 'TXT', name: 'name', model: 'doctor.name', placeholder: 'Nome'},
        {type: 'BTN', listener: 'insertDoctor', dataObject: 'doctor'}
//        {type: 'BTD'}
    ];

});