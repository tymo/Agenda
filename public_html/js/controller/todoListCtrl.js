angular.module("todoList", []);
angular.module("todoList").controller("todoListCtrl", function ($scope) {
    $scope.app = "To-Do List";
//    $scope.tarefasPen = [];
//    $scope.tarefasCon = [];
    $scope.listeners = {};

    const listeners = [];

    $scope.eventBus = {
        addListener: function (eventName, func) {
            // add listener on the list of listeners
            let listener = {
                name: eventName,
                callback: func,
            }
            listeners.push(listener);
        },
        fireEvent: function (eventName, param) {
            eventMatches = listeners.filter(function (listener) {
                return listener.name === eventName;
            });
            eventMatches.forEach(function (evt) {
                evt.callback.call(this, param);
            });
        }
    }

//    $scope.adicionarTarefa = function (tarefa) {
//        tarefa.horaAdd = new Date();
//        tarefa.idx = ($scope.tarefas.length || 0);
//        $scope.tarefas.push(angular.copy(tarefa));
//        delete $scope.tarefa;
//    };
//
//    $scope.adicionarTarefaKey = function (tarefa, keycode) {
//        if (keycode === 13) {
//            $scope.adicionarTarefa(tarefa);
//        }
//    };
//
//    $scope.apagarTarefa = function (tarefa) {
//        if ($scope.tarefas.length > 1) {
//            $scope.tarefas.splice($scope.tarefas.indexOf(tarefa), 1);
//            delete tarefa;
//        } else {
//            $scope.tarefas.pop();
//        }
//    };
//
//    $scope.selecionaTarefa = function (tarefa) {
//        if (tarefa) {
//            if (tarefa.selecionada) {
//                tarefa.horaFim = new Date();
//            } else {
//                tarefa.horaFim = null;
//            }
//            $scope.tarefas[$scope.tarefas.indexOf(tarefa)] = angular.copy(tarefa);
//            $scope.tarefas = angular.copy($scope.tarefas);
//        }
//    };
});