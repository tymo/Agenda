angular.module("agenda").directive('inputBuilder', function ($compile) {
    return {
        scope: {
            eventBus: "=",
            insertListener: "=",
            inputFields: "=",
            objectName: "="
        },
        link: link,
        template:
                '<form name="newForm">\
        </form>'
    };
    const LISTEER = 0;
    const ITEM = 1;
    function link(scope, element) {
        scope.cps = [
            {type: 'TXT', content: '<input type="text" name="<name>" ng-model="<model>" placeholder="<placeholder>" class="textInput"/>'},
            {type: 'TXD', content: '<input type="text" ng-model="<model>" name="<name>" placeholder="<placeholder>" ui-date/>'},
            {type: 'DTP', content: '<input type="date" name="<name>" ng-model="<model>" placeholder="<placeholder>" class="textInput" />'},
            {type: 'BTN', content: '<button class="addButton" name="sendButton" ng-click="addItem(\'<insertListemer>\', <dataObject>)">Adicionar</button>'},
            {type: 'BTP', content: '<button class="addButton" name="sendButton" ng-click="addPatient(patient)">Adicionar</button>'},
            {type: 'BTD', content: '<button class="addButton" name="sendButton" ng-click="addDoctor(doctor)">Adicionar</button>'}
        ]

        line = "";
        cont = "";
        scope.inputFields.forEach(function (input) {
            line = scope.cps.filter(function (cp) {
                return cp.type === input.type;
            })[0].content;
            if (line) {
                if (input.type === "BTN") {
                    line = line.replace('<insertListemer>', input.listener).replace('<dataObject>', input.dataObject);
                } else if (["TXT", "TXD", "DTP"].includes(input.type)) {
                    //} else if ((input.type === "TXT")||(input.type === "TXD")) {
                    line = line.replace('<name>', input.name).replace('<model>', input.model).replace('<placeholder>', input.placeholder);
                }
                cont += line + "<br>";
            }
        });
        //angular.element(element).find("form").prepend(cont);
        $(element).find("form").prepend(cont);
        $compile(element.contents())(scope);

//        scope.addItem = function (params) {
//            if (params) {
//                scope.eventBus.fireEvent(params[LISTENER], params[ITEM]);
//            }
//        }

        scope.addItem = function (listener, dataObject) {
            if (listener && dataObject) {
                scope.eventBus.fireEvent(listener, dataObject);
            }
            if (scope.patient) {
                delete scope.patient;
            }
            if (scope.doctor) {
                delete scope.doctor;
            }
        }

        scope.addPatient = function (patient) {
            if (patient) {
                if (patient.name) {
                    scope.eventBus.fireEvent("insertPatient", angular.copy(patient));
                }
            }
            delete scope.patient;
        };

        scope.addDoctor = function (doctor) {
            if (doctor) {
                scope.eventBus.fireEvent("insertDoctor", angular.copy(doctor));
            }
            delete scope.doctor;
        };
    }
});