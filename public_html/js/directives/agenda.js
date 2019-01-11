angular.module("agenda").directive('agenda', function ($compile) {
    return {
        scope: {eventBus: "="},
        link: link,
        templatere: ''
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

        scope.element = element;
        scope.store = new Store();

        scope.getCellLayoutByIndex = function (dayOfWeekIdx, dayOfMonth) {
            dayClass = (dayOfMonth === "") ? "cellIgnored" : "cellNoEvent";
            dayCell = '<day-cell event-bus="eventBus" day-index="' + dayOfWeekIdx + '" day-of-month="' + dayOfMonth + '" ng-click="dayClick(' + dayOfMonth + ')" class="' + dayClass + '"></day-cell>';
            if (dayOfWeekIdx === 0) {
                return '<tr><td>' + dayCell + '</td>';
            } else if (dayOfWeekIdx === 6) {
                return '<td>' + dayCell + '</td></tr>';
            } else {
                return '<td>' + dayCell + '</td>';
            }
        }

        scope.dayClick = function (dayOfMonth) {
            scope.eventBus.fireEvent("setDayOfMonth", dayOfMonth);
            scope.selectCell(dayOfMonth);
        }

        let date = moment();
        scope.monthNumber = date.month();
        scope.currentYear = date.year();
        scope.currentMonth = monthNames[scope.monthNumber];
        scope.nmontSizeh = date.daysInMonth();
        var newDayCell = "";
        var monthGrid = '<tr><th class="tableArrow">\<<</th><th class="tableHeader" colspan="5">{{currentMonth}}\/{{currentYear}}</th><th class="tableArrow">\>></th></tr>\
                <tr><th class=\'tableHeader\'>Dom</th><th class=\'tableHeader\'>Seg</th><th class=\'tableHeader\'>Ter</th><th class=\'tableHeader\'>Qua</th><th \n\
                class=\'tableHeader\'>Qui</th><th class=\'tableHeader\'>Sex</th><th class=\'tableHeader\'>Sab</th></tr>';
        let fixed = false;
        var enptyCellCount = null;
        for (var dayIdx = 1; dayIdx <= scope.nmontSizeh; dayIdx++) {
            let day = moment().year(scope.currentYear).month(scope.monthNumber).date(dayIdx);
            if (day.day() > 0 && !fixed) {
                if (!enptyCellCount) {
                    enptyCellCount = Math.abs(day.day());
                }
                emptyIndex = 0;
                while (emptyIndex < day.day()) {
                    newDayCell = scope.getCellLayoutByIndex(emptyIndex, "");
                    //newDayCell = dayCell(emptyIndex, "");
                    monthGrid += newDayCell;
                    emptyIndex++;
                }
                fixed = true;
            }
            newDayCell = scope.getCellLayoutByIndex(day.day(), day.date());
            //newDayCell = '<day-cell event-bus="eventBus" day-index="' + day.day() + '" day-of-month="' + day.date()+'"></day-cell>';
            monthGrid += newDayCell;
            //$compile(angular.element(newDayCell))(scope);
        }
        
        scope.selectCell = function (dayOfMonth) {
            $(scope.element.find("td")[(dayOfMonth + enptyCellCount - 1)]).toggleClass('cellSelected');
        }

        scope.highLightCell = function (dayOfMonth) {
            $(scope.element.find("td")[(dayOfMonth + enptyCellCount - 1)]).toggleClass('cellHasEvent');
        }
        
        scope.hideCell = function (dayOfMonth) {
            $(scope.element.find("td")[(dayOfMonth + enptyCellCount - 1)]).toggleClass('cellNoEvent');
        }

        //monthGrid += "</table>";

        var newDir = angular.element('<table class="tableAgenda">' + monthGrid + '</table>');
        angular.element(element).append(newDir);
        scope.eventBus.addListener("highLightCell", scope.highLightCell);
        scope.eventBus.addListener("hideCell", scope.hideCell);
        $compile(newDir)(scope);
    }

});
