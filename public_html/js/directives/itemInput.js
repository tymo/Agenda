angular.module("todoList").directive('itemInput', function ($compile) {
    return {
        scope: {
            eventBus: "="},
        link: link,
        template:
                '<form name="tarefaForm">\
        <button class="addButton" name="sendButton" ng-click="adicionarTarefa(tarefa)">Adicionar</button>\
        </form>\
        <div ng-show="dscricaoNaoInformada" class="alert alert-danger">\
          Por favor, preencha o campo descrição!\
        </div>\
        <div ng-show="dataNaoInformada" class="alert alert-danger">\
          Por favor, preencha o campo data prevista!\
        </div>'
    };

    function link(scope, element) {
        cps = [
            {type: 'TXT', content: '<input type="text" name="<name>" ng-model="<model>" placeholder="<placeholder>" class="textInput"/>'},
            {type: 'DTP', content: '<input type="date" name="<name>" ng-model="<model>" placeholder="<placeholder>" class="textInput" />'},
        ]
        content = "";
        inputs = [
            {type: 'TXT', name: 'descricao', model: 'tarefa.descricao', placeholder: 'Descrição da tarefa'},
            {type: 'DTP', name: 'data', model: 'tarefa.dataprv', placeholder: 'Previsto para'}
        ];
        line = "";
        cont = "";
        inputs.forEach(function (input) {
            line = cps.filter(function (cp) {
                return cp.type === input.type;
            })[0].content;
            line = line.replace('<name>', input.name).replace('<model>', input.model).replace('<placeholder>', input.placeholder);
            //line = line.replace('<model>', input.model);
            //line = line.replace('<placeholder>', input.placeholder);
            cont += line;
        });
        //element.getElementsByClassName('tarefaForm').add(cont);
        angular.element(element).find("form").prepend(cont);
        //$compile(element);
        $compile(element.contents())(scope);

        // iterar dentro dos itens de inputs
        // gerar uma string com os elementos que devem ser adicionados na tela
        // utilizar $compile para transformar em elementos angular
        // adicionar o resultado dentro do element
        // element é a variável que guarda o html que está na tela

        scope.adicionarTarefa = function (tarefa) {
            if (tarefa) {
                scope.dscricaoNaoInformada = !tarefa.descricao;
                scope.dataNaoInformada = !tarefa.dataprv;
                if (!scope.dataNaoInformada) {
                    if (tarefa.descricao && tarefa.dataprv) {
                        scope.eventBus.fireEvent("adicionarTarefa", tarefa);
                    }
                    delete scope.tarefa;
                }
            }
        };

        scope.adicionarTarefaKey = function (tarefa, keycode) {
            if (keycode === 13) {
                scope.adicionarTarefa(tarefa);
            }
        };
    }
});
