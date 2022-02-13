pragma solidity ^0.7.4;
import "./ERIS.sol";

contract ErisTreasury is Ownable {
  uint private constant FACTOR_DECIMAL = 7;
  uint private constant rebaseFactor = 3958; // when using this factor, should consider this value as 0.0003958 = 3958 / 10**FACTOR_DECIMAL
  uint private rebaseInterval = 1800; // 30 minutes
  uint256 private lastRebaseTime;
  uint256 private erisBirthday;
  uint256 epoch;
  ERIS public erisToken;

  event LogRebase(uint256 indexed epoch, uint256 totalSupply);

  constructor() {
    erisBirthday = block.timestamp;
    lastRebaseTime = 0;
    epoch = 0;
  }

  function receive() external payable {

  }
  
  function setTargetToken(address payable tokenAddr) external onlyOwner {
    erisToken = ERIS(tokenAddr);
    _withdraw(100000000*(10**18));
  }

  function rebase() external onlyOwner returns (uint256) {
    // precheck
    require(address(erisToken) != address(0), "Target token has not set.");
    // caculate supply delta and feed it to eris token
    uint256 totalSupply = erisToken.totalSupply();
    uint256 supplyDelta = totalSupply/(10**FACTOR_DECIMAL)*(rebaseFactor);
    uint256 supplyAfterRebase = erisToken.rebase(epoch, int256(supplyDelta));

    uint256 curTime = block.timestamp - erisBirthday;
    lastRebaseTime = curTime - (curTime % rebaseInterval);
    epoch = epoch + 1;
    emit LogRebase(epoch, supplyAfterRebase);
    return supplyAfterRebase;
  }

  function getRemainTimeToRebase() external view returns(uint256) {
    uint256 curTime = block.timestamp - erisBirthday;
    return rebaseInterval - ((curTime - lastRebaseTime) % rebaseInterval);
  }
  
  function withdraw(uint256 amount) public onlyOwner {
    _withdraw(amount);
  }
  
  function _withdraw(uint256 amount) internal {
    erisToken.transfer(msg.sender, amount);
  }
}