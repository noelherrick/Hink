/*

Copyright (c) 2011 Noel Herrick

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


*/

var vows = require('vows'),
    assert = require('assert'),
    HinkPink = require('../models/hink-model');

// Test to make sure that we get data correctly
vows.describe('Database access for hink pinks').addBatch({

    'ReadRandom': {
        topic: function () { HinkPink.readRandom(this.callback); },

        'A random hink model is returned': function (err, result) {
            assert.isNotNull(result);
	    assert.isNotNull(result.rows[0].hinkpinkid);
        }
    },

    'Read a Hink that': {
        topic: function () { fn = this.callback; HinkPink.readRandom(function (err, result) { HinkPink.read(result.rows[0].hinkpinkid, fn); }); },
	 
	
            'is not null': function (err, result) {
                assert.isNotNull (result);
            },
            'has an id': function (err, result) {
                assert.isNotNull(result.rows[0].hinkpinkid);
            },
            'has an riddle': function (err, result) {
                assert.isNotNull(result.rows[0].riddle);
            },
            'has an solution': function (err, result) {
                assert.isNotNull(result.rows[0].solution);
            },
            'has an syllablecount': function (err, result) {
                assert.isNotNull(result.rows[0].syllablecount);
            }
	  
        },

    'Validation': {
        topic: function () { return new HinkPink("", "", 0, ""); },

        'We get errors when': {
            'does not have riddle': function (topic) {
		topic.validate(function (err) { assert.equal('_riddle_ required', err.message) });
            },
            'does not have solution': function (topic) {
		topic.riddle = "riddle";
                topic.validate(function (err) { assert.equal('_syllables_ required', err.message) });
            },
            'does not have syllable count': function (topic) {
                topic.syllables = 1;
                topic.validate(function (err) { assert.equal('_solution_ required', err.message) });
            }
	}
    }

}).run();
