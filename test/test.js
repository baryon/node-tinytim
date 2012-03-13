var assert = require("assert");

exports["simple"] = function() {
	var tinytim = require('../');
	var result = tinytim.tim("Hello {{place}}", {place: "world"});
	assert.equal(result, "Hello world");
}

exports["path"] = function() {
	var tinytim = require('../');
	var template = "Hello {{place}}. My name is {{person.name}}.",
    data = {
        place: "Brighton",
        person: {
            name: "Prem"
        }
    };

	var result = tinytim.tim(template, data);
	assert.equal(result, "Hello Brighton. My name is Prem.");
}

exports["html"] = function() {
	var tinytim = require('../');
	var template = "<p><a href='{{url}}'>{{title}}</a></p>",
    data = {
        title: "Dharmafly",
        url:   "http://dharmafly.com"
    };

	var result = tinytim.tim(template, data);
	assert.equal(result, "<p><a href='http://dharmafly.com'>Dharmafly</a></p>");
}


exports["nested"] = function() {
	var tinytim = require('../');
	var ul = "<ul>{{list}}</ul>",
    li = "<li>{{contents}}</li>",
    myList = "",
    i;

	for (i=100; i<103; i++){
	    myList += tinytim.tim(li, {contents: i});
	}
	var result = tinytim.tim(ul, {list: myList});
	assert.equal(result, "<ul><li>100</li><li>101</li><li>102</li></ul>");
}

exports["array"] = function() {
	var tinytim = require('../');
	var result = tinytim.tim("Hello {{0}}", ["world"]);
	assert.equal(result, "Hello world");
}

exports["array 2"] = function() {
	var tinytim = require('../');
	var result = tinytim.tim("Hello {{places.0}}", {places: ["world"]});
	assert.equal(result, "Hello world");
}

exports["start end"] = function() {
	var tinytim = require('../');
	tinytim.start = "<%";
	tinytim.end = "%>";
	var result = tinytim.tim("Hello <%place%>", {place: "world"});
	assert.equal(result, "Hello world");
}

