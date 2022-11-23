import { memoize } from './memoization';
import { expect } from 'chai';
import FakeTimers from '@sinonjs/fake-timers';

// hint: use https://sinonjs.org/releases/v6.1.5/fake-timers/ for timeouts

//setting the current time to 0
const clock = FakeTimers.install();

describe('memoization', function () {

  it('should memoize function for STRING', async () => {
    let returnValue = 5;
    const testFunction = (argsTest: any) => returnValue;

    const memoized = memoize(testFunction, (key) => key, 1000);
    expect(memoized('c544d3ae-a72d-4755-8ce5-d25db415b776')).to.equal(5);

    returnValue = 10;
    expect(memoized('c544d3ae-a72d-4755-8ce5-d25db415b776')).to.equal(5);
  })

  it('should memoize function for NUMBERS', () => {
    let returnValue = 5;
    const testFunction = (argsTest: any) => returnValue;

    const memoized = memoize(testFunction, (key) => key, 1000);
    expect(memoized(1999)).to.equal(5);

    returnValue = 10;
    expect(memoized(1999)).to.equal(5);
  })

  it('should memoize function for DATES', () => {
    let returnValue = 5;
    const testFunction = (argsTest: any) => returnValue;

    const memoized = memoize(testFunction, (key) => key, 1000);
    expect(memoized(new Date("2002-05-05"))).to.equal(5);

    returnValue = 10;
    expect(memoized(new Date("2002-05-05"))).to.equal(5);
  })

  it('should memoize function for TUPLE', () => {
    let returnValue = 5;
    let tuple: [number, boolean, string];
    tuple = [10, true, 'TypeScript'];
    const testFunction = (argsTest: any) => returnValue;

    const memoized = memoize(testFunction, (key) => key, 1000);
    expect(memoized(tuple)).to.equal(5);

    returnValue = 10;
    expect(memoized(tuple)).to.equal(5);
  })

  it('should memoize function for BOOLEAN', () => {
    let returnValue = 5;
    const testFunction = (argsTest: any) => returnValue;

    const memoized = memoize(testFunction, (key) => key, 1000);
    expect(memoized(false)).to.equal(5);

    returnValue = 10;
    expect(memoized(false)).to.equal(5);
  })

  it('should memoize function for OBJECT', () => {
    let returnValue = 5;
    const car: { type: string, model: string, year: number } = {
      type: "Toyota",
      model: "Corolla",
      year: 2009
    };
    const testFunction = (argsTest: any) => returnValue;

    const memoized = memoize(testFunction, (key) => key, 1000);
    expect(memoized(car)).to.equal(5);
    returnValue = 10;

    expect(memoized(car)).to.equal(5);
  })

  it('after 1000ms value is not valid, original function should be called again, test for memoizing STRING', async () => {
    let returnValue = 5;
    const testFunction = (argsTest: any) => returnValue;
    const memoized = memoize(testFunction, (key) => key, 1000);

    expect(memoized('string to test')).to.equal(5);
    returnValue = 10;
    expect(memoized('string to test')).to.equal(5);

    clock.tick(2000);
    await Promise.resolve();

    returnValue = 15;
    expect(memoized('string to test')).to.not.equal(5);
  });

  it('after 1000ms value is not valid, original function should be called again, test for memoizing NUMBER', async () => {
    let returnValue = 5;
    const testFunction = (argsTest: any) => returnValue;
    const memoized = memoize(testFunction, (key) => key, 1000);

    expect(memoized(1999)).to.equal(5);
    returnValue = 10;
    expect(memoized(1999)).to.equal(5);

    clock.tick(2000);
    await Promise.resolve();

    returnValue = 15;
    expect(memoized(1999)).to.not.equal(5);
  });

  it('after 1000ms value is not valid, original function should be called again, test for memoizing DATE', async () => {
    let returnValue = 5;
    const testFunction = (argsTest: any) => returnValue;
    const memoized = memoize(testFunction, (key) => key, 1000);

    expect(memoized(new Date("2002-05-05"))).to.equal(5);
    returnValue = 10;
    expect(memoized(new Date("2002-05-05"))).to.equal(5);

    clock.tick(2000);
    await Promise.resolve();

    returnValue = 15;
    expect(memoized(new Date("2002-05-05"))).to.not.equal(5);
  });

  it('after 1000ms value is not valid, original function should be called again, test for memoizing TUPLE', async () => {
    let returnValue = 5;
    const testFunction = (argsTest: any) => returnValue;
    const memoized = memoize(testFunction, (key) => key, 1000);

    let tuple: [number, boolean, string];
    tuple = [10, true, 'TypeScript'];

    expect(memoized(tuple)).to.equal(5);
    returnValue = 10;
    expect(memoized(tuple)).to.equal(5);

    clock.tick(2000);
    await Promise.resolve();

    returnValue = 15;
    expect(memoized(tuple)).to.not.equal(5);
  });

  it('after 1000ms value is not valid, original function should be called again, test for memoizing BOOLEAN', async () => {
    let returnValue = 5;
    const testFunction = (argsTest: any) => returnValue;
    const memoized = memoize(testFunction, (key) => key, 1000);

    expect(memoized(false)).to.equal(5);
    returnValue = 10;
    expect(memoized(false)).to.equal(5);

    clock.tick(2000);
    await Promise.resolve();

    returnValue = 15;
    expect(memoized(false)).to.not.equal(5);
  });

  it('after 1000ms value is not valid, original function should be called again, test for memoizing OBJECT', async () => {
    let returnValue = 5;
    const testFunction = (argsTest: any) => returnValue;
    const memoized = memoize(testFunction, (key) => key, 1000);

    const car: { type: string, model: string, year: number } = {
      type: "Toyota",
      model: "Corolla",
      year: 2009
    };

    expect(memoized(car)).to.equal(5);
    returnValue = 10;
    expect(memoized(car)).to.equal(5);

    clock.tick(2000);
    await Promise.resolve();

    returnValue = 15;
    expect(memoized(car)).to.not.equal(5);
  });
});
