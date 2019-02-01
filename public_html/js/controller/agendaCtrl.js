angular.module("agenda", []);
angular.module("agenda").controller("agendaCtrl", function ($scope) {
    $scope.app = "Agenda";

    $scope.listeners = {};
    var listeners = [];
    $scope.eventBus = {
        addListener: function (eventName, func) {
            // add listener on the list of listeners
            let listener = {
                name: eventName,
                callback: func,
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
        {type: 'TXT', name: 'name', model: 'patient.name', placeholder: 'Nome'}
//        {type: 'BTP'}
    ];
});