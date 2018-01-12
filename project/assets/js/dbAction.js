var dbAction = (function(){ // naem of the module
	var recipe,category,ingr,getFile,putFile;  // vars to use in methods and export
	
	var execDB = function(action, rid, table, obj) { // method for insert, update and delete data from DB;
		var str = obj+"&action="+action+"&rid="+rid+"&table="+table;
		$.ajax({
			method: "POST",
			url: putFile,
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

	var getFromDB = function(table){ // method for updating after execDB did it's job or initialize the arrays;
		$.ajax({
			method: "POST",
			url: getFile,
			data: {table:table},
			success: function(d){
				if(table === "recipe"){
					dbAction.recipeArray  = JSON.parse(d);
				}else if(table === "category") {
					dbAction.categoryArray  = JSON.parse(d);
				}else if(table === "ingredients"){
					dbAction.ingrArray  = JSON.parse(d);
				};
			}
		});
	};
	var init= function(file1,file2){ // initialize the link to the php files that querie the DB;
		putFile = file1;
		getFile = file2;
		dbAction.getFromDB("recipe");
		dbAction.getFromDB("category");
		dbAction.getFromDB("ingredients");
	};

	return {
		execDB: execDB, // export the method for inserting or deleting data from DB;
		getFromDB: getFromDB, // export the method for for updating the data into arrays;
		init: init, // export the method to initialize the php files;
		recipeArray: recipe, //array of recipes;
		categoryArray: category, // array of categories;
		ingrArray: ingr // array of ingredients categories;
	};
})();