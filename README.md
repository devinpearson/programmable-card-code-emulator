# Programmable Card Code Emulator
Write and test programmable card code in a safe environment.

## About
While exploring Programmable Banking Cards, I found it difficult to test my code. I wanted to be able to write code and test it in a safe environment. I also wanted to be able to share my code with others. This project is an attempt to solve these problems.

### Installation

The emulator is available as an npm package. To install it, run the following command:
```
npm i programmable-card-code-emulator
```

### Usage

Import the emulator into your code:
```
const emu = require("programmable-card-code-emulator");
```

Create a new transaction object:
```
const transaction = emu.createTransaction();
```

Run an emulation: 
```
const result = emu.run(transaction, code, environmentalVariables);
```

## Todo List

 * Additional tests for checking that lodash, fetch and moment are available.
 * Additional exception handling for malformed code, invalid env etc.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details