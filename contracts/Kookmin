pragma solidity ^0.4.18;

import "./EIP20Interface.sol";
//import "./SafeMath.sol";

contract qasToken is EIP20Interface {
    struct Question {
        uint id;
        address author;
        string title;
        string description;
        uint bounty;
    }

    struct Answer {
        uint id;
        uint question_id;
        address author;
        string title;
        uint choosedAnswerCounter;
        uint level;
        string description;
        bool choose;
    }

    uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (uint => Question) public questions;
    mapping (uint => Answer) public answers;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    /*
    senario
    We have [id, address] information.
    All users have metamask(or we provide wallet frontend).
    register question, choose answer.
    */

    string public name;                   //fancy name: eg Simon Bucks
    uint8 public decimals;                //How many decimals to show.
    string public symbol;                 //An identifier: eg SBX
    address public master; /*= 0x9CE08ACc22ad4ee411b0cfE0caE3421ACa5C32ca;*/
    uint questionCounter;
    uint answerCounter;


    uint public initial_amount =1000;
    uint public upvote_amount = 100;
  //  uint public initial_level = 1;
        event LogChooseAnswer(
        uint indexed _question_id,
        uint indexed _answer_id,
        address indexed _answer_author    );

    function qasToken(
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol
    ) public {
        balances[msg.sender] = 1000000;  // Creator initial tokens
        totalSupply = _initialAmount; // Update total supply
        name = _tokenName;  // Set the name for display purposes
        decimals = _decimalUnits;                            // Amount of decimals for display purposes
        symbol = _tokenSymbol;
        master = msg.sender;
                             // Set the symbol for display purposes
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender]= balances[msg.sender]-_value;
        balances[_to] = balances[_to]+_value;
        Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance >= _value);
        balances[_to] = balances[_to]+_value;
        balances[_from] = balances[_from]-_value;
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] = allowed[_from][msg.sender]-_value;
        }
        Transfer(_from, _to, _value);
        return true;
    }

    // value = money for the question
    function registQuestion(uint256 _value, string _title, string _description) public returns (bool success) {
        transfer(master, _value);
        questionCounter++;
        questions[questionCounter] = Question(
            questionCounter,
            msg.sender,
            _title,
            _description,
            _value
        );

        LogRegistQuestion(questionCounter, msg.sender, _title);
    }

    function registAnswer(uint256 _question_id, string _title, string _description, uint256 _choosedAnswerCounter, uint256 _level) public returns (bool success) {
        require(_question_id > 0 && _question_id <= questionCounter);
        answerCounter++;
        answers[answerCounter] = Answer(
            answerCounter,
            _question_id,
            msg.sender,
            _title,
            _choosedAnswerCounter,
            _level,
            _description,
            false
        );
        LogRegistAnswer(answerCounter, _question_id, msg.sender, _title, false);
    }

    function signIn(address _to) public returns (bool success) {
        if(msg.sender == master){
            transfer(_to, initial_amount);
                return true;
        } else {
            return false;
        }
    }
    function upVote(address _to, uint256 _value) public returns (bool success) {
        if(msg.sender == master){
            transfer(_to, upvote_amount);
            return true;
        } else {
            return false;
        }
    }

    function chooseAnswer(address _to, uint256 _answer_id, uint256 _value) public returns (bool success) {
        require(questionCounter > 0);
        require(answerCounter > 0);
        require(_answer_id > 0 && _answer_id <= answerCounter);
        Answer storage answer = answers[_answer_id];
        Question storage question = questions[answer.question_id];
        if(msg.sender == question.author){
        Transfer(msg.sender, _to, _value);
            return true;
        }
        else{
            return false;
        }
        LogChooseAnswer(question.id, answer.id, answer.author);
        answer.choosedAnswerCounter = answer.choosedAnswerCounter+1;
    }
    function rewardAnswer(uint _answer_id) payable public {
        require(questionCounter > 0);
        require(answerCounter > 0);

        Answer storage answer = answers[_answer_id];
        Question storage question = questions[answer.question_id];
        Transfer(question.author, answer.author, question.bounty);
        LogRewardAnswer(answer.id, answer.author, answer.choose, question.bounty);
    }
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }
    function donateToken(address _from, address _to, uint256 _value) public returns (bool success) {
        balances[_to] = balances[_to]+_value;
        balances[_from] = balances[_from]-_value;
        Transfer(_from, _to, _value);
        return true;
    }
    function levelUp(uint256 _answer_id) public returns (bool success){
        Answer storage answer = answers[_answer_id];
        if(answer.choosedAnswerCounter/10>0 && answer.choosedAnswerCounter<100){
            answer.level = answer.choosedAnswerCounter/10;
        }
    }
    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}