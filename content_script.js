var substitutions = [
  {
    "regex": /Florin\s*Iordache/gi,
    "to": " Ciordache"
  },
  {
    "regex": /Iordache\s*Florin/gi,
    "to": " Ciordache"
  }
];


function ciordify(node) {
    var walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    var node;

    while(node = walk.nextNode()) {
      var text = node.nodeValue;
      substitutions.forEach(function(elem) {
        if (text.search(elem.regex) >= 0) {
            node.nodeValue = text.replace(elem.regex, elem.to);
          }
      })
    }
}



var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length) {
      for ( var addedNode of mutation.addedNodes) {
        ciordify(addedNode);
      }
    }
  })
});


// because facebook and friends modify the dom after page load
observer.observe(document.body, { childList: true,  subtree: true });

ciordify(document.body);
