<?php
$action = $_POST["action"];
$rid = $_POST["rid"];
$recipe = $_POST["recipe"];
$ingredients = $_POST["ingredients"];
$title = $_POST["title"];
$category = $_POST["category"];
$timeMaking = $_POST["timeMaking"];
$noPortions = $_POST["noPortions"];
$recipeImage = $_POST["recipeImage"];
$thingsNeeded = $_POST["thingsNeeded"];
$table = $_POST["table"];
$ingrCatName = $_POST["ingrCatName"];
$catName = $_POST["catName"];

$db = new SQLite3("recipes.db");
if ($table == "recipe"){
	if ($action == "insert"){
		$insert = "INSERT INTO recipe ('title', 'ingredients', 'recipe', 'category', 'time', 'portions', 'img', 'things') VALUES('$title','$ingredients', '$recipe','$category','$timeMaking','$noPortions', '$recipeImage', '$thingsNeeded')";
		$db->exec($insert);
	}else if($action == "delete"){
		$delete = "DELETE FROM recipe WHERE id='$rid'";
		$db->exec($delete);
	}else if($action == "update"){
		$update = "UPDATE recipe SET 'title'='$title', 'ingredients'='$ingredients', 'recipe'='$recipe', 'category'='$category', 'time'='$timeMaking', 'portions'='$noPortions', 'img'='$recipeImage', 'things'='$thingsNeede' WHERE id='$rid'";
		$db->exec($update);
	};
}else if($table == "ingredients"){
	if ($action == "insert"){
		$insert = "INSERT INTO ingredients ('name') VALUES('$ingrCatName')";
		$db->exec($insert);
	}else if($action == "delete"){
		$delete = "DELETE FROM ingredients WHERE id='$rid'";
		$db->exec($delete);
	}else if($action == "update"){
		$update = "UPDATE ingredients SET 'name'=$ingrCatName";
		$db->exec($update);
	};
}else if($table == "category"){
	if ($action == "insert"){
		$insert = "INSERT INTO category ('name') VALUES('$catName')";
		$db->exec($insert);
	}else if($action == "delete"){
		$delete = "DELETE FROM category WHERE id='$rid'";
		$db->exec($delete);
	}else if($action == "update"){
		$update = "UPDATE category SET 'name'=$catName";
		$db->exec($update);
	};
};
$db->close();

?>