/* global artifacts contract it assert */

const Wall = artifacts.require('Wall');

const testTransactionHash = '0x03d7119b0dd26bcb3d3b02f3580a673dd81f79807cb2fdc0db912dd81a4bcb88';
const testContent = 'test_content';
const testAmount = 50;

contract('Wall', (accounts) => {
  it('should be deployable', () =>
    Wall.new().then(instance => assert.notStrictEqual(instance, true)));

  it('store invokes Store event', () =>
    Wall.deployed().then((wall) => {
      const filter = wall.Store();
      return wall.store(testContent).then(() => {
        const events = filter.get();
        assert.equal(events.length, 1);
        assert.equal(events[0].event, 'Store');
        assert.equal(events[0].args.account, accounts[0]);
        assert.equal(events[0].args.content, testContent);
      });
    }));

  it('like invokes Like event', () =>
    Wall.deployed().then(wall =>
      wall.store(testContent).then(() => {
        const filter = wall.Like();
        return wall.like(testTransactionHash, testAmount).then(() => {
          const events = filter.get();
          assert.equal(events.length, 1);
          assert.equal(events[0].event, 'Like');
          assert.equal(events[0].args.account, accounts[0]);
          assert.equal(events[0].args.transactionHash, testTransactionHash);
          assert.equal(events[0].args.amount, testAmount);
        });
      })));
});
