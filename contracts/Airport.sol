pragma solidity ^0.4.17;

contract Airport {
    address[16] public country;
    uint[16] public userLevelList;

    mapping (uint => uint) public country_level;
    mapping (uint => uint) public user_level;


    function Airport() public {}

    function setCountryLevel(uint[16] countries) public returns (bool success)  {
        for(uint i = 0 ; i < 16; i++){
            country_level[i] = countries[i];
        }
        return true;
    }

    function setUserLevel(uint user_idx, uint _user_level) public returns (uint)  {
        require(user_idx >= 0 && user_idx <= 15);
        userLevelList[user_idx] = _user_level;
        return userLevelList[user_idx];
    }

    function getUserLevel(uint user_idx) view public returns (uint)  {
        return userLevelList[user_idx];
    }


    function chkBook(uint country_idx, uint user_idx) public returns (bool result) {
        require(country_idx >= 0 && country_idx <= 15);
        if( country_level[country_idx] <= user_level[user_idx] ){
            country[country_idx] = msg.sender;
            return true;
        }
        else{
            return false;
        }        
    }

    function getCountryLevel(uint country_idx) view public returns (uint) {
        uint tmp = country_level[country_idx];
        return tmp;
    }


}

