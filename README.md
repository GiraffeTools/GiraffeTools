Website: www.giraffe.tools
# Giraffe Tools
_This web application is in the early stages of construction_

[![Build Status](https://travis-ci.org/TimVanMourik/GiraffeTools.svg?branch=master)](https://travis-ci.org/TimVanMourik/GiraffeTools)
[![codecov](https://codecov.io/gh/TimVanMourik/GiraffeTools/branch/master/graph/badge.svg)](https://codecov.io/gh/TimVanMourik/GiraffeTools)

### Giraffe
a **G**raphical **I**nterface for **R**eproducible **A**nalysis o**F** work**F**low **E**xperiments

This is a web application with a set of tools to build and improve your data analysis! Initially, this will focus on neuroscientific applications. The first goal is to make a web application from my earlier project [Porcupine](https://timvanmourik.github.io/Porcupine), a visual workflow editor. This can further be developped to support version control of a workflow by means of Github integration, connect to visualisation or execution platforms, and much more.

## Intended usage
The plan is to have a user go to:
https://www.giraffe.tools/gh/$username/$repository/$branch
and there find a dashboard of the project. A project is a GitHub repository that is characterised by a GIRAFFE.yml configuration file in its root and links to configuration files of specific tools. The rest of the repository doesn't matter.

Example (work in progress): https://www.giraffe.tools/gh/TimVanMourik/SomeGiraffeExample/master

This is similar in usage to for example [GitPitch](https://gitpitch.com), which is how the exaplantory presentation about this repository was made: https://gitpitch.com/TimVanMourik/GiraffeTools/master.

## Potential Tools
* Porcupine [Visual workflow editor](https://www.biorxiv.org/content/early/2017/10/11/187344)
  * Visual representation of data flow
  * Connect input/output ports on functions/nodes
  * From this workflow representation, make code for execution this workflow
* OAuth Github link to easily save (commit) workflows to GitHub
* Code execution integration, via, e.g., Amazon
* Analysis preregistration
* [DOI](https://www.doi.org) (persistent identifiers) for analysis workflow
* Visualisation of the data that flows through pipeline
  * Stretch goal: Augmented Reality visualisation (like [this project](https://github.com/TimVanMourik/ChristmasAR)). This should definitely be called ARmadillo
* [Your input here!]

## General
* This website can locally be deployed with [Docker](https://www.docker.com). You can run this web application locally by installing and running Docker and docker-compose, and simply typing `docker-compose up` in the terminal/command prompt.
* Join us on [Slack](https://www.giraffe.tools/slack)!

## Development
Do you want to work on the Porcupine app? Then it's really useful if you can just change a file, such that the React bundle (porcupine.js) is automatically updated. You can do this two different ways. Either, set `UPDATE_REACT=TRUE` in a `.env` file in the root of the project (rename `env.sample`), or run the `bin/watch-react.bash` script.
Note: on Windows, this doesn't seem to be very reliable yet. You may want to run webpack in --watch mode from the cmd instead.



## Tests
To run the Python test suite:
```
cd app
python manage.py test
```
To run the React test suite:
```
npm test
```

### Interesting links:
* https://gitpitch.com
* https://gitcoin.co
* https://github.com/Cloud-CV/Fabrik
* https://github.com/slicedrop
* https://github.com/rii-mango
* https://github.com/FNNDSC/ami
