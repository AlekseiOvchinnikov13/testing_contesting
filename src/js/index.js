window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 1500);
    new WOW({
        animateClass: 'animate__animated'
    }).init();

    const toggleMenu = () => {
        document.querySelector('html').classList.toggle('open');
    };

    document.querySelector('.burger').addEventListener('click', toggleMenu);
    const menuLinks = document.querySelectorAll('a.menu__link');
    document.querySelector('.menu').addEventListener('click', e => {
        menuLinks.forEach(item => {
            if (item === e.target)
                toggleMenu();
        });
    });

    document.querySelector('.arrow-down-about').addEventListener('click', e => {
        document.querySelector('.about__text').classList.toggle('hide');
        document.querySelector('.about__wrapper').classList.toggle('hide');
        e.target.classList.toggle('rotate');
    });

    document.querySelector('.arrow-down-sponsor').addEventListener('click', e => {
        document.querySelector('.wrapper-sponsor').classList.toggle('hide');
        e.target.classList.toggle('rotate');
    });

    let element = document.getElementById('phone');
    let maskOptions = {
        mask: '+{7}(000)000-00-00'
    };

    IMask(element, maskOptions);

    let errorSpan = document.querySelector('.form-error')

    document.querySelector('input[type="tel"]').addEventListener('input', (e) => {
        inputHandler(e.target, e.target.name)
    });
    document.querySelector('input[name="name"]').addEventListener('input', (e) => {
        inputHandler(e.target, e.target.name)
    });
    document.querySelector('input[name="email"]').addEventListener('input', (e) => {
        inputHandler(e.target, e.target.name)
    });

    function showSuccess() {
        errorSpan.classList.add('display')
        errorSpan.classList.add('form-success')
        errorSpan.innerText = 'Ваша заявка принята, ожидайте обратной связи.';
    }

    function removeSuccess() {
        errorSpan.classList.remove('form-success');
    }

    function showError(message) {
        errorSpan.classList.add('display')
        errorSpan.innerText = message;
    }

    function cleanInput(el) {
        el.className = 'field'
    }

    function hideErrors(el) {
        errorSpan.classList.remove('display')
        inputError(el, false)
    }

    function inputError(el, valid) {
        if (valid) {
            el.className = 'field error';
        } else {
            el.className = 'field valid';
        }
    }

    function inputHandler(el, type) {
        removeSuccess();

        let regex = {
            name: '^[а-яА-ЯёЁ]+[ -]?[а-яА-ЯёЁ ]+$',
            phone: '\\+\\d+',
            email: '^(?:[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])$'
        }

        let message = {
            name: 'Введите корректное Имя, Фамилию',
            phone: 'Введите корректный телефон',
            email: 'Введите корректный адрес электронной почты'
        }

        regex = new RegExp(regex[type]);
        let value = el.value
        let valid;

        if (value.length === 0) {
            cleanInput(el)
            return
        }

        valid = regex.test(value)

        if (valid)
            hideErrors(el)

        if (!valid) {
            showError(message[type])
            inputError(el, true)
        }
        return valid;
    }

    function checkValidAllFields() {
        let fields = document.querySelectorAll('input[data-validation="true"]');
        for (let i = 0; i < fields.length; i++) {
            if (!inputHandler(fields[i], fields[i].name))
                return false;
        }
        return true;
    }

    $('#registration').submit(function (e) {
        e.preventDefault();
        if (!checkValidAllFields()) return;
        loadingToggle(true);

        let data = $(this).serializeArray();
        $.ajax({
            type: "POST",
            url: 'mail.php',
            data: data,
            success: () => {
                showSuccess();
                loadingToggle(false);
                clearFields();
            },
            dataType: 'text'
        });
    });

    function clearFields(){
        let fields = document.querySelectorAll('.fieldset .field');
        fields.forEach((el) => {
            el.value = '';
        })
    }

    function loadingToggle(value) {
        let reg = document.querySelector('#registration');
        value ? reg.classList.add('loading') : reg.classList.remove('loading');

        let btn = document.querySelector('#btn');
        btn.value = value ? '' : 'Отправить';
    }

    /*document.querySelector('#accept-rule').addEventListener('click', e => {
        let btn = document.querySelector('#btn');
        btn.disabled = !e.target.checked
    })*/
};


