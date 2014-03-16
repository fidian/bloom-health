Bloom Health Programming Example
================================

The task is as follows:

* Weather application.
* Front end oriented.
* Create weather site that determines if it is a good day to do things outside for the week.
* Weather Underground API is one option for data:  http://www.wunderground.com/weather/api/
* Get some weather API.
* See what days match up to your settings and display accordingly.


Installation
------------

1.  Make sure you already have [Node.js](http://nodejs.org).
2.  Install the Grunt command line program:  `npm install -g grunt-cli`
3.  Clone the repository.
4.  Get the submodules:  `git submodule init; git submodule update`
5.  In the repository, get packages:  `npm install`
6.  Finish the setup with grunt:  `grunt setup`


Building the App
----------------

Just run `grunt` to fire off a build.  You can make the debug client with `grunt debug`.  Using `grunt watch` will watch for changes and compile the production and debug versions of the code.  Even more useful is `grunt server`, which also starts up a web server to deliver files and the debug version of the code.

The files under `www/` are considered production-ready and are the minified versions of the templates and code.


Licence
-------

This app is licenced under a MIT licence with an additional non-advertising clause.  See [LICENSE.md](LICENSE.md) for further information.
