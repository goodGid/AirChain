pragma solidity ^0.4.17;

contract Airport {
    address[16] public country;

    mapping (uint256 => uint256) public country_level;

    function chkBook(uint country_idx, uint user_level) public returns (bool) {
        require(country_idx >= 0 && country_idx <= 15);
        if( country_level[country_idx] <= user_level ){
            return true;
        }
        else{
            return false;
        }
    }

    function getAdopters() public view returns (address[16]) {
        return adopters;
    }
}

