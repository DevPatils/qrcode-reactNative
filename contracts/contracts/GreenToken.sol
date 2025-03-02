// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract GreenToken is ERC20, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    function airdrop(
        address[] calldata recipients,
        uint256 amount
    ) external onlyOwner {
        for (uint256 i = 0; i < recipients.length; i++) {
            _transfer(msg.sender, recipients[i], amount);
        }
    }

    function transfer(
        address to,
        uint256 amount
    ) public override returns (bool) {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        return super.transfer(to, amount);
    }

    function totalTokenSupply() public view returns (uint256) {
        return totalSupply();
    }
}
