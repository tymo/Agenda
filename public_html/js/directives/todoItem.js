angular.module("todoList").directive('todoItem', function () {
    return {
        scope: {eventBus: "=", tarefa: "=", store: "="},
        link: link,
        template:
                '<td><input type="checkbox" ng-model="tarefa.selecionada" ng-click="selecionarTarefa(tarefa)"/></td>\
        <td>{{tarefa.descricao}}</td>\
        <td>{{tarefa.horaAdd| date:\'dd/MMM - HH:mm:ss\'}}</td>\
        <td id="td-data-prv">{{tarefa.dataprv| date:\'dd/MM/yyyy\'}}</td>\
        <td>{{tarefa.horaFim| date:\'dd/MMM - HH:mm:ss\'}}</td>\
        <td><button class="removeButton" ng-click="apagarTarefa(tarefa)">X</button></td>\
        <td><div style="width: 20px; height: 20px;"></div></td>'
    };

    function link(scope, element) {
        scope.getColorByDate = function (tarefaData) {
            if (!tarefaData) {
                return 'selecionada';
            }
            var t = (tarefaData - new Date()) / 1000 / 60 / 60 / 24;
            if (t <= 2) {
                return 'urgent';
            }
            if (t > 2 && t <= 5) {
                return 'warn';
            }
            if (t > 5) {
                return 'fine';
            }
        };
        scope.element = element;
        scope.store.subscribe("set-data-prv-color", function (tarefaDataPrv) {
            var idx = ($(scope.element).find('#td-data-prv').length - 1);
            $($(scope.element).find('#td-data-prv')[idx]).toggleClass(scope.getColorByDate(tarefaDataPrv));
        });
        if (!scope.tarefa.selecionada) {
            scope.store.set("set-data-prv-color", scope.tarefa.dataprv);
        }

        // utilizar o método set,
        //  para alterar as informações 
        //  que interagem com a tela
        // utilizar o método subscribe,
        //  adicionando uma function 
        //  com o que deve ocorrer
        //  quando a variavel for alterada
        //  remover todos os ng-class e ng-style
        //  alterar a tela somente através do store

        scope.selecionarTarefa = function (tarefa) {
            scope.eventBus.fireEvent("selecionarTarefa", tarefa);
        };
        scope.apagarTarefa = function (tarefa) {
            scope.eventBus.fireEvent("confirmaApagarTarefa", tarefa);
        };
    }
});
