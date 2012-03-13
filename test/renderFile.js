var assert = require("assert");

exports["simple"] = function() {
	var tinytim = require('../');
	var result = tinytim.renderFile("test/string.tim", {place: "world"});
	assert.equal(result, "Hello world");
}

exports["path"] = function() {
	var tinytim = require('../');
	var template = "test/string2.tim",
    data = {
        place: "Brighton",
        person: {
            name: "Prem"
        }
    };

	var result = tinytim.renderFile(template, data);
	assert.equal(result, "Hello Brighton. My name is Prem.");
}

exports["html"] = function() {
	var tinytim = require('../');
	var template = "test/html.tim",
    data = {
        title: "Dharmafly",
        url:   "http://dharmafly.com"
    };

	var result = tinytim.renderFile(template, data);
	assert.equal(result, "<p><a href='http://dharmafly.com'>Dharmafly</a></p>");
}

exports["simple cache"] = function() {
	var tinytim = require('../');
	console.time('no-cache');
	for (var i = 0; i < 200; i++) {
		var result = tinytim.renderFile("test/string.tim", {place: "world"});
		assert.equal(result, "Hello world");
	}
	console.timeEnd('no-cache');
	
	console.time('cache');
	for (var i = 0; i < 200; i++) {
		var result = tinytim.renderFile("test/string.tim", {place: "world"});
		assert.equal(result, "Hello world");
	}
	console.timeEnd('cache');

}

