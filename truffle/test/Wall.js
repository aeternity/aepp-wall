/* global artifacts contract it assert */

const Wall = artifacts.require('Wall');

const testContent = 'test_content';
const testAmount = 50;

contract('Wall', (accounts) => {
  it('should be deployable', () =>
    Wall.new().then(instance => assert.notStrictEqual(instance, true)));

  it('store', () =>
    Wall.deployed().then(wall =>
      wall.store(testContent).then(() => Promise.all([
        wall.recordCount().then(count => assert.equal(count, 1)),
        wall.records(0).then(([account, content]) => {
          assert.equal(account, accounts[0]);
          assert.equal(content, testContent);
        }),
      ]))));

  it('like', () =>
    Wall.deployed().then(wall =>
      wall.store(testContent)
        .then(() => wall.like(0, testAmount))
        .then(() => Promise.all([
          wall.recordLikeCount(0).then(count => assert.equal(count, 1)),
          wall.recordLike(0, 0).then(([account, amount]) => {
            assert.equal(account, accounts[0]);
            assert.equal(amount, testAmount);
          }),
        ]))));
});
