var assert = require("assert");

exports["simple"] = function() {
	var tim = require('../').tim;
	var result = tim("Hello {{place}}", {place: "world"});
	assert.equal(result, "Hello world");
}

exports["path"] = function() {
	var tim = require('../').tim;
	var template = "Hello {{place}}. My name is {{person.name}}.",
    data = {
        place: "Brighton",
        person: {
            name: "Prem"
        }
    };

	var result = tim(template, data);
	assert.equal(result, "Hello Brighton. My name is Prem.");
}

exports["html"] = function() {
	var tim = require('../').tim;
	var template = "<p><a href='{{url}}'>{{title}}</a></p>",
    data = {
        title: "Dharmafly",
        url:   "http://dharmafly.com"
    };

	var result = tim(template, data);
	assert.equal(result, "<p><a href='http://dharmafly.com'>Dharmafly</a></p>");
}


exports["nested"] = function() {
	var tim = require('../').tim;
	var ul = "<ul>{{list}}</ul>",
    li = "<li>{{contents}}</li>",
    myList = "",
    i;

	for (i=100; i<103; i++){
	    myList += tim(li, {contents: i});
	}
	var result = tim(ul, {list: myList});
	assert.equal(result, "<ul><li>100</li><li>101</li><li>102</li></ul>");
}

exports["array"] = function() {
	var tim = require('../').tim;
	var result = tim("Hello {{0}}", ["world"]);
	assert.equal(result, "Hello world");
}

exports["array 2"] = function() {
	var tim = require('../').tim;
	var result = tim("Hello {{places.0}}", {places: ["world"]});
	assert.equal(result, "Hello world");
}

exports["exception"] = function() {
	var tim = require('../').tim;
	assert.throws(function() {
		var result = tim("Hello {{config.foo.bar}}", {config: {moo: "blah"}});
	}, Error)
}

exports["start end"] = function() {
	var tinytim = require('../');
	tinytim.start = "<%";
	tinytim.end = "%>";
	var result = tinytim.tim("Hello <%place%>", {place: "world"});
	assert.equal(result, "Hello world");
}

exports["start end 2"] = function() {
	var tinytim = require('../');
	//here the start and end tag was changed at last test case
	var result = tinytim.tim("Hello <%place%>", {place: "world"});
	assert.equal(result, "Hello world");
	tinytim.start = "{{";
	tinytim.end = "}}";
	var result = tinytim.tim("Hello {{place}}", {place: "world"});
	assert.equal(result, "Hello world");

}



