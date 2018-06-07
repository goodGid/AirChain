$(document).ready(function () {
  var curraccount;
  var selectedAccount;

  $.getJSON('../country.json', function(data) {
    var booksRow = $('#booksRow');
    var bookTemplate = $('#bookTemplate');

    for (i = 0; i < data.length; i ++) {
        bookTemplate.find('.panel-title').text(data[i].name);
        bookTemplate.find('img').attr('src', "/" + data[i].picture);
        bookTemplate.find('.country-level').text(data[i].level);
        bookTemplate.find('.btn-book').attr('data-id', data[i].id);
        bookTemplate.find('.btn-getCountryLevel').attr('data-id', data[i].id);

      booksRow.append(bookTemplate.html());
    }
  })

  $(document).on('click', '.btn-book' ,function(){        
    event.preventDefault();

    var countryId = parseInt($(event.target).data("id"));
    var userIdx = parseInt($('#userIdx').text());
    var sender = $('#sender').text();

    console.log('countryId : ' + countryId);

    $.post('/book', {countryId : countryId, userIdx : userIdx, sender : sender}, function (res) {
      alert("Booking " + res);
      return(res);
    });
  })

  $(document).on('click', '.btn-getCountryLevel' ,function(){        
    event.preventDefault();

    var countryId = parseInt($(event.target).data("id"));
    var sender = $('#sender').text();

    console.log('countryId : ' + countryId);

    $.post('/book', {countryId : countryId, sender : sender}, function (res) {
      alert("GetCountryLevel " + res);
      return(res);
    });
  })


   
  $('#updateMyLevel').click(function () {
    var userIdx = parseInt($('#userIdx').text());
    var userLevel = parseInt($('#userLevel').text());
    var sender = $('#sender').text();

    $.post('/updateMyLevel', {userIdx : userIdx, userLevel : userLevel, sender : sender}, function (res) {
      alert("Update " + res);
    })
  });


  $('#setCountryLevel').click(function () {
    var sender = $('#sender').text();

    $.post('/setCountryLevel', {sender : sender}, function (res) {
      alert("setCountryLevel " + res);
    })
  });


})








