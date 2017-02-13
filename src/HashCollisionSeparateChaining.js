var LinkedList = require('./LinkedList');

function HashCollisionSeparateChaining() {
  var table = [];

  var loseloseHashCode = function (key) {
    var hash = 0;
    for (var i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  };

  var ValuePair = function (key, value) {
    this.key = key;
    this.value = value;
    this.toString = function () {
      console.log(this.key + '-' + this.value);
    }
  };

  this.put = function (key, value) {
    var postion = loseloseHashCode(key);
    if (table[postion] == undefined) {
      table[postion] = new LinkedList();
    }
    table[postion].append(new ValuePair(key, value));
  };

  this.get = function (key) {
    var position = loseloseHashCode(key);

    if (table[position] !== undefined) {
      var current = table[position].getHead();

      while (current.next) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }

      if (current.element.key === key) {
        return current.element.value;
      }
    }
    return undefined;
  };

  this.remove = function (key) {
    var position = loseloseHashCode(key);

    if (table[position] !== undefined) {
      var current = table[position].getHead();
      while (current.next) {
        if (current.element.key === key) {
          table[position].remove(current.element);
          if (table[position].isEmpty()) {
            table[position] = undefined;
          }
          return true;
        }
        current = current.next;
      }
      if (current.element.key === key) {
        table[position].remove(current.element);
        if (table[position].isEmpty()) {
          table[position] = undefined;
        }
        return true;
      }
      return false;

    }
  }
}

module.exports = HashCollisionSeparateChaining;