/*eslint no-undef: 0*/

module.exports = function parseDate(input) {
  var parts = new String(input).split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}