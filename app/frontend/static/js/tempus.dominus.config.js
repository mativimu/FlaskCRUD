new tempusDominus.TempusDominus(document.getElementById('datetimepicker1'), {

    display: {

        viewMode: 'calendar',
        buttons: {
            today: false,
            clear: true,
            close: true,
        },
        components: {
            decades: false,
            year: true,
            month: true,
            date: true,
            hours: false,
            minutes: false,
            seconds: false,
            useTwentyfourHour: false,
        }
    }, 
    restrictions: {

        daysOfWeekDisabled: [0, 6]
    }
});