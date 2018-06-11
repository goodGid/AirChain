App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.country-name'). text(data[i].breed);
        petTemplate.find('.country-level').text(data[i].age);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
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
        "http://localhost:7545"
      );
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */


     /*
    Adoption.JSON 형태 
    {
    "contractName": "Adoption",
    "abi": [
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "adopters",
       ...............
    */
    //Adoption 은 컴파일 시 나온 ABI JSON이다 여기에 기본 함수들이 표시가 된다. 
    //웹에서는 이 ABI JSON을 보고 실행을 할 수 있다.
    $.getJSON("Adoption.json", function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      //미리 제공된 truffleContract 를 통해 Adoption 인스턴스 생성
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
      
      //지갑 설정
      App.contracts.Adoption.setProvider(App.web3Provider);

      //
      // 이미 채택된 애완 동물이 있는 경우 함수를 호출해서 데이터 확인 후 업데이트 할수 있도록 한다. 
      return App.markAdopted();
    });


    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */

    var adoptionInstance;

    App.contracts.Adoption.deployed()
      .then(function(instance) {
        adoptionInstance = instance;
        
        //전체 adopte 배열 주소를 리턴한다. 
        return adoptionInstance.getAdopters.call();
      })
      .then(function(adopters) {
        //for 문 돌면서 adopte 만큼 버튼을 success 로 바꾸고 비활성화를 시킨다. 
        for (i = 0; i < adopters.length; i++) {
          if (adopters[i] !== "0x0000000000000000000000000000000000000000") {
            $(".panel-pet")
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

  handleAdopt: function(event) {
     //기본 이벤트 블럭함
    event.preventDefault();

    //펫 아이디를 id 를 통해 쿼리해옴
    var petId = parseInt($(event.target).data("id"));

    var adoptionInstance;
    
    //지갑상에 주소를 가져온다. 
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      //처음 주소를 가져온다. 
      var account = accounts[0];

      
      App.contracts.Adoption.deployed()
        .then(function(instance) {
          adoptionInstance = instance;
          
          
          //petId, account를 넣어서 adopt 함수를 실행한다. 
          return adoptionInstance.adopt(petId, { from: account });
        })
        .then(function(result) {
        //완료 된 후 success 버튼으로 변경...잘 안됨..
          return App.markAdopted();
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