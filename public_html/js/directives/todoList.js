angular.module("todoList").directive('todoList', function () {
    return {
        scope: {eventBus: "="},
        link: link,
        template: '<table class="table">\
                <tr><th  ng-class="\'selecionada\'" colspan="7">{{currentYear}}</th>\
                <tr><th  ng-class="\'selecionada\'" colspan="7">{{currentMonth}}({{weeksinmonth}})({{daysinmonth}})</th>\
                <th ng-class="\'selecionada\'" colspan="7"></th></tr>\
                <tr><th>Dom</th><th>Seg</th><th>Ter</th><th>Qua</th><th>Qui</th><th>Sex</th><th>Sab</th></tr>\
                 <tr class="tr-todo-item" todo-Item event-bus="eventBus" tarefa="tarefa" store="store" \
                 ng-repeat="tarefa in store.get(\'itens\')"></tr></table>'
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

        const monthNames = ["Janeiro", "Fevereiro", "MArço", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];



//        scppe.getWeekNum = function (year, month) {
//            var daysNum = 32 - new Date(year, month, 32).getDate(),
//                    fDayO = new Date(year, month, 1).getDay(),
//                    fDay = fDayO ? (fDayO - 1) : 6,
//                    weeksNum = Math.ceil((daysNum + fDay) / 7);
//            return weeksNum;
//        }

        scope.element = element;
        scope.store = new Store();

        let date = moment();
        scope.month = date.month();
        scope.currentYear = date.year();
        scope.daysinmonth = date.daysInMonth();
        scope.currentMonth = monthNames[scope.month];
        var dayCell = "";
        var monthGrid = "";
        for (var idx = 1; idx <= scope.daysinmonth; idx++) {
            let day = moment().year(scope.currentYear).month(scope.month).date(idx);
            if (day.day() == 0) {
                dayCell = "<tr><td>" + day.date() + "</td>";
            } else if (day.day() == 6) {
                dayCell = "<td>" + day.date() + "</td></tr>";
            } else {
                dayCell = "<td>" + day.date() + "</td>";
            }
            monthGrid += dayCell;
        }
        angular.element(element).find("table").append(monthGrid);
        $compile(element.contents())(scope);

        scope.store.set("itens", []);
        scope.eventBus.addListener("adicionarTarefa", scope.adicionarTarefa);
        scope.eventBus.addListener("selecionarTarefa", scope.selecionarTarefa);
        scope.eventBus.addListener("confirmaApagarTarefa", scope.confirmaApagarTarefa);
        scope.eventBus.addListener("apagarTarefaSel", scope.apagarTarefaSel);
    }

});
