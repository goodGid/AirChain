$(document).ready(function () {
  var curraccount;
  var selectedAccount;

  $.getJSON('../country.json', function(data) {
    var booksRow = $('#booksRow');
    var bookTemplate = $('#bookTemplate');
    var userLevel = parseInt($('#userLevel').text());
    console.log(userLevel);
    for (i = 0; i < data.length; i ++) {
        bookTemplate.find('.panel-title').text(data[i].name);
        bookTemplate.find('img').attr('src', "/" + data[i].picture);
        bookTemplate.find('.country-level').text(data[i].level);
        bookTemplate.find('.btn-book').attr('data-id', data[i].id);
        bookTemplate.find('.btn-getCountryLevel').attr('data-id', data[i].id);
        console.log(data[i].level);
        if(userLevel < data[i].level){
          a.prop("disabled", true);
        }
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
      
      if(res == "Success"){
        var btn = document.getElementById("book");
        console.log(btn);
        btn.disabled = true;
      }
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


})








