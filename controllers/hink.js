/*

Copyright (c) 2011 Noel Herrick

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


*/

var hinkModel = require('../models/hink-model');

module.exports = {
    
  index: function(req, res, next) {
	
	  hinkModel.readRandom( function(err, result) {
		if (err) {
			console.log(err);
			return;
		}
	    
		syllables = '';

		switch (result.rows[0].syllablecount) {
			case 1:
				syllables = 'Hink pink';
				break;
			case 2:
				syllables = 'Hinky pinky';
				break;
			case 3:
				syllables = 'Hinkity pinkity';
				break;
		}

		hinkPink = {id: result.rows[0].hinkpinkid, riddle: result.rows[0].riddle, syllables: syllables, solution: result.rows[0].solution};
		res.render('riddle.dust', hinkPink);
	  });
	},

    check: function(req, res, next) {
	  id = req.body.id;
	  hinkModel.read(id, function(err, result) {
		if (err) {
			console.log(err);
			return;
		}
	    
		syllables = '';

		switch (result.rows[0].syllablecount) {
			case 1:
				syllables = 'Hink pink';
				break;
			case 2:
				syllables = 'Hinky pinky';
				break;
			case 3:
				syllables = 'Hinkity pinkity';
				break;
		}

		hinkPink = {id: result.rows[0].id, riddle: result.rows[0].riddle, syllables: syllables, solution: result.rows[0].solution};
		
		console.log(hinkPink.solution);

		solution = hinkPink.solution.toLowerCase();
		answer = req.body.a.toLowerCase();

		    result = 'That answer was incorrect.';
		    if (solution == answer
			|| solution.indexOf(answer) != -1
			|| answer.indexOf(solution) != -1)
			result = 'That answer was correct.';

		    res.render('answer.dust', {
			riddle: hinkPink.riddle,
			syllables: hinkPink.syllables,
			a: req.params.a,
			result: result
		    });
	  });
    }
}
