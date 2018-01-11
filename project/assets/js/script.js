// Needed functionalities for 'e-Cook-Book'


// 1.0. Make a recipe.


// 1.1. Display list of added ingredients with quantity and unit, and option 'delete'.
$("#List-of-ingredients").on("click","button",function () {
	$(this).parent().remove();
});

// 1.2. Display list of added needed things with option 'delete'.
$("#list-of-needed-things").on("click","button",function () {
	$(this).parent().remove();
});




// 2.0. Additional elements:


// 2.1. Display added image to recipe.


// 2.2. Quantity of persons for which is that recipe - this can be change by user and then the quantity of ingredients must be appropriately adapted to recipe.




// 3.0.  Create categories of recipes.


// 3.1. Add new category of recipe to list of categories of recipes.


// 3.2. Add choosen category of recipes to recipe.


// 3.3. Display list of recipes from choosen category of recipes - button 'See recipes' (in popup). 


// 3.4. Delete category of recipes from list of categories of recipes.




// 4.0. Create categories of ingredients.


// 4.1. Add new category of ingredients to list of categories of ingredients.


// 4.2. Add new ingredient to choosen category of ingredients.


// 4.3. Display list of ingredients (button 'See list') from choosen category (in popup).




// 5.0. Create list of needed things.


// 5.1. Add thing to list of needed things.


// 5.2. Display list of needed things (button 'See list') (in popup). 




// 6.0. Buttons:


// 6.1. See recipe.


// 6.2. Save recipe.


// 6.3. Edit recipe - on view 'Recipe'.
