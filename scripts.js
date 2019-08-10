$( function() {
  var dialog, form,

    name = $( "#name" ),
    email = $( "#email" ),
    password = $( "#password" ),
    datepicker=$("#datepicker"),
    allFields = $( [] ).add( name ).add( email ).add( password ).add(datepicker);

  function checkLength( input, min, max ) {
    if ( input.val().length > max || input.val().length < min ) {
      input.addClass( "ui-state-error" );
      return false;
    } else {
      return true;
    }
  }

  
  function addUser() {
    var valid = true;
    allFields.removeClass( "ui-state-error" );

    valid = valid && checkLength( name,  3, 16 );
    valid = valid && checkLength( email, 6, 80 );
    valid = valid && checkLength( password, 5, 16 );
    valid = valid && checkLength( datepicker, 10);

    if ( valid ) {
      $( "#users tbody" ).append( "<tr>" +
        "<td>" + name.val() + "</td>" +
        "<td>" + email.val() + "</td>" +
        "<td>" + password.val() + "</td>" +
        "<td>" + datepicker.val() + "</td>" + 
      "</tr>" );
      dialog.dialog( "close" );
    }
    return valid;
  }
  
    $( "#datepicker" ).datepicker();
  
  

  dialog = $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
      "Create an account": addUser,
      Cancel: function() {
        dialog.dialog( "close" );
      }
    },
    close: function() {
      form[ 0 ].reset();
      allFields.removeClass( "ui-state-error" );
    }
  });

  form = dialog.find( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    addUser();
  });

  $( "#create-user" ).button().on( "click", function() {
    dialog.dialog( "open" );
  });
} );

