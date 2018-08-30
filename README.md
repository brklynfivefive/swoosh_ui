# swoosh_interface
## Developed by Seungyun Todd Oh, some rights reserved.
## This project contains some open-source libraries.

## DIRECTORIES AND FILES

* Original javascript and css stylesheet files are located at client/ directory. If there's any code changes needed, you may should edit the files in client/ directory.
* Original Handlebars templates are located at templates/ directory.

## TO LOAD

* Copy index.html, public/ folder and resources/ folder in the same directory.
* Open index.html.

## COMPATIBILITY

This interface is compatible with Chrome or any latest Webkit-based browsers running on macOS, Windows, Linux, iOS (higher than 9.0.0), and Android (higher than 5.0).

## COMPILE

1. Install all required dev/non-dev dependencies in package.json using NPM.
2. Install all required dependency libraries used in gulpfile.js using NPM.
3. Run gulp command line interface in terminal. (gulp build for build and compile for production use, gulp templates for precompiling Handlebars templates, gulp watch for watching any changes).

## ETC

* The interface uses Handlebars templating format to render some key components.
* To debug, open index.html via Chrome, initiate Mobile Screen Emulation mode, and refresh the page once again.

## COPYRIGHT

This project contains some open-source libraries including the animation plugin "banana" originally developed by Seungyun Todd Oh in 2014.