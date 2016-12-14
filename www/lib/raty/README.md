# jQuery Raty - A Star Rating Plugin

[![Build Status](https://img.shields.io/travis/wbotelhos/raty/master.svg)](https://travis-ci.org/wbotelhos/raty "Travis CI")
[![Dependency Status](https://david-dm.org/wbotelhos/raty.svg)](https://david-dm.org/wbotelhos/raty "Dependency Status")
[![Dev Dependency Status](https://david-dm.org/wbotelhos/raty/dev-status.svg)](https://david-dm.org/wbotelhos/raty#info=devDependencies "Dev Dependency Status")
[![Code Climate](https://codeclimate.com/github/wbotelhos/raty.png)](https://codeclimate.com/github/wbotelhos/raty "Code Climate")
[![Support jQuery Raty](http://img.shields.io/gittip/wbotelhos.svg)](https://www.gittip.com/wbotelhos "Git Tip")

## Version

```
@version  2.7.1
@since    2010.06.11
@author   Washington Botelho
@doc      wbotelhos.com/raty
```

## Dependencies

+ jquery.js

## Usage with Image

- jquery.raty.js
- star-off.png
- star-on.png

```html
<script src="jquery.raty.js"></script>

<div></div>
```

```js
$('div').raty();
```

## Usage with Font

- jquery.raty.js
- jquery.raty.[eot|svg|ttf|woff]
- jquery.raty.css

```html
<link rel="stylesheet" href="jquery.raty.css">
<script src="jquery.raty.js"></script>

<div></div>
```

```js
$('div').raty({ starType: 'i' });
```

## Bower Install

```js
bower install raty
```

See [bower.io](http://bower.io) for more information.

## Options

```js
cancel      : false                                          // Creates a cancel button to cancel the rating.
cancelClass : 'raty-cancel'                                  // Name of cancel's class.
cancelHint  : 'Cancel this rating!'                          // The cancel's button hint.
cancelOff   : 'cancel-off.png'                               // Icon used on active cancel.
cancelOn    : 'cancel-on.png'                                // Icon used inactive cancel.
cancelPlace : 'left'                                         // Cancel's button position.
click       : undefined                                      // Callback executed on rating click.
half        : false                                          // Enables half star selection.
halfShow    : true                                           // Enables half star display.
hints       : ['bad', 'poor', 'regular', 'good', 'gorgeous'] // Hints used on each star.
iconRange   : undefined                                      // Object list with position and icon on and off to do a mixed icons.
mouseout    : undefined                                      // Callback executed on mouseout.
mouseover   : undefined                                      // Callback executed on mouseover.
noRatedMsg  : 'Not rated yet!'                               // Hint for no rated elements when it's readOnly.
number      : 5                                              // Number of stars that will be presented.
numberMax   : 20                                             // Max of star the option number can creates.
path        : undefined                                      // A global locate where the icon will be looked.
precision   : false                                          // Enables the selection of a precision score.
readOnly    : false                                          // Turns the rating read-only.
round       : { down: .25, full: .6, up: .76 }               // Included values attributes to do the score round math.
score       : undefined                                      // Initial rating.
scoreName   : 'score'                                        // Name of the hidden field that holds the score value.
single      : false                                          // Enables just a single star selection.
space       : true                                           // Puts space between the icons.
starHalf    : 'star-half.png'                                // The name of the half star image.
starOff     : 'star-off.png'                                 // Name of the star image off.
starOn      : 'star-on.png'                                  // Name of the star image on.
target      : undefined                                      // Element selector where the score will be displayed.
targetFormat: '{score}'                                      // Template to interpolate the score in.
targetKeep  : false                                          // If the last rating value will be keeped after mouseout.
targetScore : undefined                                      // Element selector where the score will be filled, instead of creating a new hidden field (scoreName option).
targetText  : ''                                             // Default text setted on target.
targetType  : 'hint'                                         // Option to choose if target will receive hint o 'score' type.
starType    : 'img'                                          // Element used to represent a star.
```

## Functions

```js
$('div').raty('score');                  // Get the current score.

$('div').raty('score', number);          // Set the score.

$('div').raty('click', number);          // Click on some star.

$('div').raty('readOnly', boolean);      // Change the read-only state.

$('div').raty('cancel', boolean);        // Cancel the rating. The last param force the click callback.

$('div').raty('reload');                 // Reload the rating with the current configuration.

$('div').raty('set', { option: value }); // Reset the rating with new configurations.

$('div').raty('destroy');                // Destroy the bind and give you the raw element.

$('div').raty('move', number);           // Move the mouse to the given score point position.
```

## Contributors

[Check it out](http://github.com/wbotelhos/raty/graphs/contributors)

## Licence

[The MIT License](http://opensource.org/licenses/MIT)

## Love it!

Via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=jQuery%20Raty) or [Gittip](http://www.gittip.com/wbotelhos). Thanks! (:
