angular.module("agenda").directive('itemInput', function ($compile) {
    return {
        scope: {
            eventBus: "="},
        link: link,
        template:
                '<form name="eventForm">\
        <button class="addButton" name="sendButton" ng-click="addEvent(event)">Adicionar</button>\
        </form>\
        <div ng-show="dayNotSelected" class="alert alert-danger">\
          Por favor, primeiro selecione um dia do mês.!\
        </div>\
        <div ng-show="descriptionIsBlank" class="alert alert-danger">\
          Por favor, preencha o campo descrição!\
        </div>\
        <div ng-show="hourIsBlank" class="alert alert-danger">\
          Por favor, preencha o campo hora!\
        </div>'
    };
    //var dayOfMonth = null;
    function link(scope, element) {
        cps = [
            {type: 'TXT', content: '<input type="text" name="<name>" ng-model="<model>" placeholder="<placeholder>" class="textInput"/>'},
        ]
        inputs = [
            {type: 'TXT', name: 'description', model: 'event.description', placeholder: 'Descrição do Evento'},
            {type: 'TXT', name: 'hour', model: 'event.hour', placeholder: 'Hora'}
        ];
        line = "";
        cont = "";
        inputs.forEach(function (input) {
            line = cps.filter(function (cp) {
                return cp.type === input.type;
            })[0].content;
            line = line.replace('<name>', input.name).replace('<model>', input.model).replace('<placeholder>', input.placeholder);
            cont += line;
        });
        angular.element(element).find("form").prepend(cont);
        $compile(element.contents())(scope);
        scope.setDayOfMonth = function (dayOfMonth) {
            scope.dayOfMonth = angular.copy(dayOfMonth);
            scope.dayNotSelected = !scope.dayOfMonth;
            delete dayOfMonth;
        }
        scope.setDateOfDay = function (selDate) {
            scope.dateOfDay = angular.copy(selDate);
        }
        scope.addEvent = function (event) {
            scope.dayNotSelected = !scope.dayOfMonth;
            if (event) {
                scope.descriptionIsBlank = !event.description;
                scope.hourIsBlank = !event.hour;
                if (!scope.hourIsBlank) {
                    if (event.description && event.hour) {
                        scope.eventBus.fireEvent("addEvent", [scope.dayOfMonth, scope.dateOfDay.format('DDMMYYYY'), angular.copy(event)]);                        
                    }
                    delete scope.event;
                }
            }
        };
        scope.eventBus.addListener("setDayOfMonth", scope.setDayOfMonth);
        scope.eventBus.addListener("setDateOfDay", scope.setDateOfDay);
        
    }
});
