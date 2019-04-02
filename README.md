[![Build Status](https://travis-ci.org/TimVanMourik/GiraffeTools.svg?branch=master)](https://travis-ci.org/TimVanMourik/GiraffeTools)
[![codecov](https://codecov.io/gh/TimVanMourik/GiraffeTools/branch/master/graph/badge.svg)](https://codecov.io/gh/TimVanMourik/GiraffeTools)

Website: https://giraffe.tools
# Giraffe Tools <img src="app/giraffe/static/img/giraffetools_logo.png" width="50">


### GiraffeTools
Tools for **G**raphical **I**nterface for **R**eproducible **A**nalysis o**F** work**F**low **E**xperiments

GiraffeTools is a web application for interactive graphical data analysis pipeline construction. The workflow is loaded from and saved to GitHub.

Currently, GiraffeTools focusses on neuroscientific data analysis and it supercedes the initial stand-alone application [Porcupine](https://timvanmourik.github.io/Porcupine), published [here](https://doi.org/10.1371/journal.pcbi.1006064).

## Intended usage
GiraffeTools reads information straight from an analysis repository, just to:
https://giraffe.tools/github/$username/$repository/$branch
to find a dashboard of the project. A GiraffeTools repository is characterised by a GIRAFFE.yml configuration file in its root and links to configuration files of specific tools.

Example: https://giraffe.tools/github/TimVanMourik/SomeGiraffeExample/master

## Tools
Currently, GiraffeTools features:
* Porcupine [Visual workflow editor](https://www.biorxiv.org/content/early/2017/10/11/187344)
  * Visual representation of data flow
  * Connect input/output ports on functions/nodes
  * From this workflow representation, make code for execution this workflow
* Visualisation of the data that flows through pipeline
  * We have a working prototype of Augmented Reality brain visualisation [here](http://armadillo-brain.herokuapp.com), ARmadillo

## Development
* This website can locally be deployed with [Docker](https://www.docker.com). You can run this web application locally by installing and running Docker and docker-compose, and simply typing `docker-compose up web` in the terminal/command prompt.
* If you want to customise your settings, specify this in a `.env` file in the root of the project. You can start by renaming the `env.sample`.
* You can run the site in three different modes, MODE=watch|development|production. Default is `watch`. This automatically updates your browser pages upon saving a file, no refresh needed! In development mode, you can still use debug statement, but there is no 'hot reloading'. The production mode is the way it's gonna be like online. 
* Join us on [Slack](https://giraffe.tools/slack)!

## Contributing
Any conributions are much appreciated! In the form of issues about bugs, feature requests, enhancement ideas, or even pull requests! If you like more details, you can find them in CONTRIBUTING.md.

### Interesting links:
* https://gitpitch.com
* https://gitcoin.co
* https://github.com/Cloud-CV/Fabrik
* https://github.com/slicedrop
* https://github.com/rii-mango
* https://github.com/FNNDSC/ami
* https://github.com/facebookresearch/visdom
* https://galaxyproject.org/tutorials/g101/
* https://github.com/tensorflow/tensorboard

