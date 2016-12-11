//
var appObj={
  url: "http://www.realmadrid.com/",

};
// Grab the articles as a json
$.getJSON("/articles", function(data) {
  //$("#articles").append("<div class='row'>");
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    if (i%2===0){
      $("#articles").append("<div class='col-lg-5'><div class='panel panel-primary'><div class='panel-heading'><h3 class='panel-title' data-id='" + data[i]._id + "'>" + data[i].title+"</h3></div><div class='panel-body'><img src='"+appObj.url+data[i].image+"' alt='"+data[i].title+"' class='img-responsive'><p class='info'>"+data[i].info+"</p><a href='"+appObj.url+data[i].link+"'class='btn btn-info col-lg-3 col-md-2 col-sm-2 col-xs-4'>Full Article</a><div class='col-lg-6 col-md-4 col-sm-7 col-xs-5'></div><button type='button' class='btn btn-info col-lg-3 col-md-2 col-sm-2 col-xs-3' data-target='#notes' data-toggle='modal' data-id='" + data[i]._id + "'>Note</button></div></div></div>");
    } else {
    $("#articles").append("<div class='row'><div class='col-lg-5'><div class='panel panel-primary'><div class='panel-heading'><h3 class='panel-title' data-id='" + data[i]._id + "'>" + data[i].title+"</h3></div><div class='panel-body'><img src='"+appObj.url+data[i].image+"' alt='"+data[i].title+"' class='img-responsive'><p class='info'>"+data[i].info+"</p><a href='"+appObj.url+data[i].link+"'class='btn btn-info col-lg-3 col-md-2 col-sm-2 col-xs-4'>Full Article</a><div class='col-lg-6 col-md-4 col-sm-7 col-xs-5'></div><button type='button' class='btn btn-info col-lg-3 col-md-2 col-sm-2 col-xs-3' data-target='#notes' data-toggle='modal' data-id='" + data[i]._id + "'>Note</button></div></div></div>");
  }
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "button", function() {
  // Empty the notes from the note section
  $(".modal-header").empty();
  $(".modal-body").empty();
  $(".modal-footer").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      //console.log(data);
      // The title of the article
      $(".modal-header").append("<a type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</a>");
      $(".modal-header").append("<h4 class='modal-title'>"+data.title+"</h4>");
      // An input to enter a new title
      $(".modal-body").append("<div class='form-group'><label for='titleinput' class='col-lg-2 control-label'>Title</label><div class='col-lg-10'><input id='titleinput' name='title' class='form-control' type='text'></div></div>");
      // A textarea to add a new note body
      $(".modal-body").append("<div class='form-group'><label for='bodyinput' class='col-lg-2 control-label'>Note</label><div class='col-lg-10'><textarea class='form-control' rows='3' id='bodyinput' name='body'></textarea></div></div>");
      // A button to submit a new note, with the id of the article saved to it
      $(".modal-footer").append("<a type='button' class='btn btn-default' data-id='" + data._id + "' id='savenote' data-dismiss='modal'>Save Note</a>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  console.log("title:" + $("#titleinput").val());
  console.log("note:" + $("#bodyinput").val());

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
    });

  // Also, remove the values entered in the input and textarea for note entry
//  $("#titleinput").val("");
//  $("#bodyinput").val("");
});
