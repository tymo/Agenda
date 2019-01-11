angular.module("agenda").directive('todoList', function () {
    //'<div ng-show="store.get(\'agendaEvents\').length > 0">\
    //'<div ng-show="{{dayHasEvents(dayOfMonth)}}">\
    return {
        scope: {eventBus: "=", dayOfMonth: "@"},
        link: link,
        template:
                //'<div ng-show="store.get(\'agendaEvents\').length > 0">\
                '<div ng-show="dayHasEvents(dayOfMonth)">\
                <table class="table">\
                <tr><th  ng-class="\'selecionada\'"`>{{Title}}</th>\
                <th ng-class="\'selecionada\'" colspan="6"></th></tr>\
                <tr><th>Descrição</th><th>Hora</th><th>Excluir</th></tr>\
                 <tr class="tr-todo-item" todo-Item event-bus="eventBus" event="event" store="store" \
                 ng-repeat="event in store.get(\'agendaEvents\') | filter: { dayOfMonth: dayOfMonth}"></tr></table>'
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
//            if (!scope.store.get('agendaEvents').includes(event)) {
            scope.store.get('agendaEvents').push(angular.copy(event));
            delete event;
//            }
        }
        scope.deleteEvent = function (event) {
            if (scope.store.get('agendaEvents').includes(event)) {
                delete scope.store.get('agendaEvents').splice(scope.store.get('agendaEvents').indexOf(event), 1)
                ;
                delete event;
            }
        }
        scope.setDayOfMonth = function (newDay) {
            scope.dayOfMonth = angular.copy(newDay);
            scope.Title = "Eventos do dia " + newDay;
            delete newDay;
        }
        scope.dayHasEvents = function (dayOfMonth) {
            if (dayOfMonth) {
                return ((scope.store.get('agendaEvents').filter(function (event) {
                    return event.dayOfMonth === dayOfMonth;
                })).length > 0);
            }
            return false
        };
        scope.store.set("agendaEvents", []);
        scope.eventBus.addListener("insertEvent", scope.insertEvent);
        scope.eventBus.addListener("deleteEvent", scope.deleteEvent);
        scope.eventBus.addListener("setDayOfMonth", scope.setDayOfMonth);
    }
    ;
}

);
