# jQuery Raty - A Star Rating Plugin - http://wbotelhos.com/raty

## 2.7.1

### Fixes

+ Fix `readOnly` when using fonts; (Amaia Baigorri)

### News

+ Added Bower package; (yadhu)
+ Added `path` options as callback; (tyler-king)

## 2.7.0

### Fixes

+ Function `move` was losing precision with float with more then one digit;
+ Function `move` was losing the saved `options` data;
+ With `half` enable, mousemove was not changing to full star after 0.5 point;
+ With `half` enable, score field was receiving precision value. (reported by hoangnham01)

### Changes

+ If you returns `false` into `click` callback, the action will be prevented;
+ When `precision` is on it won't force `targetType` to be `score` anymore.

### News

+ Added support to float `hints`;

## 2.6.0

### Fixes

+ Target was not showing the score when `half` was enabled; (andersonba)
+ Fixed some JS Lint warnings; (Qazzian)
+ Cancel button `mouseleave` must yiels no score as `undefined` not `null`;
+ The `numberMax` now sets the stars between 1...`numberMax` instead 0...`numberMax`.

### Changes

+ `path` now is `undefined` by default;
+ The {score} placeholder on `targetFormat` option is no longer mandatory;
+ On `click` method, if click callback is not defined, it will be ignore instead of throw error;
+ Option `size` was removed! Raty will discover it;
+ Option `width` was removed! It is a bad idea force a width on this responsive days. Try `inline-block` for fit.

### News

+ Added option `targetScore` to choose where the score will be setted; (byhoratiss)
+ Added function `move` to move the cursor through stars;
+ Put the library over Travis Continuous Integration; (danielpsf)
+ Added option `starType` to be possible change from image to other element like `i` and use font to render the stars;
+ Option `target` accepts callback;
+ Added option `cancelClass` to choose the class name for cancel button.

## 2.5.2

### Fixes

The read-only indicator was not removing after the reset of configuration, blocking the `click` and `score` functions.

## 2.5.1

### News

+ Added function `destroy` to rollback to original object before the bind;
+ Added option `mouseout` to handle things on mouse out;
+ The `number` option can be setted via callback; (muratguzel)
+ The `readOnly` and `scoreName` option can be setted via callback; (aprimadi)
+ You can avoid the width style setting the option `width` to false.

### Changes

+ Extracted the limit of stars to the option `numberMax`;
+ The `hints` options can receives three values:
  - empty string: receives an empty string as hint;
  - null: receives the score value as hint;
  - undefined: receives the default hint.
+ The `noRatedMsg` option value was change to "Not rated yet!";
+ The `score` argument of `click` callback now is number instead string;
+ The `score` argument of `mouseover` callback now is number instead string;
+ The option `mouseover` no longer will trigger on mouseout. Use `mouseout`;
+ When `precision` is enabled, `half` becomes enabled and `targetType` is changed to 'score';
+ When `readOnly` is true, the cursor style will be removed instead to use the default.

### Fixes

+ The `click` function was not yielding the event.
+ The `path` always was prepend avoiding absolute or different path for each icon;
+ The `readOnly` function no more unbinds external binds;
+ The `readonly` was not removed on readOnly becames disabled;
+ The `reload` function now is chainable;
+ The `set` function now is chainable.
+ The `targetKeep` was keepping the template even without score;

## 2.4.5

+ Now the error messages is displayed in place of stars to be more visible;
+ Fixed the 'score' function to handle undefined score when we have no vote;
+ Fixed the mouseover function to handle undefined score when we have no vote;
	- For cancel button we get 'null' to know when mouse over it;
+ Fixed multiple mouseout actions on cancel function and mouseout bind;
+ Fixed functions that was not applying not continuing to apply if someone was invalid;
+ Fixed the flag that indicates read-only or not.

## 2.4.0

+ Added the function 'reload' to reload the rating with the current configuration;
+ Added the function 'set' to reload the rating applying new configurations;
+ Added the option 'mouseover' to handle a callback on mouseover the stars; (packowitz)
+ Fixed error when 'start' options receives a string number (eskimoblood);
+ Fixed multiples events when readOnly is applied more then time by public function; (janapol)
+ Now attribute 'hintList' is called just of 'hints';
+ Now attribute 'start' is called as 'score' to make more sense;
+ Now the method 'start' is called as 'score' too.

## 2.1.0

+ Now Raty keeps the state of the elements and no longer depends on ID for each one:
	- The score no longer has ID;
	- The stars images no longer has ID;
	- The stars images no longer has class.
+ Added function 'score' to recover the current score.

## 2.0.0

