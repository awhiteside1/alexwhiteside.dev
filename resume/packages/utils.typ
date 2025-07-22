#import "@preview/jogs:0.2.4" as jogs


#let parseDate(s) = {
  let bytecode = jogs.compile-js(```javascript
    function parseDate(input) {
        const date = new Date(input);
        return {
            year: date.getUTCFullYear(),
            month: date.getUTCMonth() + 1,
            day: date.getUTCDate(),
            hour: date.getUTCHours(),
            minute: date.getUTCMinutes(),
            second: date.getUTCSeconds()
        };
    }
  ```)
  let (year, month, day, hour, minute, second) = jogs.call-js-function(bytecode, "parseDate", s)
  datetime(year: year, month: month, day: day, hour: hour, minute: minute, second: second)
}