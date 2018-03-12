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
            var passwordAgain=$("input#passwordAgain").val();
          if(password==passwordAgain){
            $.ajax({
              url: serverUrl+"/users/register",
              type: "POST",
              data: {
                email: email,
                password: password
              },
              cache: false,
              success: function(xhr, data) {
                if(xhr.status == 'SUCCESS'){
                  toast('success', '', $.i18n.prop("success_register"), function() {
                    window.location.href = "signin.html";
                  });
                } else if(xhr.status == 'FAILED'){
                  var errStr;
                  if(xhr.errCode == '202'){
                    errStr = $.i18n.prop("err_emailnotavailable");
                  } else {
                    errStr = $.i18n.prop("err_servererror");
                  }
                  toast('error', '', errStr, null);
                } else {
                  toast('error', '', $.i18n.prop("err_servererror"), null);
                }
              },
              error: function() {
                // Fail message
                toast('error', '', $.i18n.prop("err_serverdisconnect"), null);
              },
            });
          }

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
}).blur(function() {
    var email = $("input#email").val();
    if(email==''){
        $("#emailHint").removeClass('text-danger');
        $("#emailHint").addClass('text-primary');
        $("#emailHint").text($.i18n.prop("signup_emailinput"));
    }
    else{
        $.ajax({
            url: serverUrl+"/users/checkEmail",
            type: "GET",
            data: {email: email},
            cache: false,
            success: function(xhr, data) {
                if(xhr.status == 'SUCCESS'){
                    $("#emailHint").removeClass('text-danger');
                    $("#emailHint").addClass('text-primary');
                    $("#emailHint").text($.i18n.prop("signup_emailavailable"));
                } else if(xhr.status == 'FAILED'){
                    if(xhr.errCode == '201') {
                        $("#emailHint").text($.i18n.prop("signup_emailerror"));
                    } else if(xhr.errCode == '202') {
                        $("#emailHint").removeClass('text-primary');
                        $("#emailHint").addClass('text-danger');
                        $("#emailHint").text($.i18n.prop("signup_emailnotavailable"));
                    }
                }
            }
        });
    }

});

$('#passwordAgain').focus(function() {
    //$('#passwordHint').html('请再次输入密码');
}).blur(function() {
    var password = $("input#password").val();
    var passwordAgain = $("input#passwordAgain").val();
  if(password != passwordAgain){
    $("#cpasswordHint").removeClass('text-danger');
    $("#cpasswordHint").addClass('text-primary');
    $("#cpasswordHint").text($.i18n.prop("signup_cpasswordmatch"));
  }
  else {
    $("#cpasswordHint").removeClass('text-danger');
    $("#cpasswordHint").addClass('text-primary');
    $("#cpasswordHint").text($.i18n.prop("signup_cpasswordcorrect"));
  }
});