+ Added option 'halfShow' to just display and separate from the option to vote 'half';
+ Added option 'targetText' to choose default value when there is no score or targetKepp is off;
+ Added option 'precision' to be able rating with precision values, without star representation;
+ Added option 'space' to be able take off the spaces between the star;
+ Added option 'round' to customize the visual rounding of values;
+ Added option 'targetFormat' to customize the target with a template;
+ Added option 'single' to present only the selected star; (suggestion by newcube)
+ Fixed bug in IE 7 that returns void instead undefined when there is no an attribute;
+ Fixed bug that not set custom width when 'readOnly' is enabled;
+ Fixed bug that not set back the hints after disable read only option;
+ Fixed bug that not create cancel button when starts with 'readOnly';
+ Fixed the function cancel() to set the right hint on target score;
+ Fixed the functions start() and click() to set the value on target when 'target' option is enabled;
+ Fixed the functions start() and click() not to be executed when 'readOnly' is enabled;
+ Fixed the 'target' option to work with 'half' and 'precision' option;
+ Fixed the index number given to Raty binded by class without id; ("Remember me, please?")
+ Refactored the code to make it cleanner and faster;
+ Changed the class of the cancel button to 'raty-cancel' to avoid CSS conflicts;
+ Now is possible to use 'start' option as callback function to get start value; (hpgihan)
+ Now the scope of click callback is the raty element as DOM, not jQuery selection, to follow the usual;
+ Now the field score is set to readonly when 'readOnly' is enabled;
+ Now attribute 'iconRange' is represented as a list of object with option to choose starOn and starOff;
+ Now we using the best pratice to build the plugin;
+ Now the plugin is under test with Jasmine and Jasmine jQuery.

## 1.4.3

+ Now public function return the context to be able the chaining;
+ Fixed: the option 'readOnly' brokes the plugin;
+ Prevented the processing of the set of classes in public function.

## 1.4.0

+ Added attribute 'target' to choose a element to display the score when the mouse is on the star;
+ Added attribute 'targetKeep' to keep the selected value on the target element;
+ Added attribute 'targetType' to choose what display in the target element: hint or number;
+ New function called $.fn.raty.cancel() to cancel the rating;
+ Now the action of cancel removes the score value instead set it to zero;
+ Using mouseover when the half star is disabled to avoid to waste actions trigger;
+ Now is possible pass a empty string in the $.fn.raty.start() to cancel the rating;
+ Public functions without specify ID or class is no longer supported.

## 1.3.3

+ Fixed the icon presentation when the start attribute is setted and the iconRange is enabled;
+ Now the click function receives the event as argument. (Eric Wendelin)

## 1.3.2

+ Fixed: the last Raty configuration will not be applied in others targets Raty anymore;
+ Now is possible to use the element as identifier like div.star on direct actions.

## 1.3.0

+ Added attribute size for to choose the size of the icons that will be used;
+ Added attribute width for to choose the container width of the stars;
+ Changed the name of the attribute showCancel to just cancel.

## 1.2.1

+ Fixed half star when click function is enabled.

## 1.2.0

+ Added support to half star selection;
+ Changed the name of the attribute onClick to just click;
+ Changed the name of the attribute showHalf to half, because of the selection support.

## 1.0.1

+ Fixed the ID's auto generation to work in IE6 and IE7.

## 1.0.0

+ Now you can pass a optionally ID or a class to be the target of the public function's actions;
+ Fixed the read-only that wasn't begin applied by the public function readOnly.

## 0.9

+ Improved the selector to accept bind by class name;
+ Now if you don't pass a ID for the element, then it will be created;
+ Now the hint list will be applied even if the quantity are less than the stars.

## 0.8

+ Added iconRange attribute. Now you can set custom icons for especific ranges;
+ Fixed the cancel button that didn't hidden when using the public function readOnly.

## 0.7

+ Added noRatedMsg attribute. A hint for no rated elements when it's read-only;
+ Avoided negative star number in public function start;
+ Avoided a number bigger than the number of star in public function start;
+ Fixed the public function start when the star are read-only and is not passed a start value;
+ Fixed the half star function on it is made by public function start.

## 0.6

+ Now you can use the key "this" to refer the star element itself in the onClick handler;
+ Fixed the reference context when using public functions or local functions;
+ When the stars are read-only, all titles are transformed in the corresponding title score;
+ Avoided negative star number;
+ Avoided more than 20 stars. But it's can be changed in the script if you need.

## 0.5

+ Now you can put a cancel button to cancel your rating;
+ Choose the cancel image off;
+ Choose the cancel image on;
+ Choose the left or right side position for the cancel button;
+ Change the hint of the cancel button.

## 0.4

+ Added support to display half star.

## 0.3

+ Fixed some mistakes to work on IE browser.

## 0.2

+ Added the public function click, that do the click on a star;
+ Was removed the execution of the onClick when used the function start;
+ Added onClick function that enable a callback when a star is clicked.

## 0.1

+ Change the path of images;
+ Change the name image files;
+ Choose the number of stars that will be presented;
+ Choose a hint information of each star;
+ Start with a default score;
+ Set the stars read-only;
+ Choose the name of the hidden score field.
