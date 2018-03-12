$(function() {
    $("input").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            var email = $("input#email").val();
            var password = $("input#password").val();
            $.ajax({
                url: serverUrl+"/users/login",
                type: "POST",
                data: {
                    email: email,
                    password: password
                },
                cache: false,
                success: function(xhr, data) {
                    if(xhr.status == 'SUCCESS'){
                        if(xhr.data.role == 'ADMIN'){
                            window.location.href="../../home/index.html#/app/admin_users";
                        } else {
                            window.location.href="../../home/index.html";
                        }

                    } else if(xhr.status == 'FAILED'){
                        var errStr;
                        if(xhr.errCode == '203' || xhr.errCode == '201'){
                            errStr = $.i18n.prop("err_passworderror");
                        } else if(xhr.errCode == '204'){
                            errStr = $.i18n.prop("err_usernotexist");
                        } else if(xhr.errCode == '301'){
                            errStr = $.i18n.prop("err_userforbiden");
                        } else if(xhr.errCode == '400'){
                            errStr = $.i18n.prop("err_servererror");
                        } else {
                            errStr = $.i18n.prop("err_servererror");
                        }
                        toast('error', '', errStr, null);
                    } else {
                        toast('error', '', $.i18n.prop("err_servererror"), null);
                    }
                },
                error: function() {
                    toast('error', '', $.i18n.prop("err_serverdisconnect"), null);
                }
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#email').focus(function() {
    $('#response').html('');
});