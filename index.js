window.userWalletAddress = null;
const loginButton = document.getElementById("loginButton");
const userWallet = document.getElementById("userWallet");

function toggleButton() {
    if (!window.ethereum) {
        loginButton.innerText = "MetaMask is not installed";
        loginButton.classList.remove("bg-purple-500", "text-white");
        loginButton.classList.add(
            "bg-gray-500",
            "text-gray-100",
            "cursor-not-allowed"
        );
        return false;
    }

    loginButton.addEventListener("click", loginWithMetaMask);
}

async function loginWithMetaMask() {
    const accounts = await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .catch((e) => {
            console.error(e.message);
            return;
        });
    if (!accounts) {
        return;
    }

    document.getElementById("userWallet").innerHTML = "Wallet Address: " + ethereum.selectedAddress;

    loginButton.innerText = "Sign out of MetaMask";

    loginButton.removeEventListener("click", loginWithMetaMask);
    setTimeout(() => {
        loginButton.addEventListener("click", signOutOfMetaMask);
    }, 200);
}

function signOutOfMetaMask() {
    window.userWalletAddress = null;
    document.getElementById("userWallet").innerHTML = "Wallet Address: ";
    loginButton.innerText = "Sign in with MetaMask";

    loginButton.removeEventListener("click", signOutOfMetaMask);
    setTimeout(() => {
        loginButton.addEventListener("click", loginWithMetaMask);
    }, 200);
}

window.addEventListener("DOMContentLoaded", () => {
    toggleButton();
});

// function loadBalance() {
//     var balance, balanceETH;
//     try {
//         balance = web3.eth.getBalance(ethereum.selectedAddress, function (error) {
//             if (!error) {
//                 balanceETH = web3.utils.fromWei(balance);
//                 document.getElementById("output").innerHTML = balanceETH + " ETH";
//             }
//         });

//     } catch (error) {
//         document.getElementById("output").innerHTML = error;
//     }
// }

const Web3 = require("web3");

var contract;

$(document).ready(function() {
    web3 = new Web3(web3.currentProvider);

    var address = 0xe9ca2Ec407d686147e69a081aa7740EAeEe9C7ac;
    var abi = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amountToDeposit",
                    "type": "uint256"
                }
            ],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract StableCoinToken",
                    "name": "_token",
                    "type": "address"
                },
                {
                    "internalType": "contract PriceConsumerV3",
                    "name": "_oracle",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "collateralDeposited",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amountMinted",
                    "type": "uint256"
                }
            ],
            "name": "Deposit",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_oracle",
                    "type": "address"
                }
            ],
            "name": "setOracle",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "repaymentAmount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "collateralWithdrawn",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amountBurned",
                    "type": "uint256"
                }
            ],
            "name": "Withdraw",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "repaymentAmount",
                    "type": "uint256"
                }
            ],
            "name": "estimateCollateralAmount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "collateralAmount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "depositAmount",
                    "type": "uint256"
                }
            ],
            "name": "estimateTokenAmount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getEthUSDPrice",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getOracle",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getToken",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                }
            ],
            "name": "getVault",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "collateralAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "debtAmount",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct IVault.Vault",
                    "name": "vault",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "token",
            "outputs": [
                {
                    "internalType": "contract StableCoinToken",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    contract = new web3.eth.Contract(abi, address);

    $('#balance').click(function() {

        return contract.methods.getBalance()

    })
    

    $('#deposit').click(function() {

        var amt = 0;
        amt = parseInt($('#depositAmount').val());

        web3.eth.getAccounts().then(function(accounts) {

            var acc = accounts[0];
            return contract.methods.deposit(amt);

        }).then(function(tx) {

            console.log(tx);

        }).catch(function(tx){

            console.log(tx);

        })

    })

    $('#withdraw').click(function() {

        var amt = 0;
        amt = parseInt($('#withdrawAmount').val());

        web3.eth.getAccounts().then(function(accounts) {

            var acc = accounts[0];
            return contract.methods.withdraw(amt);

        }).then(function(tx) {

            console.log(tx);

        }).catch(function(tx){

            console.log(tx);

        })

    })

});