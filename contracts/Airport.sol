pragma solidity ^0.4.17;

contract Airport {
    address[16] public country;

    mapping (uint256 => uint256) public country_level;
    mapping (uint256 => uint256) public user_level;


    function Airport() public {}

    function setCountryLevel(uint256 country_idx, uint256 _country_level) public returns (bool success)  {
        require(country_idx >= 0 && country_idx <= 15);
        country_level[country_idx] = _country_level;
        return true;
    }

    function setUserLevel(uint256 user_idx, uint256 _user_level) public returns (bool success)  {
        require(user_idx >= 0 && user_idx <= 15);
        user_level[user_idx] = _user_level;
        return true;
    }


    function chkBook(uint256 country_idx, uint256 user_idx) public returns (bool result) {
        require(country_idx >= 0 && country_idx <= 15);
        if( country_level[country_idx] <= user_idx ){
            country[country_idx] = msg.sender;
            return true;
        }
        else{
            return false;
        }        
    }

    function getCountry() public view returns (address[16]) {
        return country;
    }


}

