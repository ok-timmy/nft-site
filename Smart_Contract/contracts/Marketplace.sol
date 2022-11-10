// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    address payable public immutable feeAccount; //The account that receives the fee
    uint public feePercent; // the percentage on sales
    uint public itemCount;

    struct NFTItem {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
    }

    event offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );

    event NFTPurchased(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    mapping(uint => NFTItem) public items;

    constructor(uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    function makeItem(
        IERC721 _nft,
        uint _tokenId,
        uint _price
    ) external nonReentrant {
        require(_price > 0, "Price Must be greater than 0");
        itemCount++;
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        items[itemCount] = NFTItem(
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );
        emit offered(itemCount, address(_nft), _tokenId, _price, msg.sender);
    }

    function buyItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        NFTItem storage item = items[_itemId];
        //Check that item ID is valid
        require(
            _itemId > 0 && _itemId == itemCount,
            "The Item You want to purchase does not exist"
        );
        require(
            msg.value >= _totalPrice,
            "You do not have enough ether to cover item price and market fee"
        );
        require(!item.sold, "Item already Sold");
        //Pay seller
        item.seller.transfer(item.price);
        feeAccount.transfer(_totalPrice - item.price);

        //Update nft status
        item.sold = true;
        //Transfer nft to buyer
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        // emit the NFTPurchase event
        emit NFTPurchased(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }

    function getTotalPrice(uint _itemId) public view returns (uint) {
        return ((items[_itemId].price * (100 + feePercent)) / 100);
    }
}
