// 7.0 Diplay recipe on page recipe.html
$(document).ready(function () {
    try {
        let recipeName = window.location.search.split('?')[1].split('=')[0];
        let recipeId = window.location.search.split('?')[1].split('=')[1];
        if (recipeName == "id") {
            let currentRecipe = recipeArray.find(function (el) { return el['id'] == recipeId });
            if (recipeId == currentRecipe['id']) {
                $('#title').html(currentRecipe['title']);
                $('#category').html('<span class="category">Category:</span> ' + currentRecipe['category']);
                let ingredients = currentRecipe['ingredients'].split(';').map(function (val) {
                    return val.split(':');
                });
                for (let j = 0; j < ingredients.length - 1; j++) {
                    $('#ingredients-list').append('<li>' + ingredients[j][2] + ' <span><span>' + ingredients[j][0] + '</span> ' + ingredients[j][1] + '</span></li>')
                }
                if (currentRecipe['img'] != "undefined") {
                    $('#picture').toggleClass('picture');
                    $('#picture img').attr('src', currentRecipe['img']);
                }
                let things = currentRecipe['things'].split(';');
                for (let k = 0; k < things.length - 1; k++) {
                    $('#things').append('<li>' + things[k] + '</li>');
                }
                $('#timeOfMaking').html('Time to Make: ' + currentRecipe['time']);
                $('#servings').text(currentRecipe['portions']);
                $('#recipeText').html(currentRecipe['recipe']);
                $('#edit-recipe').on('click', function () {
                    let url = window.location.href.split('recipe')[0];
                    window.location.href = url + "index.html?update=" + currentRecipe['id'];
                });
                $('#delete-recipe').on('click', function () {
                    dbAction.execDB('delete', currentRecipe['id'], 'recipe');
                    let url = window.location.href.split('recipe')[0];
                    window.location.assign(url);
                });
            } else {
                $('body').html('<div align="center"><h2>404 Error. Recipe was not found!</h2></div>');
            }
        }
    }
    catch (err) {
        $('body').html('<div align="center"><h2>404 Error. Recipe was not found!</h2></div>');
    }
});
