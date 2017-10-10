#!/bin/sh

/parity/parity --chain "${CHAIN}" --db-path /opt/db --jsonrpc-interface all --jsonrpc-apis web3,eth,pubsub --jsonrpc-hosts all --ws-interface all --ws-apis web3,eth,pubsub --ws-hosts all --no-ui --no-ipc --no-dapps --no-secretstore --pruning fast
