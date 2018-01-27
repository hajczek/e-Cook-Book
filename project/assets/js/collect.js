// TO BE IMPROVED...
// file to gather user input data and make calls to send it to the server.

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
                console.log(response); //temporarily only in console.log
            }
        })
    }
    else {
    alert("no file chosen");
    }
}

// TODO: Gather all user inputs and make calls to dbAction module.
//Handler method for form submit
const gatherData = function() {
    console.log("in gatherData function");
}