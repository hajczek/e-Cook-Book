// 7.0 Diplay recipe on page recipe.html
$(document).ready(function(){
  let recipeName = location.search.split('?')[1].split('=')[0];
  let recipeId = location.search.split('?')[1].split('=')[1];
  if(recipeName == "id"){
    var index = dbAction.recipeArray.find(function(el){
      if(el['id'] == recipeId){
        $('#title').html(el['title']);
        $('#category').html('<span class="category">Category:</span> '+el['category']);
        let ingredients = el['ingredients'].split(';').map(function(val){
          return val.split(':');
        });
        for(let j=0;j<ingredients.length-1;j++){
          $('#ingredients-list').append('<li>'+ingredients[j][2]+' <span><span>'+ingredients[j][0]+'</span> '+ingredients[j][1]+'</span></li>')
        }
        $('#picture img').attr('src',el['img']);
        let things = el['things'].split(';');
        for(let k=0;k<things.length-1;k++){
          $('#things').append('<li>'+things[k]+'</li>');
        }
        $('#timeOfMaking').html('Time to Make: '+el['time']);
        $('#servings').text(el['portions']);
        recipeText = el['recipe'].split(';');
        $('#recipeText').html('<ul></ul>');
        for(let l=0;l<recipeText.length-1;l++){
          $('#recipeText ul').append('<li>'+recipeText[l]+'</li>');
        }
      }else{
        alert("The recipe was not found!");
      }
    });
  }
});
