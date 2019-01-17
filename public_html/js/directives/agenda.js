angular.module("agenda").directive('agenda', function ($compile) {
    return {
        scope: {eventBus: "="},
        link: link,
        templatere: ''
    };

    var lastSelectedCell = null;
    var emptyCellCount = null;
    function link(scope, element) {
        const SUNDAY = 0;
        const SATURDAY = 6;
        scope.monthGrid = null;
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

        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];

        scope.getCellLayoutByIndex = function (dayOfWeekIdx, dayOfMonth) {
            dayClass = (dayOfMonth === "") ? "cellIgnored" : "cellNoEvent";
            dayCell = '<day-cell event-bus="eventBus" day-index="' + dayOfWeekIdx + '" day-of-month="' + dayOfMonth + '" date-of-day="' + moment().year(scope.currentYear).month(scope.monthIdx).date(dayOfMonth).format("DDMMYYYY") + '" ng-click="dayClick(' + dayOfMonth + ')" class="' + dayClass + '"></day-cell>';
            if (dayOfWeekIdx === SUNDAY) {
                return '<tr><td>' + dayCell + '</td>';
            } else if (dayOfWeekIdx === SATURDAY) {
                return '<td>' + dayCell + '</td></tr>';
            } else {
                return '<td>' + dayCell + '</td>';
            }
        }

        scope.createMonth = function (newDate) {
            if (lastSelectedCell != null) {
                $(scope.element.find("td")[lastSelectedCell]).toggleClass('cellSelected');
                lastSelectedCell = null;
            }
            if (emptyCellCount != null) {
                emptyCellCount = null;
            }
            scope.monthGrid = '<tr><th class="tableArrow" ng-click="prevMonth()">\<<</th><th class="tableHeader" colspan="5">{{currentMonth}}\/{{currentYear}}</th><th class="tableArrow" ng-click="nextMonth()">\>></th></tr>\
                <tr><th class=\'tableHeader\'>Dom</th><th class=\'tableHeader\'>Seg</th><th class=\'tableHeader\'>Ter</th><th class=\'tableHeader\'>Qua</th><th \n\
                class=\'tableHeader\'>Qui</th><th class=\'tableHeader\'>Sex</th><th class=\'tableHeader\'>Sab</th></tr>';
            scope.date = newDate;
            scope.monthIdx = scope.date.month();
            scope.currentYear = scope.date.year();
            scope.currentMonth = monthNames[scope.monthIdx];
            scope.nmontSizeh = scope.date.daysInMonth();
            var newDayCell = "";

            let fixed = false;
            for (var dayIdx = 1; dayIdx <= scope.nmontSizeh; dayIdx++) {
                let day = scope.date.year(scope.currentYear).month(scope.monthIdx).date(dayIdx);
                if (day.day() > 0 && !fixed) {
                    if (!emptyCellCount) {
                        emptyCellCount = Math.abs(day.day());
                    }
                    emptyIndex = 0;
                    while (emptyIndex < day.day()) {
                        newDayCell = scope.getCellLayoutByIndex(emptyIndex, "");
                        //newDayCell = dayCell(emptyIndex, "");
                        scope.monthGrid += newDayCell;
                        emptyIndex++;
                    }
                    fixed = true;
                } else {
                    fixed = true;
                }
                newDayCell = scope.getCellLayoutByIndex(day.day(), day.date());
                scope.monthGrid += newDayCell;
            }

            monthTable = angular.element('<table class="tableAgenda">' + scope.monthGrid + '</table>');
            if ($(scope.element.find("table")).length !== 0) {
                $(scope.element.find("table")).replaceWith(monthTable);
            } else {
                angular.element(element).append(monthTable);
            }
            $compile(monthTable)(scope);
            scope.eventBus.fireEvent("getEventList");
        }

        if (!scope.element) {
            scope.element = element;
        }
        if (!scope.store) {
            scope.store = new Store();
        }
        scope.checkForEvents = function (eventList) {
            for (var dayIdx = 1; dayIdx <= scope.nmontSizeh; dayIdx++) {
                let day = moment().year(scope.currentYear).month(scope.monthIdx).date(dayIdx).format("DDMMYYYY");
                if (day) {
                    if (((eventList.filter(function (event) {
                        return event.dateOfDay === day;
                    })).length > 0)) {
                        scope.highLightCell(day.date);
                    }
                }
            }
        }
        scope.dayClick = function (dayOfMonth) {
            scope.eventBus.fireEvent("setDayOfMonth", angular.copy(dayOfMonth));
            newDate = angular.copy(moment().year(scope.currentYear).month(scope.monthIdx).date(dayOfMonth));
            scope.eventBus.fireEvent("setDateOfDay", angular.copy(newDate));
            scope.eventBus.fireEvent("setDateToDay", [angular.copy(dayOfMonth), angular.copy(newDate)]);
            scope.selectCell(dayOfMonth);
        }

        scope.createMonth(angular.copy(moment()));

        scope.selectCell = function (dayOfMonth) {
            if (lastSelectedCell) {
                $(scope.element.find("td")[lastSelectedCell]).toggleClass('cellSelected');
            }
            $(scope.element.find("td")[(dayOfMonth + emptyCellCount - 1)]).toggleClass('cellSelected');
            scope.eventBus.fireEvent("selectDay", dayOfMonth);
            lastSelectedCell = (dayOfMonth + emptyCellCount - 1);
        }

        scope.highLightCell = function (dayOfMonth) {
            $(scope.element.find("td")[(dayOfMonth + emptyCellCount - 1)]).removeClass('cellSelected');
            $(scope.element.find("td")[(dayOfMonth + emptyCellCount - 1)]).addClass('cellHasEvent');
            //$(scope.element.find("td")[(dayOfMonth + emptyCellCount - 1)]).toggleClass('cellHasEvent');
        }

        scope.hideCell = function (dayOfMonth) {
            $(scope.element.find("td")[(dayOfMonth + emptyCellCount - 1)]).removeClass('cellHasEvent');
            $(scope.element.find("td")[(dayOfMonth + emptyCellCount - 1)]).addClass('cellNoEvent');
        }

        scope.nextMonth = function () {
            scope.eventBus.fireEvent("removeListener");
            scope.createMonth(scope.date.add(1, 'M'));
        }

        scope.prevMonth = function () {
            scope.eventBus.fireEvent("removeListener");
            scope.createMonth(scope.date.subtract(1, 'M'));
        }

        scope.eventBus.addListener("highLightCell", scope.highLightCell);
        scope.eventBus.addListener("hideCell", scope.hideCell);
        scope.eventBus.addListener("checkForEvents", scope.checkForEvents);
    }
});
