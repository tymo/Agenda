angular.module("agenda").directive('doctorInput', function ($compile) {
    return {
        scope: {
            eventBus: "="},
        link: link,
        template:
                '<form name="doctorForm">\
                <input class="form-control" type="text" ng-model="doctor.name" name="name" placeholder="Nome" />\
                <button class="addButton" name="sendButton" ng-click="addDoctor(doctor)">Adicionar</button>\
        </form>'
    };
    function link(scope, element) {
        scope.element = element;
        scope.addDoctor = function (doctor) {
            if (doctor) {
                scope.nameIsBlank = !doctor.name;
                if (!scope.nameIsBlank) {
                    scope.eventBus.fireEvent("insertDoctor", angular.copy(doctor));
                }                
            } else {
                scope.nameIsBlank = true;
            }
            delete scope.doctor;
        };
    }
});
