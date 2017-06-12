// $(function () { // Same as document.addEventListener("DOMContentLoaded"...
// 
//   // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
//   $("#navbarToggle").blur(function (event) {
//     var screenWidth = window.innerWidth;
//     if (screenWidth < 768) {
//       $("#collapsable-nav").collapse('hide');
//     }
//   });
// 
//   // In Firefox and Safari, the click event doesn't retain the focus
//   // on the clicked button. Therefore, the blur event will not fire on
//   // user clicking somewhere else in the page and the blur event handler
//   // which is set up above will not be called.
//   // Refer to issue #28 in the repo.
//   // Solution: force focus on the element that the click event fired on
//   $("#navbarToggle").click(function (event) {
//     $(event.target).focus();
//   });
// });


$(function () {
// var timeoutId = null;
//  
//    // Need to intercept clicking on any of the <a> of the dropdown menu
//    // to prevent default behavior
//    $("#collapsable-nav a").click(function (event) {
//  
//      // Here, we prevent default behavior of jumping straight to the #ID
//      event.preventDefault();
//  
//      // Cancel the execution of what we have in onblur
//      clearTimeout(timeoutId);
//  
//      // Collapse the menu with animation (as before)
//      $("#collapsable-nav").collapse("hide");
//  
//      // Figure out hash tag id; place it on the URL (without triggering jumping to it)
//      var hashId = $(this).attr('href');
//      history.pushState(null, null, hashId);
//  
//      // Pixel offset (approximate) for when the menu collapses (makes the jump offset less)
//      var collapsedMenuOffset = 130;
//  
//      // Figure out where to jump on the page based on the hash and collapsed menu offset
//      var targetOffset = $(hashId).offset().top - collapsedMenuOffset;
//  
//      // Use jQuery's animate to scroll there
//      $("body").animate({scrollTop: targetOffset}, "fast");
//  
//    });
 
 
   $("#nav-button").blur(function(event) {
     timeoutId = setTimeout(function () {
       var screenWidth = window.innerWidth;
       if (screenWidth < 768) {
         $("#collapsable-nav").collapse("hide");
       }
     }, 100);
   });
 
 });