# Æternity wall app

The wall app lets users interact with the corresponding wall smart contract,
which stores the messages that are displayed by the app.

## Architecture

```
 --------    Messages    --------    Messages    ---------
| Client | <----------> | Server | <----------> | MongoDB |
 --------                --------                ---------
    ^                        ^
		|												 | Events
		v										----------
 --------				-----> | Ethereum |
| Wallet |<----/				----------
 --------														
```

## Getting started

As the diagram shows, in order to run this you need access to a mongodb instance
and an ethereum node that exposes its websocket/rest interface. The included
`docker-compose.yml` describes all the services needed.

### Run the server
```bash
$ MONGODB_URI=mongodb://localhost:27017/wall PORT=3003 npm run dev-server
```

### Run the client side dev server
```bash
$ npm run dev
```

### Run smart contract tests
```bash
$ cd contract/ && truffle test
```


## Structure

In `src/config/index.js`
```
 .
 ├── contract      # smart contract
 │   ├── contracts # solidity files
 │   └── test      # javascript tests
 ├── parity        # files for the ethereum node docker image
 ├── server        # API server
 │   ├── config    # holds config values that are used both on server and client
 │   ├── errors    # errors returned by the server
 │   ├── lib
 │   │   ├── database.js     # sets up mongoose connection
 │   │   ├── etherscanApi.js # sets up etherscan API which is used for block lookup
 │   │   ├── wallContract.js # sets up smart contract using values from config directory
 │   │   ├── watcher.js      # uses the web3 instance to subscribe to all events emitted by the wall contract
 │   │   └── web3.js         # set up a web3 instance which subscribes to the ethereum websocket API
 │   ├── models    # Mongoose schema defitions 
 │   ├── routes
 │   └── server.js
 └── src # front-end Vue.js app
     ├── App.js
     ├── App.vue
     ├── components
     ├── lib
     │   └── wallContract.js # load contract ABI and provide the app with a contract instance
     └── main.js
```
