document.addEventListener('DOMContentLoaded', function () {

    let btnCancelAppointment = document.getElementById('get-appointment');

    btnCancelAppointment.onclick = function () {

        const rut = document.getElementById('rut2').value;

        // AJAX GET DATA =>
        // parameters: código
        // return: dictionary (javascript object)
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:5000/appointments/' + rut);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {

            console.log('READYSTATE: ', xhr.readyState);

            if (this.status === 200) {

                var data = xhr.response;
                console.log(data);

                if (data.message === "successful request") {

                    let cardName = document.getElementById('card-name');
                    let cardEmail = document.getElementById('card-email')
                    let cardDate = document.getElementById('card-date');

                    cardName.innerText = data.appointment[0].name;
                    cardEmail.innerText = data.appointment[0].email;
                    cardDate.innerText = data.appointment[0].date;

                } else {
                    alert(data.message);
                }
            }else{
                alert('something went wrong...')
            }
        }
        xhr.send();
    }

});