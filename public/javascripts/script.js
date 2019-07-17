document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//modal
$(document).ready(function(){
  $('.modal').modal();
});

//sidebar
$(document).ready(function() {
  $(document).on("click", "#openside", function() {
    $("body").toggleClass("sidebar-mini");
    $(".sidebar").removeClass("sidebar-right");
    overlay();
  });

  $(document).on("click", "#opensideright", function() {
    $("body").toggleClass("sidebar-mini");
    overlay();
    $(".overlay").toggleClass("open-overlay");
    $(".sidebar").addClass("sidebar-right");
  });

  $(document).on("click", ".menu-icon", function() {
    $("body").toggleClass("sidebar-mini");
    if ($("body").hasClass("sidebar-mini")) {
      $(".overlay").addClass("close-overlay");
      $("#menuicon").removeClass("fa-times");
      $("#menuicon").addClass("fa-bars");
    } else {
      overlay();
    }
  });

  $(document).on("click", ".overlay", function() {
    $("body").toggleClass("sidebar-mini");
    $(".overlay").addClass("close-overlay");
    $("#menuicon").removeClass("fa-times");
    $("#menuicon").addClass("fa-bars");
  });

  function overlay() {
    if ($(".overlay").hasClass("close-overlay")) {
      $(".overlay").removeClass("close-overlay");
      $(".overlay").addClass("open-overlay");
      $("#menuicon").addClass("fa-times");
    }
  }
});


