// 7.0 Diplay recipe on page recipe.html
$(document).ready(function(){
  try{
  let recipeName = window.location.search.split('?')[1].split('=')[0];
  let recipeId = window.location.search.split('?')[1].split('=')[1];

  if(recipeName == "id"){
    recipeArray.find(function(el){
      if(el['id'] == recipeId){
        $('#title').html(el['title']);
        $('#category').html('<span class="category">Category:</span> '+el['category']);
        let ingredients = el['ingredients'].split(';').map(function(val){
          return val.split(':');
        });
        for(let j=0;j<ingredients.length-1;j++){
          $('#ingredients-list').append('<li>'+ingredients[j][2]+' <span><span>'+ingredients[j][0]+'</span> '+ingredients[j][1]+'</span></li>')
        }
        $('#picture').toggleClass('picture');
        $('#picture img').attr('src',el['img']);
        let things = el['things'].split(';');
        for(let k=0;k<things.length-1;k++){
          $('#things').append('<li>'+things[k]+'</li>');
        }
        $('#timeOfMaking').html('Time to Make: '+el['time']);
        $('#servings').text(el['portions']);
        $('#recipeText').html(el['recipe']);
      }
    });
  }
}
catch(err) {

}
});
