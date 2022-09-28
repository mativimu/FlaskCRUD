document.addEventListener('DOMContentLoaded', function () {

    let btnCancelAppointment = document.getElementById('cancel-appointment');

    btnCancelAppointment.onclick = function () {

        const rut = document.getElementById('rut3').value;

        // AJAX GET DATA =>
        // parameters: código
        // return: dictionary (javascript object)
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'http://127.0.0.1:5000/cancel-appointment/' + rut);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {

            console.log('READYSTATE: ', xhr.readyState);

            if (this.status === 200) {

                var data = xhr.response;
                console.log(data);

                if (data.message === "successfully canceled appointment") {
                    alert(data.message);
                }
            }
        }

        xhr.send();
    }

});