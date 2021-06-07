'use strict';

require('chai').should();

const mocks = require('./mocks');
const _ = require('../index.js');

describe('Collections', function () {

  var called = false;

  afterEach(function () {
    delete mocks.obj.constructor.prototype.foo;
  });

  describe('each', function () {

    afterEach(function () {
      called = false;
    });

    it('should iterate over an array', function () {
      _.each(mocks.arr, function (el, i, arr) {
        (typeof i).should.equal('number');
        arr[i].should.equal(el);
        called = true;
      });
      called.should.be.true;
    });

    it('should iterate over an object', function () {
      _.each(mocks.obj, function (val, key, obj) {
        obj[key].should.equal(val);
        called = true;
      });
      called.should.be.true;
    });

    it('should ignore the object prototype', function () {
      mocks.obj.constructor.prototype.foo = 'foo';
      _.each(mocks.obj, function (val, key, obj) {
        Object.prototype.hasOwnProperty.call(obj, key).should.be.true;
        called = true;
      });
      called.should.be.true;
    });

    it('should access the original collection', function () {
      _.each(mocks.arr, function (el, i, arr) {
        arr.should.equal(mocks.arr);
        called = true;
      });
      called.should.be.true;
      called = false;
      _.each(mocks.obj, function (val, key, obj) {
        obj.should.equal(mocks.obj);
        called = true;
      });
      called.should.be.true;
    });

    it('should bind to context if one is passed', function () {
      _.each(mocks.arr, function () {
        this.should.equal(mocks.obj);
        called = true;
      }, mocks.obj);
      called.should.be.true;
      called = false;
      _.each(mocks.obj, function () {
        this.should.equal(mocks.arr);
        called = true;
      }, mocks.arr);
      called.should.be.true;
    });

    it('should return the collection', function () {
      _.each(mocks.arr, function () { }).should.equal(mocks.arr);
      _.each(mocks.obj, function () { }).should.equal(mocks.obj);
    });

  });

  describe('reduce', function () {

    afterEach(function () {
      called = false;
    });

    it('should be able to reduce a collection to a single value', function () {
      _.reduce(mocks.arr, function (accumulator, el, i, arr) {
        arr[i].should.equal(el);
        return accumulator.toString() + el.toString();
      }).should.equal(mocks.stringifiedArrElms);
      _.reduce(mocks.obj, function (accumulator, val, key, obj) {
        obj[key].should.equal(val);
        return accumulator.toString() + val.toString();
      }).should.equal(mocks.stringifiedObjValues);
    });

    it('should support initial state', function () {
      _.reduce(mocks.arr, function (accumulator, el) {
        return accumulator + el.toString();
      }, 'init').should.equal('init' + mocks.stringifiedArrElms);
      _.reduce(mocks.obj, function (accumulator, val) {
        return accumulator + val.toString();
      }, 'init').should.equal('init' + mocks.stringifiedObjValues);
    });

    it('should ignore the object prototype', function () {
      mocks.obj.constructor.prototype.foo = 'foo';
      _.reduce(mocks.obj, function (accumulator, val, key, obj) {
        Object.prototype.hasOwnProperty.call(obj, key).should.be.true;
        called = true;
        return accumulator;
      });
      called.should.be.true;
    });

    it('should access the original collection', function () {
      _.reduce(mocks.arr, function (accumulator, el, i, arr) {
        arr.should.equal(mocks.arr);
        called = true;
      });
      called.should.be.true;
      called = false;
      _.reduce(mocks.obj, function (accumulator, val, key, obj) {
        obj.should.equal(mocks.obj);
        called = true;
      });
      called.should.be.true;
    });

    it('should bind to context if one is passed', function () {
      _.reduce(mocks.arr, function () {
        this.should.equal(mocks.obj);
        called = true;
      }, null, mocks.obj);
      called.should.be.true;
      called = false;
      _.reduce(mocks.obj, function () {
        this.should.equal(mocks.arr);
        called = true;
      }, null, mocks.arr);
      called.should.be.true;
    });

  });

});

