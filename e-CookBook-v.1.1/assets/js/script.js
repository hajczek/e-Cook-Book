
// Functionalities for 'e-Cook-Book'

const handleResponse = function (msg) {
  const dataArr = msg.split(";");
  const len = dataArr.length;
  if (dataArr[len - 2] === "recipeInsert") {
    if (Number(dataArr[len - 1]) >= 1) {
      // console.log("success");
      sessionStorage.setItem('recSave', 'success');
      location.assign(location);
    }
    else {
      $('#recipeAlert').remove();
      $('#saveContainer').append("<div id='recipeAlert' class='alert alert-danger'>Saving the recipe failed.</div>");
    }
  }
};

// for jQuery
$(document).ready(function () {

  //display 'saved recipe' alert
  (function () {
    if (sessionStorage.getItem('recSave') === 'success') {
      const saveModal = $(".saved-modal")[0];
      $(saveModal).css("display", "block");
      setTimeout(function () {
        $(saveModal).css("display", "none");
        sessionStorage.removeItem('recSave');
      }, 2000)
    }
  })();

  // Displays list of added ingredients with quantity and unit, and option 'delete'.
  (function () {
    $("#list-of-ingredients").on("click", "button", function () {
      $(this).parent().remove();
    });
  })();

  // Displays list of added needed things with option 'delete'.
  (function () {
    $("#list-of-needed-things").on("click", "button", function () {
      $(this).parent().remove();
    });
  })();

  /**
    * @description Read url of added image to recipe
    * @param {}
    * @param {}
    * @returns {} Display the selected file by changing the src of the img element to the specified file
    */
  (function () {
    $("#inputImg").on("change", readURL); //event listener for a file upload

    function readURL() {
      $("#uploadedImg").attr("src", "");

      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(this.files[0]);

        // When reader has uploaded file, add it to img src
        reader.onload = function (e) {
          // Create a temporary Image object to extract image's height and width
          const tempImg = new Image();
          const source = e.target.result;
          tempImg.src = source;

          // After temporary Image created, update src, height and width of the preview - keeping aspect ratio
          tempImg.onload = function (e) {
            const aspectRatio = tempImg.width / tempImg.height; // in order to maintain aspect ratio
            const newWidth = 150; // width of the displayed image
            const newHeight = newWidth / aspectRatio;
            $("#uploadedImg").attr("src", source);
            $("#uploadedImg").css({
              "width": newWidth + "px",
              "height": newHeight + "px",
              "max-height": newWidth + "px",
            });
          }
        }
      }
    }

    // Delete uploaded image
    $("#deleteImg").on("click", function () {
      $("#uploadedImg").attr("src", "");
      $("#inputImg").val("");
    });
  })();

  /**
    * @description Quantity of persons for which is that recipe
    * @param {}
    * @param {}
    * @returns {} Recalculates original ingredient quantities & display on page
    */
  (function () {
    var recalculateIngredients = (function () {
      // Get DOM elements
      var $servingsBtn = $("#servings-btn");
      var $servingsSpan = $("#servings-span");
      var $ingredientsList = Array(...$("#ingredients-list li span > span"));

      // Get & store quantity of ingredients needed for single serving
      var servingsMultiplicators = $ingredientsList.map(function (el) {
        return Number(el.innerText) / Number($servingsBtn[0].innerText);
      });

      // Event listeners for button & input
      $servingsSpan.on("input", "#servings-input", updateIngredients);
      $servingsSpan.on("keyup", "#servings-input", reinstateBtn);
      $servingsSpan.on("click", "#servings-btn", openServingsForm);

      // Opens input field for adding number of servings changes
      function openServingsForm() {
        var $servingsInputValue = Number($servingsBtn[0].innerText);
        $servingsSpan.html('<input type="number" name="quantity" id="servings-input" min="1" value="' + $servingsInputValue + '">');
      }

      // Recalculates original ingredient quantities & display on page
      function updateIngredients() {
        var servingsNumber = Number($("#servings-input").val());

        $ingredientsList.map(function (el, index) {
          var quantity = (servingsNumber * servingsMultiplicators[index]).toFixed(2);
          el.innerText = String(quantity);
        });
      }
      // Closes input form & display button when enter pressed
      function reinstateBtn(e) {
        if (e.which == 13) {
          $servingsSpan.html('<button id="servings-btn" type="button" name="button"><span>' + $("#servings-input").val() + '</span></button>');
        }
      }
    })();
  })();

  // Displays list of recipes from choosen category of recipes - button 'See recipes' (in popup).
  (function () {
    var toggleRecipeListPopup = (function () {
      // Displays popup
      $('#show-recipes-btn').on('click', function (e) {
        e.preventDefault();
        $('.recipes-popup').css('display', 'block');
      });

      // Closes popup
      $('#close-recipes-popup-btn').on('click', function (e) {
        e.preventDefault();
        $('.recipes-popup').css('display', 'none');
      });
    })();
  })();

  /**
    * @description Adds chosen ingredient to recipe
    * @param {}
    * @param {}
    * @returns {} Displays list of ingredients (button 'See list') from choosen category (in popup)
    */
  (function () {
    function addIngredents() {
      for (var n = 0; n < $("#categories div ul li input:checked").length; n++) {
        let name = $("#categories div ul li input:checked:eq(" + n + ") ~ label")
        let quantity = $("#categories div ul li input:checked:eq(" + n + ") ~ input[name = quantity]")
        let unit = $("#categories div ul li input:checked:eq(" + n + ") ~ input[name = unit]")
        let element = name.text() + " <span>" + quantity.val() + "</span> " + unit.val() + "<button class=\"menue-btn btn-position\" type=\"button\" name=\"button\">Delete</button>"
        $("#list-of-ingredients").append("<li>" + element + "</li>")
        console.log('Added ' + element);
      }
      $("#categories ul li input").prop("checked", false)
    }
    //$("#categories li div").on("click", "button:eq(0)", addIngredents)
    $("#addIngr").on("click", addIngredents)

  })();

  // Displays list of ingredients (button 'See list') from choosen category (in popup).
  (function () {
    var toggleIngredientsListPopup = (function () {
      // Display popup
      $('#show-ingredients-popup-btn').on('click', function (e) {
        e.preventDefault();
        $('.ingredients-popup').css('display', 'block');
      });

      // Close popup
      $('#close-ingredients-popup-btn').on('click', function (e) {
        e.preventDefault();
        $('.ingredients-popup').css('display', 'none');
      });
    })();
  })();

  /**
    * @description Adds chosen thing to recipe
    * @param {}
    * @param {}
    * @returns {} Displays list of ingredients (button 'See list') from choosen category (in popup)
    */
  (function () {
    function addNeeded() {
      for (var n = 0; n < $("#needed-things li input:checked").length; n++) {
        let name = $("#needed-things li input:checked:eq(" + n + ") ~ label")
        let element = name.text() + " <button class=\"menue-btn btn-position\" type=\"button\" name=\"button\">Delete</button>"
        $("#list-of-needed-things").append("<li>" + element + "</li>")
      }
      $("#needed-things li input").prop("checked", false)
    }
    $("#add-needed-things").on("click", addNeeded)
  })();

  (function () {
    // Display popup
    $('#show-needed-popup-btn').on('click', function (e) {
      e.preventDefault();
      $('.needed-popup').css('display', 'block');
    });

    // Close popup
    $('#close-needed-popup-btn').on('click', function (e) {
      e.preventDefault();
      $('.needed-popup').css('display', 'none');
    });
  })();

  (function () {
    // Display infoBox
    $('.displayInfoBox').on('mouseover', function (e) {
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();
      $(e.target.parentElement.nextElementSibling).css('display', 'block');
    });

    // Hide infoBox
    $('.displayInfoBox').on('mouseout', function (e) {
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();
      $(e.target.parentElement.nextElementSibling).css('display', 'none');
    });
  })();

  /**
    * @description Displays view of recipe when button 'See recipe' is clicked.
    * @param {}
    * @param {}
    * @returns {} View of recipe
    */

  (function () {
    let seeRecipe = $('#see-recipe').on('click', function (e) {
      let titleRecipe = $("#title-recipe").val();
      let recipesCategory = $("#recips-category :selected").text();
      let ingredientsList = $("#list-of-ingredients").html();
      let neededThings = $("#list-of-needed-things").html();
      let recipeDescription = $("#description-of-recipe").val();
      let imageUpload = $("#uploadedImg").attr("src");
      let timeToMake = $("#time-to-make").val();
      let howMany = $("#how-many-person").val();

      $(".see-popup").css('display', 'block');
      let seePopupContent = document.createElement('div');
        
      let content = ('<div id="close-see-popup-btn">X</div><div class="picture" id="picture"><img src="' + imageUpload + '" width="450px"></div><div class="recipe-things"><h2 id="title" class="col title-cook-book">' + titleRecipe + '</h2><h3 id="category" class="col category-name"><span class="category">Category: </span>' + recipesCategory + '</h3><div class="listBox"><h5 class="list-name list-ing">List of ingredients:</h5><ol class="list" id="ingredients-list">' + ingredientsList + '</ol></div><div class="listBox"><h5 class="list-name list-things">List of needed things:</h5><ol class="list" id="things">' + neededThings + '</ol></div><div class="detailsBox"><p class="time" id="timeOfMaking"><strong>Time to make:</strong> ' + timeToMake + ' </p><p class="people font-bold"><strong>No of portions:</strong> ' + howMany + '</p></div><div class="main"><h3 class="recipe font-bold">Recipe:</h3><p id="recipeText" class="recipe-description">' + recipeDescription + '</p></div>');
      
      seePopupContent.classList = 'see-popup-content';
      $(".see-popup").append(seePopupContent);
      $(".see-popup-content").append(content);

      // Close popup
      $('#close-see-popup-btn').on('click', function (e) {
        $('.see-popup').css('display', 'none');
        // window.location.reload();
        $(".see-popup-content").remove();
        e.preventDefault();
      });

    });
  })();

  /**
    * @description Print page
    * @param {}
    * @param {}
    * @returns {} Open panel to print page
    */
  (function () {
    let printInput = $('#input_print');
    // Open panel to print
    printInput.on('click', function () {
      window.print();
    });
  })();

  /**
    * @description Display date
    * @param {}
    * @param {}
    * @returns {} Date of today
  */
  (function () {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    $('#date').append(day + '-' + month + '-' + year);
  })();

}); // on document ready