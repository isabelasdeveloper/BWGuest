document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.getElementById('termsCheckbox');
    var loginButton = document.querySelector('.botao');
    var errorMessage = document.getElementById('errorMessage');

    checkbox.addEventListener('change', function () {
        loginButton.disabled = !checkbox.checked;
        errorMessage.textContent = '';
    });

    loginButton.addEventListener('click', function (event) {
        if (!checkbox.checked) {
            event.preventDefault();
            errorMessage.textContent = 'Você não aceitou os Termos e Condições!';
        } else {
            // Adicione aqui a lógica para processar o login
            submitAction(); // Chama a função para processar o login adicional
        }

        function submitAction() {
            var link = document.location.href;
            var searchString = "redirect=";
            var equalIndex = link.indexOf(searchString);
            var redirectUrl = "";

            if (document.forms[0].action === "") {
                var url = window.location.href;
                var args = parseQueryString(location.search.substring(1));
                document.forms[0].action = args.switch_url;
            }

            if (equalIndex >= 0) {
                equalIndex += searchString.length;
                redirectUrl = link.substring(equalIndex);
            }

            if (redirectUrl.length > 255) {
                redirectUrl = redirectUrl.substring(0, 255);
            }

            document.forms[0].redirect_url.value = redirectUrl;
            document.forms[0].buttonClicked.value = 4;
            document.forms[0].submit();
        }
    });

    function loadAction() {
        var args = parseQueryString(location.search.substring(1));

        document.forms[0].action = args.switch_url;

        var statusCodeMessages = {
            1: "Você já está logado. Nenhuma ação adicional é necessária.",
            2: "Você não está configurado para autenticar no portal web. Nenhuma ação adicional é necessária.",
            3: "O nome de usuário especificado não pode ser usado neste momento. Talvez o usuário já esteja logado no sistema?",
            4: "Nome de usuário ou senha incorretos. Por favor, tente novamente.",
            5: "A combinação de Nome de Usuário e Senha que você inseriu é inválida. Por favor, tente novamente."
        };

        var statusCodeMessage = statusCodeMessages[args.statusCode];
        if (statusCodeMessage) {
            alert(statusCodeMessage);
        }
    }

    function parseQueryString(query) {
        var args = new Object();
        var pairs = query.split("&");
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            if (pos == -1) continue;
            var argname = pairs[i].substring(0, pos);
            var value = pairs[i].substring(pos + 1);
            args[argname] = decodeURIComponent(value);
        }
        return args;
    }

});

    