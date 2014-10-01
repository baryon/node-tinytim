var assert = require('assert'),
	tinytim = require('../'),
	tim = tinytim.tim;

describe('Render File tests', function () {
	it('file replace on simple string', function (done) {
		var result = tinytim.renderFile("test/string.tim", {place: "world"});
		assert.equal(result, "Hello world");
		done();
	});

	it('file path replace on simple string', function (done) {
		var template = "test/string2.tim",
			data = {
				place: "Brighton",
				person: {
					name: "Prem"
				}
			};

		var result = tinytim.renderFile(template, data);
		assert.equal(result, "Hello Brighton. My name is Prem.");
		done();
	});

	it('file replace on html string', function (done) {
		var template = "test/html.tim",
			data = {
				title: "Dharmafly",
				url: "http://dharmafly.com"
			};

		var result = tinytim.renderFile(template, data);
		assert.equal(result, "<p><a href='http://dharmafly.com'>Dharmafly</a></p>");
		done();
	});

	it('inline replace on nested object', function (done) {
		var ul = "<ul>{{list}}</ul>",
			li = "<li>{{contents}}</li>",
			myList = "",
			i;

		for (i = 100; i < 103; i++) {
			myList += tim(li, {contents: i});
		}
		var result = tim(ul, {list: myList});
		assert.equal(result, "<ul><li>100</li><li>101</li><li>102</li></ul>");

		done();
	});

});
