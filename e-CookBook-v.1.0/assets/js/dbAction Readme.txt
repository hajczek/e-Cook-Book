Readme file for utilization of dbAction()

Database format:

	The database named recipes.db is formed of 3 individual tables(recipe, category and ingredients) with the folowing collumns:

	recipe: | id | title | ingredients | recipe | category | time | portions | img | things |

	category : | id | name |

	ingredients: | id | name |

Methods and variables:

	- .execDB(action, id, table, object);

	- .getFromDB(table);

	- .recipeArray

	- .ingrArray

	- .categoryArray

The .execDB(action, id, table, object); method :

	Sends 3 types of operations to be executed ("delete", "insert", "update") to 3 different tables in the database.

	Parameters:

		- 'action' expects one of the folowing strings : "delete", "insert", "update"; acording to the type of operation you want to send.

		- 'id' is used by the "delete" and "update" operations to know what row it should grab and modify. Every insert into the database(either recipe, category or ingredients) will get an unique id that is displayed in the result array as 'id'. 

		- 'table' refers to which table in the database the action is meant to operate to(racipe, category, ingredients).

		- 'object' the string resulted from the .serialize() method to send with POST. Or a string of the next shape: "title=titleOfTheRecipe&recipe=contentOfTheRecipe&ingredients=ingredientsOfTheRecipe"

		Excample:

			<form accept-charset="utf-8">
			<input name="recipe">
			<input name="title">
			<input name="ingredients">
			<input name="category">
			<input name="timeMaking">
			<input name="noPortions">
			<input name="catName">
			<input name="ingredientCatName">
			<input id="cod" type="submit" >
			</form>

			string = $("form").serialize(); outputs the string "recipe=&title=&ingredients=&category=&timeMaking=&noPortions=&catName=&ingredientCatName="

			The names of inputs must be exact as in the example for the php getFile to extract the right data from form.

The .getFromDB(table); method :
	
	Rquests the new arrays based on the table parameter after a modification to the database has been made.

	Parameters:

		- 'table' the table according to the database from where to pull the data


The 3 arrays, .recipeArray, .ingrArray, .categoryArray are the resulting arrays from the getFile queries from which data is displayed on site.


Examples of utilization:

	string = 'recipe=&title=&ingredients=&category=&timeMaking=&noPortions=&catName=&ingredientCatName="; // ussualy obtained from .serialize() method

	dbAction.execDB("insert", "", "recipe", string);  // this method sends the data for insertion as a new row in the table 'recipe' of the databse with the previous string as the object or data to be passed. When inserting the 'id' parameter is not needed because it will be generated on submit.

	dbAction.getFromDB("recipe"); // refreshes the arrays if some modifications have been made to the database. Altough this method is already run when the .execDB() finishes. I used it for testing.
	