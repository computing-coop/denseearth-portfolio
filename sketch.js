var $draggable = $('.draggable').draggabilly();


function projectFormatting() {
  $('.project').each(function(i, obj) {

    var h = $(this).children()[0].clientHeight;
    var w = $(this).children()[0].clientWidth;

    obj.style.width = w + "px";
    obj.style.height = h + "px";

  });
}

function random_project_height() {

  $('.project').each(function(i, obj) {

    var h = $(this).children()[0].clientHeight;
    var project_offest_y = Math.floor(Math.random() * (window.innerHeight - h));
    $(this).css({
      'top': project_offest_y + "px"
    });
  });
}

projectFormatting();
random_project_height();


var audio = $(".project3")[0];
$(".project3").mouseenter(function() {
  audio.play();
});



var myVideo = document.getElementById("video");

function playPause() {
  if (myVideo.paused)
    myVideo.play();
  else
    myVideo.pause();
}
