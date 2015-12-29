#!/bin/bash

apm init --package language-dyndoc --convert ../textmate/Dyndoc.tmbundle
cp -r language-dyndoc/grammars/* ~/Github/atom-language-dyndoc/grammars/