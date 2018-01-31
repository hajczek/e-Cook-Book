// TO BE IMPROVED...
// file to gather user input data and make calls to send it to the server.
var pushToDb;
// Send the user image to the server.
const sendImg = function() {
    const myImg = $("#inputImg")[0].files[0];
    if (myImg) { //checks if there is a file inputted
        const data = new FormData();
        data.append("pic", myImg, myImg.name);
        $.ajax({
            url: "assets/lib/verify_img.php",
            data: data,
            processData: false,
            contentType: false,
            method: "POST",
            success: function(response) { //add confirmation that file was uploaded, or error if it wasn't
                if(response.split(';')[1] != undefined){
                  pushToDb = response.split(';')[1];
                  $('#imgAlert').remove();
                  $('#imageload').append("<div id='imgAlert' class='alert alert-success'>"+response.split(';')[0]+"</div>");
                }else{
                  $('#imgAlert').remove();
                  $('#imageload').append("<div id='imgAlert' class='alert alert-danger'>"+response+"</div>");//temporarily only in console.log
                };
            }
        })
    }
    else {
    alert("no file chosen");
    }
}



// TODO: Gather all user inputs and make calls to dbAction module.
//Handler method for form submit
const gatherData = function(data) {
    console.log("in gatherData function");
    if(pushToDb != undefined){
      dbAction.execDB('insert','','recipe', data + "&recipeImage=assets/uploads/" + pushToDb);
    }
}

$(document).ready(function(){

  function refreshCat(cat){
    cat.children().remove();
    for(let i=0;i<categoryArray.length;i++){
      cat.append("<option value='"+i+"'>"+categoryArray[i]['name']+"</option>");
    };
  };
  function refreshIngrCat(ingrcat){
    ingrcat.children().remove();
    for(let i=0;i<ingrArray.length;i++){
      ingrcat.append("<option value='"+ingrArray[i]['id']+"'>"+ingrArray[i]['name']+"</option>");
    };
  };

  // Listener for form submit
  $("#pushData").on("click", function(e) {
    e.preventDefault();
    var ser = $('#dataFrm').serialize();
    console.log(ser);
    gatherData(ser);
  });


  //listener for image upload
  $('#sendImg').on('click',sendImg);
  //inset new Category to DB
  $('#addCatSubmit').on('click', function(){
    const addCatVal = $('#addCatInput').val();
    dbAction.execDB('insert', '', 'category', 'catName='+addCatVal);
    refreshCat($('#recips-category'));
    refreshCat($('#seeCategory'));

  });
  refreshCat($('#recips-category'));
  refreshCat($('#seeCategory'));
  //insert new ingredient category
  $('#addIngrCatSubmit').on('click', function(){
    const addIngrCatVal = $('#addIngrCatInput').val();
    dbAction.execDB('insert', '', 'ingredients', 'ingrCatName='+addIngrCatVal)
    refreshIngrCat($('#ingrCategory'));
    refreshIngrCat($('#seeIngrCategory'));
  });
  refreshIngrCat($('#ingrCategory'));
  refreshIngrCat($('#seeIngrCategory'));

  //add ingredients to a category of ingredientsDrop
  $('#addIngrSubmit').on('click', function(){
    let addIngrVal = $('#addIngrValues').val();
    let addIngrValCat = $('#ingrCategory').val();
    for(let i=0;i<ingrArray.length;i++){
      if(ingrArray[i]['id'] == addIngrValCat){
        if(ingrArray[i]['ingr'] != null){
          addIngrVal = ingrArray[i]['ingr']+','+addIngrVal;
        };
        dbAction.execDB('update', addIngrValCat, 'ingredients', 'ingrCatName='+ingrArray[i]['name']+'&ingrCatVal='+addIngrVal);
      };
    };
  });
  //Add needed things to left list
  $('#addThings').on('click', function(){
    let things = $('#addThingsInput').val();
    $('#list-of-needed-things').append('<li class="position">'+things+'<button class="menue-btn float-right btn-position" type="button" name="button">Delete</button></li>');
  });
  // add recipes based on the selected category
  $('#show-recipes-btn').on('click', function(){
    let catRid = $('#seeCategory').val();
    $('#categoryTitle').html(categoryArray[catRid]['name']);
    $('#categoryRecipeTitles').children().remove();
    for(let j=0;j<recipeArray.length;j++){
      if(recipeArray[j]['category'] == categoryArray[catRid]['name']){
        $('#categoryRecipeTitles').append('<li><input class="box" type="checkbox"><label><a href="recipe.html?id='+recipeArray[j]['id']+'" target="_blank">'+recipeArray[j]['title']+'</a></label></li>');
        $('#categorySeeRecipe').on('click', function(){
          window.open('recipe.html?id='+recipeArray[j]['id'], '_blank');
        });

      };
    }
  });
});
