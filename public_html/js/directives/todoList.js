angular.module("agenda").directive('todoList', function () {
    return {
        scope: {eventBus: "=", dayOfMonth: "@"},
        link: link,
        template:
                '<div ng-show="dayHasEvents(dateOfDay)">\
                <table class="tableRoot">\
                <tr class="listHeader"><th class="listHeader" colspan="7">{{Title}}</th></tr>\
                <tr class="listHeader"><th class="listHeader">Paciente</th><th class="listHeader">Medico</th><th class="listHeader">Hora</th><th class="listHeader">Excluir</th></tr>\
                <tr class="tr-todo-item" todo-Item event-bus="eventBus" event="event"\
                 ng-repeat="event in store.get(\'agendaEvents\') | filter: { dateOfDay: dateOfDay}"></tr></table>'
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
        scope.insertEvent = function (event) {
            if (!scope.store.get('agendaEvents').includes(event)) {
                scope.store.get('agendaEvents').push(angular.copy(event));
            }
            delete event;
        }
        scope.deleteEvent = function (event) {
            if (scope.store.get('agendaEvents').includes(event)) {
                delete scope.store.get('agendaEvents').splice(scope.store.get('agendaEvents').indexOf(event), 1)
                ;
            }
            delete event;
        }
        scope.setDayOfMonth = function (newDay) {
            scope.dayOfMonth = angular.copy(newDay);
            scope.Title = "Eventos do dia " + newDay;
            delete newDay;
        }
        scope.setDateOfDay = function (selDate) {
            scope.dateOfDay = angular.copy(selDate.format("DDMMYYYY"));
        }
        scope.dayHasEvents = function (dateOfDay) {
            if (dateOfDay) {
                return ((scope.store.get('agendaEvents').filter(function (event) {
                    return event.dateOfDay === dateOfDay;
                })).length > 0);
            }
            return false
        };
        scope.dayEventCount = function (dateOfDay) {
            if (dateOfDay) {
                return (scope.store.get('agendaEvents').filter(function (event) {
                    return event.dateOfDay === dateOfDay;
                })).length;
            }
        };
        scope.getEventList = function () {
            if (scope.store.get('agendaEvents').length > 0) {
                scope.eventBus.fireEvent("checkForEvents", scope.store.get('agendaEvents'));
            }
        };
        scope.highLightDaysWithEvents = function (datesOfMonth) {
            datesOfMonth.forEach(function (currDate) {
                if (scope.dayHasEvents(currDate.dateOfDay)) {
                    scope.eventBus.fireEvent("highLightDay", [currDate.dayOfMonth, scope.dayEventCount(currDate.dateOfDay)]);
                }
            })
        };
        scope.store.set("agendaEvents", []);
        scope.eventBus.addListener("insertEvent", scope.insertEvent);
        scope.eventBus.addListener("deleteEvent", scope.deleteEvent);
        scope.eventBus.addListener("setDayOfMonth", scope.setDayOfMonth);
        scope.eventBus.addListener("setDateOfDay", scope.setDateOfDay);
        scope.eventBus.addListener("getEventList", scope.getEventList);
        scope.eventBus.addListener("highLightDaysWithEvents", scope.highLightDaysWithEvents);
    }
    ;
}

);
