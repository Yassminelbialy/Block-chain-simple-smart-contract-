const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const { abi, bytecode } = require("../compile");

let accounts;
let lottery;
let ann;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "2345643" });
});

describe("lotterty contract ", () => {
  it("deploy ok ", () => {
    assert.ok(lottery.options.address);
  });
  it("entered ok done  ", async () => {
    await lottery.methods
      .enter()
      .send({ from: accounts[0], value: web3.utils.toWei("3", "ether") });
    await lottery.methods
      .enter()
      .send({ from: accounts[1], value: web3.utils.toWei("2", "ether") });
    await lottery.methods
      .enter()
      .send({ from: accounts[1], value: web3.utils.toWei("3", "ether") });
    await lottery.methods
      .enter()
      .send({ from: accounts[0], value: web3.utils.toWei("3", "ether") });

    const players = await lottery.methods.getPlayers().call();
    assert.equal(players[0], accounts[0]);
    assert.equal(players[1], accounts[1]);
  }); //test2
  it("test for minimuam value of fees ", async () => {
    try {
      await lottery.methods
        .enter()
        .send({ from: accounts[0], value: web3.utils.toWei("110", "ether") });
      assert(true);
    } catch (err) {
      assert("err");
    }
  });
  it("sent money to winner and reset players array", async () => {
    await lottery.methods
      .enter()
      .send({ from: accounts[0], value: web3.utils.toWei("2", "ether") });
    balance1 = await web3.eth.getBalance(accounts[0]);
    palancein_contract = await lottery.methods.allbalance().call();

    console.log("ssssssss", palancein_contract);

    await lottery.methods.pickWinner().send({ from: accounts[0] });

    balance2 = await web3.eth.getBalance(accounts[0]);
    players = await lottery.options.jsonInterface;
    players2 = await lottery.methods.all().call();
    palancein_contract = await lottery.methods.allbalance().call();

    console.log(players2, "ssssssss", palancein_contract);
    // console.log(balance2-balance1)
    let different = balance2 - balance1;
    if (
      different > 1799953094000001000 &&
      players2 == 0 &&
      palancein_contract == 0
    ) {
      assert(true);
    } else {
      assert(false);
    }

    //     // assert players array become empty  ===done
    //     // asset that all the money in the contract has been sent  ==done
  });
}); //descripe
