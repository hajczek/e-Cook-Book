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
      $('#imgAlert').remove();
      $('#imageload').append("<div id='imgAlert' class='alert alert-danger'>Please select photo first.</div>");
    }
}



// TODO: Gather all user inputs and make calls to dbAction module.
//Handler method for form submit
const gatherData = function(data) {
  dbAction.execDB('insert','','recipe', data + "&recipeImage=assets/uploads/" + pushToDb);
};

const handleResponse = function(msg) {
  const dataArr = msg.split(";");
  const len = dataArr.length;
  if (dataArr[len-2] === "recipeInsert") {
    if (Number(dataArr[len-1]) >= 1) {
      console.log("success");
      window.location.reload();
    }
    else {
      $('#recipeAlert').remove();
      $('#saveContainer').append("<div id='recipeAlert' class='alert alert-danger'>Saving the recipe failed.</div>");
    }
  }
};

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
      ingrcat.append("<option data-ingrid='"+i+"' value='"+ingrArray[i]['id']+"'>"+ingrArray[i]['name']+"</option>");
    };
  };

  // Listener for form submit
  $("#pushData").on("click", function(e) {
    e.preventDefault();
    let ser = $('#dataFrm').serialize();
    let cat = categoryArray[$('#recips-category').val()]['name'];
    ser += "&category="+cat;
    let ingredients = "";
    let ingredientsList = $('#list-of-ingredients li');
    ingredientsList.each(function(idx){
      let ingrName = this.childNodes[0].data.slice(0,-1);
      let ingrQty = this.childNodes[1].innerText;
      let ingrUnit = this.childNodes[2].data.slice(1);
      ingredients += ingrQty+":"+ingrUnit+":"+ingrName+";";
    });
    ser += "&ingredients="+ingredients;
    let needeThings = "";
    let neededThingList = $('#list-of-needed-things li');
    neededThingList.each(function(idx){
      needeThings += this.childNodes[0].data+";";
    });
    ser += "&thingsNeeded="+needeThings;
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
    $('#list-of-needed-things').append('<li class="position">'+things+'<button class="menue-btn btn-position" type="button" name="button">Delete</button></li>');
  });
  // add recipes based on the selected category
  function addCatRecipes(){
    let catRid = $('#seeCategory').val();
    $('#categoryTitle').html(categoryArray[catRid]['name']);
    $('#categoryRecipeTitles').children().remove();
    for(let j=0;j<recipeArray.length;j++){
      if(recipeArray[j]['category'] == categoryArray[catRid]['name']){
        $('#categoryRecipeTitles').append('<li><input class="box" type="checkbox"><label data-recipeid="'+recipeArray[j]['id']+'"><a href="recipe.html?id='+recipeArray[j]['id']+'" target="_blank">'+recipeArray[j]['title']+'</a></label></li>');
      };
    }
  };
  $('#show-recipes-btn').on('click', addCatRecipes);
  //add ingredients based on selected ingredients category
  function addIngredients(){
    let ingrRid = $('#seeIngrCategory option:selected').attr('data-ingrid');
     $('#ingrTitle').html(ingrArray[ingrRid]['name']);
     $('#ingredientsTitles').children().remove();
     let ingredients = ingrArray[ingrRid]['ingr'].split(',');
     for(let i=0;i<ingredients.length;i++){
       $('#ingredientsTitles').append('<li class="position"><input type="checkbox"><label data-id="'+ingrArray[i]['id']+'" data-ingrname="'+ingredients[i]+'">'+ingredients[i]+'</label><input class="box" type="" name="quantity" value="Qty"><input class="box" type="text" name="unit" value="Unit"></li>');
     };
  };
  $('#show-ingredients-popup-btn').on('click', addIngredients);

  //delete recipes from category drop down
  function deleteRecipe(){
    for (let n = 0; n < $("#categoryRecipeTitles li input:checked").length; n++){
      let dataRecipeId = $("#categoryRecipeTitles li input:checked:eq(" + n + ") ~ label");
      let rid = dataRecipeId.attr('data-recipeid');
      dbAction.execDB('delete', rid, 'recipe');
    }
    addCatRecipes();
  };
  $('#delete-recipes').on('click', deleteRecipe);
  //delete chosen ingredients in pop-up
  function deleteIngr(){
    let data=[];
    let ingredArrayId = $('#seeIngrCategory option:selected').attr('data-ingrid');
    let ingrId = $('#seeIngrCategory option:selected').val();
    let ingredients = ingrArray[ingredArrayId]['ingr'].split(',');
    for(let n=0;n< $('#ingredientsTitles li input:checked').length;n++){
      let dataIngrId = $('#ingredientsTitles li input:checked:eq('+n+') ~ label');
      //let ingrId = dataIngrId.attr('data-id');
      let ingredientName = dataIngrId.attr('data-ingrname');

      ingredients.forEach(function(el,idx){
        if(el == ingredientName){
          ingredients.splice(idx,1);
        };
      });
    };
    afterDelIngr = ingredients.join(',');
    dbAction.execDB('update', ingrId, 'ingredients', 'ingrCatName='+ingrArray[ingredArrayId]['name']+'&ingrCatVal='+afterDelIngr);
    console.log(afterDelIngr);
    addIngredients();
  };
  $('#delete-ingredients').on('click', deleteIngr);
  // delete a category button listener
  $('#delete-recipes-btn').on('click', function(){
    let catRid = categoryArray[$('#seeCategory').val()]['id'];
    dbAction.execDB('delete', catRid, 'category');
    refreshCat($('#recips-category'));
    refreshCat($('#seeCategory'));
  });
  // delete a category of ingredient listener
  $('#delete-ingrCat-btn').on('click', function(){
    let ingrRid = $('#seeIngrCategory option:selected').val();
    dbAction.execDB('delete', ingrRid, 'ingredients');
    refreshIngrCat($('#ingrCategory'));
    refreshIngrCat($('#seeIngrCategory'));
  });

});
