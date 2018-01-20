// for JQuery
$(document).ready(function(){
// Needed functionalities for 'e-Cook-Book'


// 1.0. Make a recipe.


// 1.1. Display list of added ingredients with quantity and unit, and option 'delete'.
(function (){$("#List-of-ingredients").on("click","button",function () {
	$(this).parent().remove();
	});
})();

// 1.2. Display list of added needed things with option 'delete'.
(function (){$("#list-of-needed-things").on("click","button",function () {
	$(this).parent().remove();
	});
})();



// 2.0. Additional elements:


// 2.1. Display added image to recipe.

$("#inputImg").on("change", readURL); //event listener for a file upload

//display the selected file by changing the src of the img element to the specified file
function readURL() {
    $("#uploadedImg").attr("src", "");

    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(this.files[0]);    

        //when reader has uploaded file, add it to img src
        reader.onload = function(e) {
            const tempImg = new Image(); //create a temporary Image object to extract image's height and width
            const source = e.target.result;
            tempImg.src = source;

            //after temporary Image created, update src, height and width of the preview - keeping aspect ratio
            tempImg.onload = function(e) {
                const aspectRatio = tempImg.width / tempImg.height; // in order to maintain aspect ratio
                const newWidth = 150; // width of the displayed image
                const newHeight = newWidth / aspectRatio;
                $("#uploadedImg").attr("src", source);
                $("#uploadedImg").css({
                    "width" : newWidth + "px",
                    "height" : newHeight + "px",
                    "max-height" : newWidth +"px",
                });

            }
        }
    }
}


// 2.2. Quantity of persons for which is that recipe - this can be change by user and then the quantity of ingredients must be appropriately adapted to recipe.
// Added for RECIPE.html view, doesn't update database

const recalculateIngredients = (function(){

// get DOM elements
const $servingsBtn = $("#servings-btn");
const $servingsSpan = $("#servings-span");
const $ingredientsList = Array(...$("#ingredients-list li span > span"));

// get & store quantity of ingredients needed for single serving
const servingsMultiplicators = $ingredientsList.map((el) => {
	return Number(el.innerText) / Number($servingsBtn[0].innerText);
});

//event listeners for button & input
$servingsSpan.on("input", "#servings-input", updateIngredients);
$servingsSpan.on("keyup", "#servings-input", reinstateBtn);
$servingsSpan.on("click", "#servings-btn", openServingsForm);

// open input field for adding number of servings changes
 function openServingsForm(){
	const $servingsInputValue = Number($servingsBtn[0].innerText);
	$servingsSpan.html(`<input type="number" name="quantity" id="servings-input" min="1" value="${$servingsInputValue}">`);
}

// recalculate original ingredient quantities & display on page
function updateIngredients(){
	let servingsNumber = Number($("#servings-input").val());

	$ingredientsList.map(function(el, index){
		let quantity = servingsNumber * servingsMultiplicators[index];
		el.innerText = String(quantity);
	});
}
// close input form & display button when enter pressed
function reinstateBtn(e){
	if(e.which == 13){
		$servingsSpan.html(`<button id="servings-btn" type="button" name="button"><span>${$("#servings-input").val()}</span></button>`);
	}
}
})();

// DropDown menu for Recipes, Ingredients and Needed things
(function(){
  $('#recipesDrop').on('click',function(){
    $('#recipesDropForm').slideToggle();
  });
  $('#ingredientsDrop').on('click',function(){
    $('#ingredientsDropForm').slideToggle();
  });
  $('#thingsDrop').on('click',function(){
    $('#thingsDropForm').slideToggle();
  });
})();

// 3.0.  Create categories of recipes.


// 3.1. Add new category of recipe to list of categories of recipes.


// 3.2. Add choosen category of recipes to recipe.


// 3.3. Display list of recipes from choosen category of recipes - button 'See recipes' (in popup).


// 3.4. Delete category of recipes from list of categories of recipes.




// 4.0. Create categories of ingredients.


// 4.1. Add new category of ingredients to list of categories of ingredients.


// 4.2. Add new ingredient to choosen category of ingredients.
(function () {
	function addIngredents () { 
		for (var n=0;n < $("#categories li div ul li input:checked").length;n++){
    			let name = $("#categories ul li input:checked:eq("+n+") ~ label")
    			let quantity = $("#categories ul li input:checked:eq("+n+") ~ input[name = quantity]")
    			let unit = $("#categories ul li input:checked:eq("+n+") ~ input[name = unit]")	
    			let element = name.text()+" <span>"+quantity.val()+"</span> "+unit.val()+"<button type=\"button\" name=\"button\">Delete</button>"
    			$("#List-of-ingredients").append("<li>"+element+"</li>")
		}
		$("#categories ul li input").prop("checked",false)
	}
	
 	$("#categories li div").on("click","button:eq(0)",addIngredents)	
})();

// 4.3. Display list of ingredients (button 'See list') from choosen category (in popup).




// 5.0. Create list of needed things.


// 5.1. Add thing to list of needed things.
(function(){
	function addNeeded() {
		for (var n=0;n < $("#needed-things li input:checked").length;n++){  
			let name = $("#needed-things li input:checked:eq("+n+") ~ label")
			let element = name.text()+" <button type=\"button\" name=\"button\">Delete</button>"
			$("#list-of-needed-things").append("<li>"+element+"</li>")
   		}
		$("#needed-things li input").prop("checked",false)
	}
	
	$("#add-needed-things").on("click",addNeeded)
})();

// 5.2. Display list of needed things (button 'See list') (in popup).




// 6.0. Buttons:


// 6.1. See recipe.

let tester = $("#see-recipe").click(function(){
    
titleRecipe = $("#title-recipe").val();     // 1.0 Add title to recipe

let recipesCategory = $("#recips-category :selected").val();       // add category of recipes

let ingredientsList = $("#List-of-ingredients").text();         // list of ingredients

let neededThings = $("#list-of-needed-things").text();           // list of needed things

let recipeDescription = $("#description-of-recipe").val();            // description of recipe

let imageUpload = $("#uploadedImg").attr("src");         // uploaded Image

let timeToMake = $("#time-to-make").val();          // time to make a recipe

let howMany = $("#how-many-person").val();          // for how many person

alert(titleRecipe + recipesCategory + ingredientsList + neededThings + recipeDescription + timeToMake + howMany);


});



// 6.2. Save recipe.


// 6.3. Edit recipe - on view 'Recipe'.
	
	
// 6.4. Print recipe
	
(function() {	
	/**
	* @description Print page
	* @param {}
	* @param {}
	* @returns {} Opened panel to print page
	*/
	function printProject(){
		$('#input_print').click(function(){
			window.print();
		});
	};
		
	let printInput = $('#input_print');
	
	// TODO: open panel to print
	printInput.on('click', function(){printProject();});
})();	
	
	
// TODO: switch files with style css
	
(function (){
  $("#css-pink").click(function() {
    $("link[media=screen]").attr({href : "assets/css/recipe.css"});
  });
  $("#css-blue").click(function() {
    $("link[media=screen]").attr({href : "assets/css/recipe-blue.css"});
  });
  $("#css-green").click(function() {
    $("link[media=screen]").attr({href : "assets/css/recipe-green.css"});
  });
})();

}); // on document ready
