
  App = {
    web3Provider: null,
    contracts: {},
  
  
    init: function() {
  
      // Load Books.
    $.getJSON('../country.json', function(data) {
      var booksRow = $('#booksRow');
      var bookTemplate = $('#bookTemplate');
  
      for (i = 0; i < data.length; i ++) {
          bookTemplate.find('.panel-title').text(data[i].name);
          bookTemplate.find('img').attr('src', "/" + data[i].picture);
          bookTemplate.find('.country-level').text(data[i].level);
          bookTemplate.find('.btn-book').attr('data-id', data[i].id);
  
        booksRow.append(bookTemplate.html());
      }
    });
  
    return App.bindEvents();
    },
  
    bindEvents: function() {
      console.log('bindEvents');
      $(document).on('click', '.btn-book', App.handleBook);
    },
  
    
    handleBook: function(event) {
       //기본 이벤트 블럭함
      event.preventDefault();


    
      var countryId = parseInt($(event.target).data("id"));
      var userIdx = parseInt($('#userIdx').text());
      var sender = $('#sender').text();


      console.log('countryId  : ' + countryId );
      console.log('userIdx  : ' + userIdx );
      console.log('sender  : ' + sender );

      $.post('/book', {countryId : countryId, userIdx : userIdx, sender : sender}, function (res) {
        console.log('[js -> book] res : ' + res);
        return(res);
      });
    }
  };

$(function() {
  $(window).load(function() {
    App.init();
  });
});

