// TO BE IMPROVED...
// file to gather user input data and make calls to send it to the server.
var pushToDb;
// Send the user image to the server.
const sendImg = function () {
  const myImg = $("#inputImg")[0].files[0];
  if (myImg) { //checks if there is a file inputted
    const data = new FormData();
    data.append("pic", myImg, myImg.name);
    $.ajax({
      async: false,
      url: "assets/lib/verify_img.php",
      data: data,
      processData: false,
      contentType: false,
      method: "POST",
      success: function (response) { //add confirmation that file was uploaded, or error if it wasn't
        if (response.split(';')[1] != undefined) {
          pushToDb = "assets/uploads/" + response.split(';')[1];
          $('#imgAlert').remove();
          $('#imageload').append("<div id='imgAlert' class='alert alert-success'>" + response.split(';')[0] + "</div>");
        } else {
          $('#imgAlert').remove();
          $('#imageload').append("<div id='imgAlert' class='alert alert-danger'>" + response + "</div>");//temporarily only in console.log
        };
      }
    })
  }
  else {
    $('#imgAlert').remove();
    $('#imageload').append("<div id='imgAlert' class='alert alert-danger'>Please select photo first.</div>");
  }
}


$(document).ready(function () {

  function refreshCat(cat) {
    cat.children().remove();
    for (let i = 0; i < categoryArray.length; i++) {
      cat.append("<option value='" + i + "'>" + categoryArray[i]['name'] + "</option>");
    };
  };
  function refreshIngrCat(ingrcat) {
    ingrcat.children().remove();
    for (let i = 0; i < ingrArray.length; i++) {
      ingrcat.append("<option data-ingrid='" + i + "' value='" + ingrArray[i]['id'] + "'>" + ingrArray[i]['name'] + "</option>");
    };
  };

  // Listener for form submit
  function UploadData(action, id) {
    $("#pushData").on("click", function (e) {
      // console.log('clicked');
      e.preventDefault();
      let ser = $('#dataFrm').serialize();
      let cat = categoryArray[$('#recips-category').val()]['name'];
      ser += "&category=" + cat;
      let ingredients = "";
      let ingredientsList = $('#list-of-ingredients li');
      ingredientsList.each(function (idx) {
        let ingrName = this.childNodes[0].data.slice(0, -1);
        let ingrQty = this.childNodes[1].innerText;
        let ingrUnit = this.childNodes[2].data.slice(1);
        ingredients += ingrQty + ":" + ingrUnit + ":" + ingrName + ";";
      });
      ser += "&ingredients=" + ingredients;
      let needeThings = "";
      let neededThingList = $('#list-of-needed-things li');
      neededThingList.each(function () {
        needeThings += this.childNodes[0].data + ";";
      });
      // console.log(needeThings);
      ser += "&thingsNeeded=" + needeThings;
      // console.log(ser);
      dbAction.execDB(action, id, 'recipe', ser + "&recipeImage=" + pushToDb);
    });
  };

  //listener for image upload
  $('#sendImg').on('click', sendImg);
  //inset new Category to DB
  $('#addCatSubmit').on('click', function () {
    const addCatVal = $('#addCatInput').val();
    if (addCatVal !== '') {
      dbAction.execDB('insert', '', 'category', 'catName=' + addCatVal);
      refreshCat($('#recips-category'));
      refreshCat($('#seeCategory'));
      $('#addCatInput').val('');
    } else {
      alert('A name of added category of a recipes is needed.');
    }
  });
  refreshCat($('#recips-category'));
  refreshCat($('#seeCategory'));
  // Insert new ingredient category
  $('#addIngrCatSubmit').on('click', function () {
    const addIngrCatVal = $('#addIngrCatInput').val();
    if (addIngrCatVal !== '') {
      dbAction.execDB('insert', '', 'ingredients', 'ingrCatName=' + addIngrCatVal)
      refreshIngrCat($('#ingrCategory'));
      refreshIngrCat($('#seeIngrCategory'));
      $('#addIngrCatInput').val('');
    } else {
      alert('A name of added category of ingredients is needed.');
    }
  });
  refreshIngrCat($('#ingrCategory'));
  refreshIngrCat($('#seeIngrCategory'));

  // Add ingredients to a category of ingredientsDrop
  $('#addIngrSubmit').on('click', function () {
    let addIngrVal = $('#addIngrValues').val();
    let addIngrValCat = $('#ingrCategory').val();
    if (addIngrVal !== '') {
      for (let i = 0; i < ingrArray.length; i++) {
        if (ingrArray[i]['id'] == addIngrValCat) {
          if (ingrArray[i]['ingr'] != null) {
            addIngrVal = ingrArray[i]['ingr'] + ',' + addIngrVal;
          };
          dbAction.execDB('update', addIngrValCat, 'ingredients', 'ingrCatName=' + ingrArray[i]['name'] + '&ingrCatVal=' + addIngrVal);
        };
      };
      $('#addIngrValues').val('');
    } else {
      alert('A name of added ingredient is needed.');
    }
  });
  // Add needed things to left list
  $('#addThings').on('click', function () {
    let things = $('#addThingsInput').val();
    if (things !== '') {
      $('#list-of-needed-things').append('<li class="position">' + things + '<button class="menue-btn btn-position" type="button" name="button">Delete</button></li>');
      $('#addThingsInput').val('');
    } else {
      alert('A name of added thing is needed.');
    }
  });
  // Add recipes based on the selected category
  function addCatRecipes() {
    let catRid = $('#seeCategory').val();
    $('#categoryTitle').html(categoryArray[catRid]['name']);
    $('#categoryRecipeTitles').children().remove();
    for (let j = 0; j < recipeArray.length; j++) {
      if (recipeArray[j]['category'] == categoryArray[catRid]['name']) {
        $('#categoryRecipeTitles').append('<li><input class="box" type="checkbox"><label data-recipeid="' + recipeArray[j]['id'] + '"><a href="recipe.html?id=' + recipeArray[j]['id'] + '" target="_blank">' + recipeArray[j]['title'] + '</a></label></li>');
      };
    }
  };
  $('#show-recipes-btn').on('click', addCatRecipes);
  // Add ingredients based on selected ingredients category
  function addIngredients() {
    let ingrRid = $('#seeIngrCategory option:selected').attr('data-ingrid');
    $('#ingrTitle').html(ingrArray[ingrRid]['name']);
    $('#ingredientsTitles').children().remove();
    let ingredients = ingrArray[ingrRid]['ingr'].split(',');
    for (let i = 0; i < ingredients.length; i++) {
      $('#ingredientsTitles').append('<li class="position"><input type="checkbox"><label data-ingrname="' + ingredients[i] + '">' + ingredients[i] + '</label><input class="box" type="" name="quantity" value="" placeholder="Qty"><input class="box" type="text" name="unit" value="" placeholder="Unit"></li>');
    };
  };
  $('#show-ingredients-popup-btn').on('click', addIngredients);

  // Delete recipes from category drop down
  function deleteRecipe() {
    for (let n = 0; n < $("#categoryRecipeTitles li input:checked").length; n++) {
      let dataRecipeId = $("#categoryRecipeTitles li input:checked:eq(" + n + ") ~ label");
      let rid = dataRecipeId.attr('data-recipeid');
      dbAction.execDB('delete', rid, 'recipe');
    }
    addCatRecipes();
  };
  $('#delete-recipes').on('click', deleteRecipe);
  // Delete chosen ingredients in pop-up
  function deleteIngr() {
    let data = [];
    let ingredArrayId = $('#seeIngrCategory option:selected').attr('data-ingrid');
    let ingrId = $('#seeIngrCategory option:selected').val();
    let ingredients = ingrArray[ingredArrayId]['ingr'].split(',');
    for (let n = 0; n < $('#ingredientsTitles li input:checked').length; n++) {
      let dataIngrId = $('#ingredientsTitles li input:checked:eq(' + n + ') ~ label');
      //let ingrId = dataIngrId.attr('data-id');
      let ingredientName = dataIngrId.attr('data-ingrname');

      ingredients.forEach(function (el, idx) {
        if (el == ingredientName) {
          ingredients.splice(idx, 1);
        };
      });
    };
    afterDelIngr = ingredients.join(',');
    dbAction.execDB('update', ingrId, 'ingredients', 'ingrCatName=' + ingrArray[ingredArrayId]['name'] + '&ingrCatVal=' + afterDelIngr);
    addIngredients();
  };
  $('#delete-ingredients').on('click', deleteIngr);
  // Delete a category button listener
  $('#delete-recipes-btn').on('click', function () {
    let catRid = categoryArray[$('#seeCategory').val()]['id'];
    dbAction.execDB('delete', catRid, 'category');
    refreshCat($('#recips-category'));
    refreshCat($('#seeCategory'));
  });
  // Delete a category of ingredient listener
  $('#delete-ingrCat-btn').on('click', function () {
    let ingrRid = $('#seeIngrCategory option:selected').val();
    dbAction.execDB('delete', ingrRid, 'ingredients');
    refreshIngrCat($('#ingrCategory'));
    refreshIngrCat($('#seeIngrCategory'));
  });
  try {
    let recipeName = window.location.search.split('?')[1].split('=')[0];
    let recipeId = window.location.search.split('?')[1].split('=')[1];
    if (recipeName = 'update') {
      recipeArray.find(function (el) {
        if (el['id'] == recipeId) {
          $('#title-recipe').val(el['title']);
          categoryArray.forEach(function (element, idx) {
            if (el['category'] == categoryArray[idx]['name']) {
              $('#recips-category').val(idx);
            }
          });
          let ingredients = el['ingredients'].split(';').map(function (val) {
            return val.split(':');
          });
          for (let j = 0; j < ingredients.length - 1; j++) {
            $('#list-of-ingredients').append('<li>' + ingredients[j][2] + ' <span>' + ingredients[j][0] + '</span> ' + ingredients[j][1] + '<button class=\"menue-btn btn-position\" type=\"button\" name=\"button\">Delete</button></li>')
          };
          let things = el['things'].split(';');
          for (let k = 0; k < things.length - 1; k++) {
            $('#list-of-needed-things').append('<li class="position">' + things[k] + '<button class="menue-btn btn-position" type="button" name="button">Delete</button></li>');
          };

          $('#description-of-recipe').val(el['recipe']);
          pushToDb = el['img'];
          $("#uploadedImg").attr("src", pushToDb);
          $("#uploadedImg").css('width', '150px');
          $('#sendImg').on('click', function () {
            if (pushToDb == undefined) {
              pushToDb = el['img'];
            }
          });
          $('#time-to-make').val(el['time']);
          $('#how-many-person').val(el['portions']);
          UploadData('update', el['id']);
          $('#pushData').on('click', function () {
            let link = window.location.origin + window.location.pathname.split('index')[0] + "recipe.html?id=" + recipeId;
            window.location.href = link;
          });
        }
      });
    }
  }
  catch (err) {
    UploadData('insert');
  }
});
