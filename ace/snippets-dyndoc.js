define('ace/snippets/dyndoc', ['require', 'exports', 'module' ], function(require, exports, module) {


exports.snippetText = "###################\n\
# Dyndoc snippets #\n\
###################\n\
# New Block\n\
snippet [>\n\
	[\#>]\n\
snippet [\n\
	[#${1:arguments}]\n\
snippet bb\n\
	{\#${1:arguments}]\n\
snippet {\n\
	{\#${1:arguments}]\n\
snippet }\n\
	[\#${1:arguments}}\n\
snippet {}\n\
	{\#${1:arguments}]${2}\n\
	[#${1}}\n\
";
exports.scope = "dyndoc";

});
