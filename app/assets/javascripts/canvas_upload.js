/* Canvas Upload Handler with Jo! */

$(document).ready(function() {
	if($('#canvas').length) {
		// TODO: This script should be conditionally included only on new & edit pages
		var dropbox = document.getElementById("canvas")

		// init event handlers
		dropbox.addEventListener("dragenter", dragEnter, false);
		dropbox.addEventListener("dragexit", dragExit, false);
		dropbox.addEventListener("dragover", dragOver, false);
		dropbox.addEventListener("drop", drop, false);
	
		// Save canvas
	    $('#new_post, form.edit_post').submit(function() {
	      $('#post_attachment64').val(dropbox.toDataURL("image/jpeg"));
	    });
	
		// Resize Canvas
		pjsReadyFn['auto_resize'] = function() {
			r();
			$(window).resize(function() { r(); })
			function r() {
				// work out max size @ 3 to 2 aspect ratio
				cw = $('#canvas_container').width();
				ch = $(window).height() - $('nav.user').height() - 40;
				w = cw;
				h = (cw/3)*2
				if(h > ch) {
					h = ch;
					w = (ch/2)*3; 
				}
				resizeCanvas(w,h);
			}
		}
	}
	
});

function dragEnter(evt) {
	evt.stopPropagation();
	evt.preventDefault();
}

function dragExit(evt) {
	evt.stopPropagation();
	evt.preventDefault();
}

function dragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
}

function drop(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var files = evt.dataTransfer.files;
	var count = files.length;

	// Only call the handler if 1 or more files was dropped.
	if (count > 0)
		handleFiles(files);
}

var objImage;
var reader;

function handleFiles(files) {
	var file = files[0];

	reader = new FileReader();

	// init the reader event handlers
	//reader.onprogress = handleReaderProgress;
	reader.onloadend = handleReaderLoadEnd;

	// begin the read operation
	reader.readAsDataURL(file);
}
/*
function handleReaderProgress(evt) {
	if (evt.lengthComputable) {
		var loaded = (evt.loaded / evt.total);

		$("#progressbar").progressbar({ value: loaded * 100 });
	}
}
*/

//////////////////////////////////////////
// Linking functions to processing stuff
//////////////////////////////////////////

// On Ready handler:
// Add functions to this object to be called when Processing is ready
var pjsReadyFn = {}
function processingReady() {
	for(f in pjsReadyFn) {
		pjsReadyFn[f]();
	}
}

function imageLoaded(evt)
{    
     var p=Processing.getInstanceById('canvas');
	p.setImage( reader.result );
}

function handleReaderLoadEnd(evt) {
	var p=Processing.getInstanceById('canvas');
	p.setImage( evt.target.result );
}

// This is called by embedded JS to load approriate image on edit pages
function loadRemoteImage(img) {
	var p=Processing.getInstanceById('canvas');
	console.log(p);
	p.setImage(img);
}

function resizeCanvas(w, h) {
	var p=Processing.getInstanceById('canvas');
	p.resizeCanvas(w, h);
}