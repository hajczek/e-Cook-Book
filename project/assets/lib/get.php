<?php
$table = $_POST['table'];
$db = new SQLite3('recipes.db');
if($table == "recipe"){
    $sql = "SELECT * FROM recipe";
    $result = $db->query($sql);
    $arr = array();
    $i=0;
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $arr[$i]['id'] = $row['id'];
        $arr[$i]['title'] = $row['title'];
        $arr[$i]['ingredients'] = $row['ingredients'];
        $arr[$i]['recipe'] = $row['recipe'];
        $arr[$i]['category'] = $row['category'];
        $arr[$i]['time'] = $row['time'];
        $arr[$i]['portions'] = $row['portions'];
        $arr[$i]['img'] = $row['img'];
        $arr[$i]['things'] = $row['things'];

        $i++;
    }
}else if($table == "ingredients"){
    $sql = "SELECT * FROM ingredients";
    $result = $db->query($sql);
    $arr = array();
    $i=0;
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $arr[$i]['id'] = $row['id'];
        $arr[$i]['name'] = $row['name'];
        $i++;
    }
}else if($table == "category"){
    $sql = "SELECT * FROM category";
    $result = $db->query($sql);
    $arr = array();
    $i=0;
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $arr[$i]['id'] = $row['id'];
        $arr[$i]['name'] = $row['name'];

        $i++;
    }
}

echo json_encode($arr);
$db->close();
?>
