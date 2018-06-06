App = {
    init: function() {

        // Load Books.
      $.getJSON('../country.json', function(data) {
        var booksRow = $('#booksRow');
        var bookTemplate = $('#bookTemplate');
  
        for (i = 0; i < data.length; i ++) {
            bookTemplate.find('.panel-title').text(data[i].name);
            bookTemplate.find('img').attr('src', data[i].picture);
            bookTemplate.find('.country-level').text(data[i].level);
            bookTemplate.find('.btn-book').attr('data-id', data[i].id);
  
          booksRow.append(bookTemplate.html());
        }
      });
  
    //   return App.initWeb3();
    }
};
  
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  