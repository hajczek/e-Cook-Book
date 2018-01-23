var dbAction = (function(){ // naem of the module
	var recipe,category,ingr;  // vars to use in methods and export

	var execDB = function(action, rid, table, obj) { // method for insert, update and delete data from DB;
		var str = obj+"&action="+action+"&rid="+rid+"&table="+table;
		$.ajax({
			method: "POST",
			url: 'assets/lib/put.php',
			data: str
		})
		.done(function( msg ) {
			console.log( "Data Saved: " + msg );
			dbAction.getFromDB(table);
		})
		.fail(function( msg ) {
			console.log( "Data not Saved: " + msg );
		});
	};

	var getFromDB = function(table,callback){ // method for updating after execDB did it's job or initialize the arrays;
		$.ajax({
			async: false,
			method: "POST",
			url: 'assets/lib/get.php',
			data: {table:table},
			success: function(d){
			    if(table === "recipe"){
					recipe  = JSON.parse(d);
				}else if(table === "category") {
					category  = JSON.parse(d);
				}else if(table === "ingredients"){
					ingr  = JSON.parse(d);
				}
			}
		});
	};
	var init= function(){ // initialize the link to the php files that querie the DB;
		getFromDB("recipe");
		getFromDB("category");
		getFromDB("ingredients");
	};
	init();

	return {
		execDB: execDB, // export the method for inserting or deleting data from DB;
		getFromDB: getFromDB, // export the method for for updating the data into arrays;
		init: init, // export the method to initialize the php files;
		recipeArray: recipe, //array of recipes;
		categoryArray: category, // array of categories;
		ingrArray: ingr // array of ingredients categories;
	};
})();
