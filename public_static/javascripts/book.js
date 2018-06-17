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


      booksRow.append(bookTemplate.html());
    }
    
    for(i=0; i<booksRow[0].getElementsByClassName('country-level').length; i++){
  
    var country_level= booksRow[0].getElementsByClassName('country-level').item(i).textContent;
    
    if(country_level > userLevel){
        booksRow[0].getElementsByClassName('btn btn-default btn-book').item(i).disabled =true;
      }
    }
  
  });


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
  });

  $('#updateMyLevel').click(function () {
    var userIdx = parseInt($('#userIdx').text());
    var userLevel = parseInt($('#userLevel').text());
    var sender = $('#sender').text();

    $.post('/updateMyLevel', {userIdx : userIdx, userLevel : userLevel, sender : sender}, function (res) {
      alert("Update " + res);
    })
  });


})








