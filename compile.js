const path = require('path');
const fs = require('fs');
const solc = require('solc');
const fileName = 'Lottery.sol';
const lotteryPath = path.resolve(__dirname, 'contracts', fileName);
const source = fs.readFileSync(lotteryPath, 'utf8');


const input = {
  language: 'Solidity',
  sources: {
    [fileName]: {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', "evm.bytecode"]
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output)
module.exports = {
  abi: output.contracts[fileName]['Lottery'].abi,
  bytecode: output.contracts[fileName]['Lottery'].evm.bytecode.object
};