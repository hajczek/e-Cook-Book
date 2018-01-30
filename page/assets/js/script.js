
// Functionalities for 'e-Cook-Book'

// TODO: switches files with style css

function savePink(){
  	localStorage.setItem('link', 'assets/css/recipe.css');
  	$('link[media=screen]').attr({href: localStorage.getItem('link')});
  };
  function saveBlue(){
  	localStorage.setItem('link', 'assets/css/recipe-blue.css');
  	$('link[media=screen]').attr({href: localStorage.getItem('link')});
  };
  function saveGreen(){
  	localStorage.setItem('link', 'assets/css/recipe-green.css');
  	$('link[media=screen]').attr({href: localStorage.getItem('link')});
  };
  function displayLink(){
  	if(localStorage.getItem('link') != null){
  		$('link[media=screen]').attr({href: localStorage.getItem('link')});
  	}
  };
  displayLink();

// for JQuery

$(document).ready(function() {
	
 // TODO: listeners for buttons switches files with style css
	  
$('#css-pink').on('click', savePink);
$('#css-blue').on('click', saveBlue);
$('#css-green').on('click', saveGreen); 


}); // on document ready
