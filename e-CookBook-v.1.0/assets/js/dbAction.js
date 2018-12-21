var recipeArray, categoryArray, ingrArray;
var dbAction = function () { // name of the module
	// vars to use in methods and export
	var execDB = function (action, rid, table, obj) { // method for insert, update and delete data from DB;
		var str = obj + "&action=" + action + "&rid=" + rid + "&table=" + table;
		// cut apostrophs from text recipe
		var str2 = str.replace("'", "");
		$.ajax({
			async: false,
			method: "POST",
			url: 'assets/lib/put.php',
			data: str2
		})
			.done(function (msg) {
				console.log("Data not Saved - str: " + str);
				console.log("Data not Saved - str2: " + str2);
				// console.log( "Data Saved: " + msg );
				handleResponse(msg);
				dbAction.getFromDB(table);
			})
			.fail(function (msg) {
				console.log("Data not Saved - str: " + str);
				console.log("Data not Saved - str2: " + str2);
				// console.log( "Data not Saved: " + msg );
				$('#saveContainer').append("<div id='recipeAlert' class='alert alert-danger'>" + msg + "</div>");
			});
	};

	var getFromDB = function (table) { // method for updating after execDB did it's job or initialize the arrays;
		$.ajax({
			async: false,
			method: "POST",
			url: 'assets/lib/get.php',
			data: { table: table },
			success: function (d) {
				if (table == "recipe") {
					recipeArray = JSON.parse(d);
				} else if (table == "category") {
					categoryArray = JSON.parse(d);
				} else if (table == "ingredients") {
					ingrArray = JSON.parse(d);
				}
			}
		});
	};
	var init = function () { // initialize the link to the php files that querie the DB;
		getFromDB("recipe");
		getFromDB("category");
		getFromDB("ingredients");
	};
	init();

	return {
		execDB: execDB, // export the method for inserting or deleting data from DB;
		getFromDB: getFromDB, // export the method for for updating the data into arrays;
		init: init // export the method to initialize the php files;
	};
}();
