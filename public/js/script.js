$(document).ready(function(){
  $('.modal').modal();
  $('#signUpModal').modal('open');
  $('#loginModal').modal('open');

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    format: 'dd-mm-yyyy',
    firstDay: 'Monday',
  });

  $('input.autocomplete').autocomplete({
    data: {
      "Apple": null,
      "Microsoft": null,
      "Google": 'http://placehold.it/250x250'
    },
    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function(val) {
      // Callback function when value is autcompleted.
    },
    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
  });


});
