var fs = require('fs');
var nipypePath = './app/porcupine/static/assets/nipype/';
var porcupinePath = './app/porcupine/static/assets/nipype.json';
var modulesToParse = fs.readdirSync(nipypePath);
// modulesToParse = ['fsl.JSON', 'io.JSON'];

allNodes = [];
modulesToParse.forEach(function(module) {
  allNodes =allNodes.concat(JSON.parse(fs.readFileSync(nipypePath + module))['nodes']);
});

function insertNode(nodeList, newNode) {
  var c  = 'nodeList';
  for (var i = 0; i < newNode.category.length; i++) {
    c += '.categories';
    if (eval(c + ' === undefined')) {
      eval(c + ' = {};');
    }
    c += '.' + newNode.category[i];
    if (eval(c + ' === undefined')) {
      eval(c + ' = {};');
    }
  }
  delete(newNode['category'])
  if (eval(c + ' .nodes === undefined')) {
    eval(c  + '.nodes = {};');
  }
  eval(c  + '.nodes[newNode.title.name] = newNode;');
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

const getRainbowColor = index => {
  var r = Math.floor(Math.sin(1 * Math.PI * index + 0              ) * 127 + 128);
  var g = Math.floor(Math.sin(1 * Math.PI * index + 2 * Math.PI / 3) * 127 + 128);
  var b = Math.floor(Math.sin(1 * Math.PI * index + 4 * Math.PI / 3) * 127 + 128);
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

function insertColours(sortedNodes, colourIndex, colourSpacing) {
  sortedNodes.colour = getRainbowColor(colourIndex);
  if (sortedNodes.categories !== undefined && sortedNodes.categories.length != 0) {
    colourSpacing /= Object.keys(sortedNodes.categories).length;
    Object.keys(sortedNodes.categories).map(function(element) {
      insertColours(sortedNodes.categories[element], colourIndex, colourSpacing);
      colourIndex += colourSpacing;
    });
  }
  return;
}

sortedNodes = {}
sortedNodes.categories = {};
allNodes.forEach(function(node) {
  insertNode(sortedNodes, node);
});
insertColours(sortedNodes, 0.0, 1.0);

fs.writeFile(porcupinePath, JSON.stringify(sortedNodes.categories.Nipype), 'utf8', function(err){if(err){ throw err; }});
