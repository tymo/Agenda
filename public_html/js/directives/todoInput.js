angular.module("agenda").directive('todoInput', function ($compile) {
    return {
        scope: {eventBus: "="},
        link: link,
        template:
                '<form name="eventForm" >\
        <select class="form-control" ng-model="event.patient" ng-options="patient.name for patient in patientList">\
            <option value="">Selecione um paciente</option>\
        </select>\
        <select class="form-control" ng-model="event.doctor" ng-options="doctor.name for doctor in doctorList">\
            <option value="">Selecione um medico</option>\
        </select>\
        <input class="form-control" type="text" name="hour" ng-model="event.hour" placeHolder="Hora" ui-time >\
        <button class="addButton" name="sendButton" ng-click="addEvent(event)">Adicionar</button>\
        </form>\
        <div ng-show="dayNotSelected" class="alert alert-danger">\
          Por favor, primeiro selecione um dia do mês!\
        </div>\
        </div>'
    };
    function link(scope, element) {
        scope.element = element;
        scope.setDayOfMonth = function (dayOfMonth) {
            scope.dayOfMonth = angular.copy(dayOfMonth);
            scope.dayNotSelected = !scope.dayOfMonth;
            delete dayOfMonth;
        }
        scope.setDateOfDay = function (selDate) {
            scope.dateOfDay = angular.copy(selDate.format("DDMMYYYY"));
        }
        scope.setPatientList = function (patientList) {
            if (!scope.patientList) {
                scope.patientList = patientList;
            }
        }
        scope.setDoctorList = function (doctorList) {
            if (!scope.doctorList) {
                scope.doctorList = doctorList;
            }
        }
        scope.addEvent = function (event) {
            scope.dayNotSelected = !scope.dayOfMonth;
            if (event && !scope.dayNotSelected) {
                scope.patientIsBlank = !event.patient.name;
                scope.hourIsBlank = !event.hour;
                if (!scope.hourIsBlank && !scope.patientIsBlank) {
                    scope.eventBus.fireEvent("addEvent", [scope.dayOfMonth, scope.dateOfDay, angular.copy(event)]);
                    delete scope.event;
                }
            }
        }

        scope.patientList = null;
        scope.eventBus.addListener("setDayOfMonth", scope.setDayOfMonth);
        scope.eventBus.addListener("setDateOfDay", scope.setDateOfDay);
        scope.eventBus.addListener("setPatientList", scope.setPatientList);
        scope.eventBus.addListener("setDoctorList", scope.setDoctorList);
    };
});