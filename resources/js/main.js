window.url = function(path = null) {
    return baseUrl + path
}

const apiHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
}

window.http = {
    get: function (path) {
        return fetch(url(path)).then(res => res.json());
    },
    post: function (path, data) {
        return fetch(url(path), {
            method: 'POST',
            headers: apiHeader,
            body: JSON.stringify(data)
        }).then(res => res.json());
    },
    put: function (path, data) {
        return fetch(url(path), {
            method: 'PUT',
            headers: apiHeader,
            body: JSON.stringify(data)
        }).then(res => res.json());
    },
    delete: function (path) {
        return fetch(url(path), {
            method: 'DELETE'
        }).then(res => res.json());
    }
}

window.read = function(selector, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(selector);
    reader.onload = () => {
        callback(reader.result);
    }
}

window.numeric = function(str) {
    return str.toString().replace(/[^,\d]/gi, '');
}

window.notif = function(message, type, toast = false) {
    if (toast) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false,
            showCloseButton: true
        });

        return Toast.fire({
            title: message,
            type: type
        })
    } else {
        return Swal.fire({
            title: type[0].toUpperCase() + type.slice(1),
            text: message,
            type: type
        })
    }
}

window.modalHide = function(selector) {
    bootstrap.Modal.getInstance(document.querySelector(selector)).hide();
    document.querySelector('.modal-backdrop').remove();
}