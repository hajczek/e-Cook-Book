<?php 
//TO BE IMPROVED

$img = $_FILES["pic"];
$name = $img["name"];
$destination = "../" . "uploads/" . $name;
if (! file_exists($destination)) {
    if (move_uploaded_file($img["tmp_name"], $destination)) {
        echo "File uploaded successfully.";
    }
    else {
        echo "error while moving file.";
    }
}
else {
    echo "Upload unsuccessful. A file with that name already exists!";
}
?>