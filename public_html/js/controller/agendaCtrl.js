angular.module("agenda", []);
angular.module("agenda").controller("agendaCtrl", function ($scope) {
    $scope.app = "Agenda";
    $scope.listeners = {};
    const listeners = [];

    $scope.eventBus = {
        addListener: function (eventName, func) {
            // add listener on the list of listeners
            let listener = {
                name: eventName,
                callback: func,
            }
            listeners.push(listener);
        },
        fireEvent: function (eventName, param) {
            eventMatches = listeners.filter(function (listener) {
                return listener.name === eventName;
            });
            eventMatches.forEach(function (evt) {
                evt.callback.call(this, param);
            });
        }
    }
});