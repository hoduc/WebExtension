var self = require("sdk/self");

var cm = require("sdk/context-menu");
cm.Item({
    label: "Play Recommended",
    context: cm.URLContext("youtube.com")
});
// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;
