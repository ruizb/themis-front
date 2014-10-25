Array.prototype.contains = function (element) {
  var i = 0,
      found = false;

  while (i < this.length && !found) {
    if (this[i] === element) {
      found = true;
    }
    i++;
  }

  return found;
};