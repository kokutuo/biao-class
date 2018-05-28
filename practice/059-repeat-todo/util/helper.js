window.helper = {
    getFormData: getFormData,
    setFormData: setFormData,
    clearFormData: clearFormData
};

function getFormData(form) {
    if (typeof form == 'string') {
        form = document.querySelector(form);
    }

    var data = {};
    var list = form.querySelectorAll('[name]');

    list.forEach(function (input) {
        switch (input.nodeName) {
            case 'INPUT':
                switch (input.type) {
                    case 'text':
                    case 'number':
                    case 'password':
                    case 'search':
                    case 'hidden':
                        data[input.name] = input.value;
                        break;
                    case 'radio':
                    case 'checkbox':
                        data[input.name] = input.checked;
                        break;
                }
                break;
            case 'TEXTAREA':
                data[input.name] = input.value;
                break;
            case 'SELECT':
                data[input.name] = input.value;
                break;
        }
    });

    return data;
}

function setFormData(form, data) {
    if (typeof form == 'string') {
        this.form = document.querySelector(form);
    }

    for (var key in data) {
        var val = data[key];
        var dataType = typeof val;
        var input = form.querySelector(`[name=${key}]`);
        if (!input) {
            continue;
        }
        switch (dataType) {
            case 'string':
            case 'number':
                input.value = val;
                break;
            case 'boolean':
                input.checked = val;
                break;
        }
    }
}

function clearFormData(form) {
    if (typeof form == 'string') {
        this.form = document.querySelector(form);
    }
    form
        .querySelectorAll('[name]')
        .forEach(function (input) {
            if (input.type == 'radio' || input.type == 'checkbox') {
                input.value = false;
            }

            input.value = '';
        });
}