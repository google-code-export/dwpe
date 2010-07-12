/**
 * --------------------------------------------------------------------
 * jQuery customfileinput plugin
 * Author: Scott Jehl, scott@filamentgroup.com
 * Copyright (c) 2009 Filament Group 
 * licensed under MIT (filamentgroup.com/examples/mit-license.txt)
 * --------------------------------------------------------------------
 */
$.fn.customFileInput = function(){
	//apply events and styles for file input element
	var fileInput = $(this)
		.addClass('customfile-input') //add class for CSS
		.mouseover(function(){ upload.addClass('customfile-hover'); })
		.mouseout(function(){ upload.removeClass('customfile-hover'); })
		.focus(function(){ upload.addClass('customfile-focus'); })
		.blur(function(){ upload.removeClass('customfile-focus'); })
		.change(function(){
			//get file name
			var fileName = $(this).val().split(/\\/).pop();
			//get file extension
			var fileExt = 'customfile-ext-' + fileName.split('.').pop().toLowerCase();
			//update the feedback
			uploadFeedback
				.text(fileName) //set feedback text to filename
				.removeClass(uploadFeedback.data('fileExt') || '') //remove any existing file extension class
				.addClass(fileExt) //add file extension class
				.data('fileExt', fileExt) //store file extension for class removal on next change
				.addClass('customfile-feedback-populated'); //add class to show populated state
			//change text of button	
			uploadButton.text('Change');
		})
		.css('opacity',0); //visually hide element
		
	//create custom control container
	var upload = $('<div class="customfile" aria-hidden="true"></div>');
	//create custom control button
	var uploadButton = $('<span class="customfile-button">Browse</span>').appendTo(upload);
	//create custom control feedback
	var uploadFeedback = $('<span class="customfile-feedback">No file selected...</span>').appendTo(upload);
	
	//on mousemove, keep file input under the cursor to steal click
	upload
		.mouseover(function(){
			fileInput.appendTo('body');
		})
		.mouseout(function(){
			fileInput.insertBefore(upload);
		})
		.mousemove(function(e){
			fileInput
			.css({ 
				top: e.pageY - 3, //position 3px above cursor Y
				left: e.pageX - fileInput.outerWidth() + 20 //position right side 20px right of cursor X
			});
		})
		.insertAfter(fileInput); //insert after the input
	//return jQuery
	return $(this);
};