describe('Functions', function () {

  var called;

  beforeEach(function () {
    called = 0;
  });

  describe('bind', function () {

    it('should bind a function to an object', function () {
      var bound = _.bind(function () {
        called++;
        this.should.equal(mocks.obj);
      }, mocks.obj);
      bound();
      called.should.equal(1);
    });

    it('should correctly pass the arguments', function () {
      var bound = _.bind(function () {
        called++;
        arguments[0].should.equal(mocks.arr);
        arguments[1].should.equal(mocks.obj);
      });
      bound(mocks.arr, mocks.obj);
      called.should.equal(1);
    });

    it('should return the result of calling the input function', function () {
      var bound = _.bind(function () {
        called++;
        return true;
      });
      bound().should.equal(true);
      called.should.equal(1);
    });

  });

  describe('memoize', function () {

    it('should cache already computed results', function () {
      var memoized = _.memoize(function (string) {
        called++;
        return mocks.reverseString(string);
      });
      memoized(mocks.string).should.equal(mocks.reversedString);
      memoized(mocks.string).should.equal(mocks.reversedString);
      called.should.equal(1);
    });

    it('should recompute when called with different arguments', function () {
      var memoized = _.memoize(function (string) {
        called++;
        return mocks.reverseString(string);
      });
      memoized(mocks.string).should.equal(mocks.reversedString);
      memoized(mocks.reversedString).should.equal(mocks.string);
      called.should.equal(2);
    });

  });

});

describe('Classes', function () {

  it('an instance should have the class properties', function () {
    Object.prototype.hasOwnProperty.call(_.underCollections, 'libraryDesc').should.be.true;
    _.underCollections.libraryDesc.should.equal('collections');
  });

  it('an instance should have access to the class methods', function () {
    Object.prototype.hasOwnProperty.call(_.underCollections, 'each').should.be.false;
    Object.prototype.hasOwnProperty.call(_.underCollections.__proto__, 'each').should.be.true;
    _.underCollections.each.should.equal(_.each);
    Object.prototype.hasOwnProperty.call(_.underCollections, 'reduce').should.be.false;
    _.underCollections.reduce.should.equal(_.reduce);
    Object.prototype.hasOwnProperty.call(_.underCollections.__proto__, 'reduce').should.be.true;
  });

  it('a sub-class instance should have the class and sub-class properties', function () {
    Object.prototype.hasOwnProperty.call(_.underFunctions, 'libraryDesc').should.be.true;
    _.underFunctions.libraryDesc.should.equal('functions');
  });

  it('a sub-class instance should have access to the class and sub-class methods', function () {
    Object.prototype.hasOwnProperty.call(_.underCollections, 'each').should.be.false;
    Object.prototype.hasOwnProperty.call(_.underCollections.__proto__, 'each').should.be.true;
    _.underFunctions.each.should.equal(_.each);
    Object.prototype.hasOwnProperty.call(_.underCollections, 'reduce').should.be.false;
    Object.prototype.hasOwnProperty.call(_.underCollections.__proto__, 'reduce').should.be.true;
    _.underFunctions.reduce.should.equal(_.reduce);
    Object.prototype.hasOwnProperty.call(_.underCollections, 'bind').should.be.false;
    Object.prototype.hasOwnProperty.call(_.underFunctions.__proto__, 'bind').should.be.true;
    _.underFunctions.bind.should.equal(_.bind);
    Object.prototype.hasOwnProperty.call(_.underCollections, 'memoize').should.be.false;
    Object.prototype.hasOwnProperty.call(_.underFunctions.__proto__, 'memoize').should.be.true;
    _.underFunctions.memoize.should.equal(_.memoize);
    Object.prototype.hasOwnProperty.call(_.underCollections.__proto__, 'bind').should.be.false;
    Object.prototype.hasOwnProperty.call(_.underCollections.__proto__, 'memoize').should.be.false;
    Object.prototype.hasOwnProperty.call(_.underFunctions.__proto__, 'each').should.be.false;
    Object.prototype.hasOwnProperty.call(_.underFunctions.__proto__, 'reduce').should.be.false;
    Object.prototype.hasOwnProperty.call(_.underFunctions.__proto__, 'libraryDesc').should.be.false;
  });

});
