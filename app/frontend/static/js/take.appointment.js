document.addEventListener('DOMContentLoaded', function () {

    let btnTakeAppointment = document.getElementById('take-appointment');

    btnTakeAppointment.onclick = function () {

        let date = document.getElementById('datetimepicker1Input').value;
        let time = document.getElementById('time').value;
        let name = document.getElementById('name').value;
        let rut = document.getElementById('rut1').value;
        let email = document.getElementById('email').value;

        // Create datetime
        const month = date.substr(0, 2);
        const day = date.substr(3, 2);
        const year = date.substr(6, 4);

        const dateTime = year + '-' + month + '-' + day + ' ' + time;
        console.log(dateTime);

        // Create appointment object
        const appointment = {
            rut: rut,
            name: name,
            email: email,
            date: dateTime
        };
        console.log('appointment')
        // AJAX GET DATA =>
        // parameters: código
        // return: dictionary (javascript object)
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:5000/schedule');
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {

            console.log('READYSTATE: ', xhr.readyState);

            if (this.status === 200) {

                var data = xhr.response;
                console.log(data);

                if (name === '' || rut === '' || email === '' || date === '' || time === '') {

                    alert("You have to complete the form...");

                } else if (data.message === "successfully scheduled appointment") {

                    let cardName = document.getElementById('card-name');
                    let cardEmail = document.getElementById('card-email')
                    let cardDate = document.getElementById('card-date');
                    
                    cardName.innerText = name;
                    cardEmail.innerText = email;
                    cardDate.innerText = dateTime;

                    name = '';
                    rut = '';
                    email = '';
                    date = '';
                    time = '';

                }else{

                    alert(data.message);

                    name = '';
                    rut = '';
                    email = '';
                    date = '';
                    time = '';
                }
            }
        }

        xhr.send(JSON.stringify(appointment));
    }

});