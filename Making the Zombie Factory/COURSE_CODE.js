pragma solidity ^0.4.19; // version을 적어준다

//solidity 코드는 모두 contract 안에 들어간다!
contract ZombieFactory {

    
    event NewZombie(uint zombieId, string name, uint dna); //이벤트 생성 ; 앱의 사용자단에서 무언가 액션이 발생했을 때 communication
    uint dnaDigits = 16; //uint: unsigned int
    uint dnaModulus = 10 ** dnaDigits;
  
    //구조체 선언
    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies; //구조체 Zombie의 배열 선언

    function _createZombie(string _name, uint _dna) private {
        uint id = zombies.push(Zombie(_name, _dna)) - 1; //zombies.push()는 반환값으로 바뀐 배열의 길이를 가져온다. 이를 id에 저장한것
        NewZombie(id, _name, _dna); //event를 불러온다
    }
    
  // private 함수 & view 함수 선언
  // view 함수: solidity에서 상태를 변화시키지는 않지만 다른 값을 참조는 할 수 있는 함수
    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(_str)); //keccak256 : SHA3의 한 버전인 내장 해시 함수로, 입력 스트링을 랜덤 256비트 16진수로 배정하도록 한다.
        return rand % dnaModulus;
    }

    function createRandomZombie(string _name) public {
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }

}
