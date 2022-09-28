document.addEventListener('DOMContentLoaded', function () {

    let dateInput = document.getElementById('datetimepicker1Input');

    dateInput.onchange = function () {

        // Disable hour buttons
        document.getElementById('schedule-tbody').innerHTML = `
            <tbody id="schedule-tbody">
                <tr>
                    <td><button class="btn hour-btn" type="button" id="09" disabled>09:00:00</button></td>
                    <td><button class="btn hour-btn" type="button" id="10" disabled>10:00:00</button></td>
                    <td><button class="btn hour-btn" type="button" id="11" disabled>11:00:00</button></td>
                    <td><button class="btn hour-btn" type="button" id="12" disabled>12:00:00</button></td>
                    <td><button class="btn hour-btn" type="button" id="13" disabled>13:00:00</button></td>
                </tr>
                <tr>
                    <td><button class="btn hour-btn" type="button" id="14" disabled>14:00:00</button></td>
                    <td><button class="btn hour-btn" type="button" id="15" disabled>15:00:00</button></td>
                    <td><button class="btn hour-btn" type="button" id="16" disabled>16:00:00</button></td>
                    <td><button class="btn hour-btn" type="button" id="17" disabled>17:00:00</button></td>
                    <td><button class="btn hour-btn" type="button" id="18" disabled>18:00:00</button></td>
                </tr>
            </tbody>
        `;

        let formatedDate = '';
        const date = document.getElementById('datetimepicker1Input').value;

        // Convert date format: MM/DD/YYYY to YYYY-MM-DD
        const month = date.substr(0, 2);
        const day = date.substr(3, 2);
        const year = date.substr(6, 4);

        formatedDate = year + '-' + month + '-' + day;
        console.log(formatedDate);

        // AJAX GET DATA =>
        // parameters: código
        // return: dictionary (javascript object)
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:5000/not-available-hours/' + formatedDate);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {

            console.log('READYSTATE: ', xhr.readyState);

            if (this.status === 200) {

                var data = xhr.response;
                console.log(data);

                if (data.message === "Successful request") {

                    const hours = ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00"];
                    let not_available_hours = data.not_available_hours;

                    for (let hour in hours) {
                        console.log(hours[hour]);
                        if (!not_available_hours.includes(hours[hour])) {
                            let available_hour = hours[hour];
                            console.log(available_hour.substring(0, 2));
                            let td = document.getElementById(available_hour.substring(0, 2));
                            console.log(td);
                            td.removeAttribute('disabled');
                        }
                    }
                } else {
                    alert('Error request...');
                }
            }
        }

        xhr.send();

        $("#09").click(function () {
            time.value = document.getElementById('09').textContent;
        });
        $("#10").click(function () {
            time.value = document.getElementById('10').textContent;
        });
        $("#11").click(function () {
            time.value = document.getElementById('11').textContent;
        });
        $("#12").click(function () {
            time.value = document.getElementById('12').textContent;
        });
        $("#13").click(function () {
            time.value = document.getElementById('13').textContent;
        });
        $("#14").click(function () {
            time.value = document.getElementById('14').textContent;
        });
        $("#15").click(function () {
            time.value = document.getElementById('15').textContent;
        });
        $("#16").click(function () {
            time.value = document.getElementById('16').textContent;
        });
        $("#17").click(function () {
            time.value = document.getElementById('17').textContent;
        });
        $("#18").click(function () {
            time.value = document.getElementById('18').textContent;
        });
    }
});