

function chk_bookLevel(){
  var userLevel = parseInt($('#userLevel').text());
  var length = $('#booksRow > div').length;

  for(i=1; i<=length; i++ ){
    let value = $('#booksRow > div:nth-child(' + i + ') > div > div.panel-body > span').text();

    if( userLevel < value ){
      let btn = $('#booksRow > div:nth-child(' + i + ') > div > div.panel-body > button');
      // btn.prop("disabled", true); // 이것도 가능 
      btn.attr("disabled","disabled"); 
    }
  }
}


$(document).ready(function () {
  var curraccount;
  var selectedAccount;

  $.getJSON('../country.json', function(data) {
    var booksRow = $('#booksRow');
    var bookTemplate = $('#bookTemplate');
    var userLevel = parseInt($('#userLevel').text());

    for (i = 0; i < data.length; i ++) {
        bookTemplate.find('.panel-title').text(data[i].name);
        bookTemplate.find('img').attr('src', "/" + data[i].picture);
        bookTemplate.find('.country-level').text(data[i].level);
        bookTemplate.find('.btn-book').attr('data-id', data[i].id);
        bookTemplate.find('.btn-getCountryLevel').attr('data-id', data[i].id);

      booksRow.append(bookTemplate.html());
    }

    // 1st 방법
    // chk_bookLevel();  // 함수 사용
    
    // 2st 방법
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
    
    $.post('/book', {countryId : countryId, userIdx : userIdx, sender : sender}, function (res) {
      alert("Booking " + res);
      
      if(res == "Success"){
        var btn = document.getElementById("book");
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








