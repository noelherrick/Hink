/*

Copyright (c) 2011 Noel Herrick

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


*/

// Guid Helper Function
var guid = require('./guid');
var hpEnviro = require('../environment.config.js');

// Database
var pg = require('pg');
var conString = HpEnviron.hpDbConnString;

// Pojso
var HinkPink = exports = module.exports = function HinkPink (id, riddle, syllables, solution) {
	this.id =  id,
	this.riddle = riddle,
	this.syllables = syllables,
	this.solution = solution;

	if (id != null)
		id = guid();
};

// Instance methods
// Validation
HinkPink.prototype.validate = function(fn){
  if (!this.riddle) return fn(new Error('_riddle_ required'));
  if (!this.syllables || this.syllables == 0) return fn(new Error('_syllables_ required'));
  if (!this.solution) return fn(new Error('_solution_ required'));
  fn();
};


// CRUD functions
HinkPink.prototype.create = function(fn) {
	pg.connect(conString, function(err, client) {
		client.query("INSERT INTO hnk.\"HinkPinks\" (HinkPinkID, riddle, solution, syllablecount) VALUES ($1, $2, $3, $4)",
			[this.id, this.riddle, this.syllables, this.solution], function(err, result) {

			fn(err, result);
		});
	});
};

HinkPink.prototype.update = function(fn) {
	pg.connect(conString, function(err, client) {
		client.query("UPDATE hnk.\"HinkPinks\" SET HinkPinkID = $1, riddle = $2, solution = $3, syllablecount = $4 WHERE hinkpinkid = $1",
				[this.id, this.riddle, this.syllables, this.solution], function(err, result) {

			fn(err, result);
		});
	});
};

HinkPink.prototype.destroy = function(fn){
	pg.connect(conString, function(err, client) {
		client.query("DELETE FROM hnk.\"HinkPinks\" WHERE hinkpinkid = $1", [this.id], function(err, result) {

			fn(err, result);
		});
	});
};

// Class / static methods
HinkPink.list = function(fn) {
  var arr = Object.keys(db).reduce(function(arr, id){
    arr.push(db[id]);
    return arr;
  }, []);
  fn(null, arr);
};

HinkPink.read = function(id, fn) {
	pg.connect(conString, function(err, client) {
		client.query("SELECT HinkPinkID, riddle, solution, syllablecount FROM hnk.\"HinkPinks\" WHERE hinkpinkid = $1", [id], function(err, result) {

			fn(err, result);
		});
	});
};

HinkPink.readRandom = function(fn) {
	pg.connect(conString, function(err, client) {
		client.query("SELECT HinkPinkID, riddle, solution, syllablecount FROM hnk.\"HinkPinks\" LIMIT 1", function(err, result) {

			fn(err, result);
		});
	});
};


