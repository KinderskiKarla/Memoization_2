/**
 * A function that increases current date with forwarded date and returns the 
 * value in milliseconds
 * 
 * @param year      an amount of years that should be added to the current year
 * @param month     an amount of months that should be added to the current month
 * @param day       an amount of days that should be added to the current days
 * @returns         current date increased by forwarded date in milliseconds 
 */
function addToTime(year: number, month: number, day: number): number {
    var date = new Date();
    date.setFullYear(date.getFullYear() + year);
    date.setMonth(date.getMonth() + month);
    date.setDate(date.getDate() + day);
    return date.getTime();
}

const memoized = memoize(
    addToTime,
    (year: number, month: number, day: number) => 12 * 31 * year + 31 * month + day,
    5000
)

const result = memoized(1, 11, 26); 

const secondResult = memoized(1, 11, 26); 

const thirdResult = memoized(1, 11, 26); 

/**
 * A function that memoizes values of a given function. If a function is called with 
 * the same set of parameters and if timeout is not expired, value should be returned 
 * from cache. If the timeout value is no longer valid, cached values are deleted, and
 * the original function is called and calculated again.
 * 
 * @param funcAny       any function for which the return values should be cached
 * @param resolver      if provided gets called for each function call with the 
 *                      exact same set of parameters as the original function, 
 *                      the resolver function should provide the memoization key                  
 * @param timeout       timeout for cached values in milliseconds
 * @returns             memoized result of forwarded function 
 */
export function memoize(funcAny: (...args: any[]) => any,
    resolver?: (year: number, month: number, day: number) => number,
    timeout?: number) {
    /**
     * Object "cache" - the object for memoizing key which provides results
     * of the function and "validUntil" value in milliseconds
     */
    const cache: {
        [key: number]: { result: number, validUntil: number }
    } = {};

    return function func(...args: any) { 
        //Calculates the function key; undefined because resolver is optional 
        const key = resolver == undefined ? parseInt(args.join()) : resolver(args[0], args[1], args[2]);

        /**
         * Checks if the key is in the cache and if "validUntil" parameter
         * of cached key is bigger or equal to the current date in milliseconds;
         * that is important because that means that the timeout value is not expired
         * and the return result could be returned from the cache, not calculated again
         */
        if (cache[key] && cache[key].validUntil >= Date.now()) {
            console.log(cache)
            return cache[key].result;
        } else {
            /**
             * Calculates the value of the function and saves the result in const
             * data, then the values are forwarded to cache.
            */
            console.log(cache)
            const result = funcAny(...args);
            const data = {
                /**
                 * A required (timeout) parameter cannot follow an optional (resolver) parameter, 
                 * but with "!" I guarantee it will never be null
                 */
                result, validUntil: Date.now() + timeout!  
            }
            cache[key] = data;
            return data.result;
        }
    }
}
