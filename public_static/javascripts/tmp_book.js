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

  return App.initWeb3();

  },

  initWeb3: function() {
    /*
     * Replace me...
     */

     // Is there an injected web3 instance?
    if (typeof web3 !== "undefined") {
      //Metamask 가 실행시 현 지갑을 리턴한다. 
      App.web3Provider = web3.currentProvider;
    } else {
      //만약 지정된 지갑이 없는 경우 미리 설정된 Ganeche 지갑을 리턴한다. 
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:9545"
      );
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    //Airport.json은 컴파일 시 나온 ABI JSON이다 여기에 기본 함수들이 표시가 된다. 
    //웹에서는 이 ABI JSON을 보고 실행을 할 수 있다.

    $.getJSON("../Airport.json", function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AirportArtifact = data;
      //미리 제공된 truffleContract 를 통해 Airport 인스턴스 생성
      App.contracts.Airport = TruffleContract(AirportArtifact);
      
      //지갑 설정
      App.contracts.Airport.setProvider(App.web3Provider);

      App.contracts.Airport.deployed()
      .then(function(instance) {
        console.log('222');
        airportInstance = instance;
        var countryId = parseInt($(event.target).data("id"));
        var userIdx = parseInt($('#userIdx').text());
        console.log('here !!! ');


        //countryId, account를 넣어서 chkBook 함수를 실행한다. 
        var result = airportInstance.setUserLevel(userIdx, userLevel, { from: account });
        console.log('result : ' + result);
        return result
      })
      .catch(function(err) {
        console.log(err.message);
      });


      // 이미 채택된 예약 정보가 있는 경우 함수를 호출해서 데이터 확인 후 업데이트 할수 있도록 한다. 
      return App.markAirport();
    });


    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-book', App.handleBook);
  },

  markAirport: function(users, account) {

    var airportInstance;

    App.contracts.Airport.deployed()
      .then(function(instance) {
        airportInstance = instance;
        
        //전체 Country 배열 주소를 리턴한다. 
        return airportInstance.getCountry.call();
      })
      .then(function(users) {
        //for 문 돌면서 book 만큼 버튼을 success 로 바꾸고 비활성화를 시킨다. 
        for (i = 0; i < users.length; i++) {
          if (users[i] !== "0x0000000000000000000000000000000000000000") {
            $(".panel-book")
              .eq(i)
              .find("button")
              .text("Success")
              .attr("disabled", true);
          }
        }
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  handleBook: function(event) {
     //기본 이벤트 블럭함
    event.preventDefault();

    //나라 아이디를 id 를 통해 쿼리해옴
    var countryId = parseInt($(event.target).data("id"));
    var userIdx = parseInt($('#userIdx').text());
    var airportInstance;
    
    console.log('countryId  : ' + countryId );
    console.log('userIdx  : ' + userIdx );


    //지갑상에 주소를 가져온다. 
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      //처음 주소를 가져온다. 
      var account = accounts[0];

      console.log('account : ' + account);

      App.contracts.Airport.deployed()
        .then(function(instance) {
          airportInstance = instance;
          console.log('where : ' + airportInstance);
          
          //countryId, account를 넣어서 chkBook 함수를 실행한다. 
          return airportInstance.chkBook(countryId, userIdx, { from: account });
        })
        .then(function(result) {
        //완료 된 후 success 버튼으로 변경...잘 안됨..
          return App.markAirport();
        })
        .catch(function(err) {
          console.log(err.message);
        });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});