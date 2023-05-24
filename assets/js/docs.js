$(document).ready(function () {
    if (getCookie('apikey')){
        sessionStorage.setItem('apikey', getCookie('apikey'));
    }
    const page = document.URL.split('/');
    $('#iid').val(sessionStorage.getItem('iid'));
    $('#apikey').val(sessionStorage.getItem('apikey'));

    let iid = ($('#iid').val() == "" || $('#iid').val() == "") ? `{{ instance_id }}` : $('#iid').val();

    $('#apiurl').text(`http://localhost:8081/api/${iid}/${document.URL.split('/')[4]}`);

    $(document).on('click', '#save', function () {
        nullfield_validation('iid');
        nullfield_validation('apikey');
        if (objFlag.flag_iid == 0 && objFlag.flag_apikey == 0) {
            sessionStorage.setItem('iid', `${$('#iid').val()}`);
            sessionStorage.setItem('apikey', `${$('#apikey').val()}`);

            iid = $('#iid').val();

            $('#apiurl').text(`http://localhost:8081/api/${iid}/${document.URL.split('/')[4]}`);
            $('#iid, #apikey').removeClass('form-control-success form-control-danger');
        }
    })

    $(document).on('click', '#clear', function () {
        sessionStorage.removeItem('iid');
        sessionStorage.removeItem('apikey');

        $('#iid').val(null);
        $('#apikey').val(null);

        iid = `{{ instance_id }}`;

        $('#apiurl').text(`http://localhost:8081/api/${iid}/${document.URL.split('/')[4]}`);
        $('#iid, #apikey').removeClass('form-control-success form-control-danger');
    })

    $(document).on("click", ".copy", function () {
        var param = $(this).attr("id").substring(5);
        copy_api(param);
    });
})