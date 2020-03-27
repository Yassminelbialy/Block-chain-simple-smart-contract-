// const assert = require('assert');
// const ganache = require('ganache-cli');
// const Web3 = require('web3');
// const web3 = new Web3(ganache.provider());

// const { abi, bytecode } = require('../compile');

// let accounts;
// let lottery;
// beforeEach(async () => {
//   // Get list of all accounts 
//   accounts = await web3.eth.getAccounts();
//   // Use one of the accounts to deploy the contract
//   lottery = await new web3.eth.Contract(abi)
//     .deploy({ data: bytecode })
//     .send({ from: accounts[0], gas: '1000000' });
// });

// describe('Lottery Contract', () => {
//   it('deploys a contract', () => {
//     assert.ok(lottery.options.address);
//   });

//   it('allows one account to enter', async () => {
//     await lottery.methods.enter().send({
//       from: accounts[0],
//       value: web3.utils.toWei('0.02', 'ether')
//     });

//     const players = await lottery.methods.getPlayers().call();

//     assert.equal(players[0], accounts[0]);
//     assert.equal(players.length, 1);
//   });

//   it('allows multiple accounts to enter', async () => {
//     await lottery.methods.enter().send({
//       from: accounts[0],
//       value: web3.utils.toWei('0.02', 'ether')
//     });

//     await lottery.methods.enter().send({
//       from: accounts[1],
//       value: web3.utils.toWei('0.02', 'ether')
//     });

//     await lottery.methods.enter().send({
//       from: accounts[2],
//       value: web3.utils.toWei('0.02', 'ether')
//     });

//     const players = await lottery.methods.getPlayers().call();

//     assert.equal(players[0], accounts[0]);
//     assert.equal(players[1], accounts[1]);
//     assert.equal(players[2], accounts[2]);
//     assert.equal(players.length, 3);
//   });

//   it('requires a minimum amount of ether to enter', async () => {
//     try {
//       await lottery.methods.enter().send({
//         from: accounts[0],
//         value: 0
//       });
//       assert(false);
//     } catch (err) {
//       assert(err);
//     }
//   });

//   it('only manager can call pickWinner', async () => {
//     try {
//       await lottery.methods.pickWinner().send({
//         from: accounts[1]
//       });
//       assert(false);
//     } catch (err) {
//       assert(err);
//     }
//   });

//   it('sends money to the winner and reset the players array', async () => {
//     await lottery.methods.enter().send({
//       from: accounts[0],
//       value: web3.utils.toWei('2', 'ether')
//     });

//     const initialBalance = await web3.eth.getBalance(accounts[0]);
//     console.log(initialBalance);
//     await lottery.methods.pickWinner().send({ from: accounts[0] });

//     const finalBalance = await web3.eth.getBalance(accounts[0]);
//     console.log(finalBalance)
//     const difference = finalBalance - initialBalance;

//     assert(difference > web3.utils.toWei('1.8', 'ether'));
//     // assert players array become empty
//     // asset that all the money in the contract has been sent  
//   });
// });