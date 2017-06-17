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



(function (global) {

var dc = {};

var homeHtml = "snippets/home-snippet.html";
var allSpecials = "specials.json";
var allCategoriesUrl = "site.json";
var categoriesTitleHtml = "snippets/categories-title-snippet.html";
var categoryHtml = "snippets/category-snippet.html";
var menuHTML = "snippets/menu-item.html";
var menuTitleHTML = "snippets/menu-items-title.html";

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute of '{{propName}}'
// with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}










var switchMenuToActive = function () {
  // Remove 'active' from home button
  // var classes = document.querySelector("#navHomeButton").className;
  // classes = classes.replace(new RegExp("active", "g"), "");
  // document.querySelector("#navHomeButton").className = classes;

  // Add 'active' to menu button if not already there
  var classes = document.getElementById("navMenuButton").className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.getElementById("navMenuButton").className = classes;
  }
};










// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  },
  false);
});

dc.loadMenuCategories = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowCategoriesHTML);
};

dc.loadMenuItems = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allSpecials,
    buildAndShowSpecialsHTML);
};

// Builds HTML for the categories page based on the data
// from the server
function buildAndShowCategoriesHTML (categories) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    categoriesTitleHtml,
    function (categoriesTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        categoryHtml,
        function (categoryHtml) {
          var categoriesViewHtml =
            buildCategoriesViewHtml(categories,
                                    categoriesTitleHtml,
                                    categoryHtml);
          insertHtml("#main-content", categoriesViewHtml);
        },
        false);
    },
    false);
}

function buildAndShowSpecialsHTML (specials) {
  $ajaxUtils.sendGetRequest(menuTitleHTML, 
    function(menuTitleHTML) {
      $ajaxUtils.sendGetRequest(menuHTML, 
        function (menuHTML) {
          var SpecialsviewHTML = 
          buildSpecialsViewHtml (specials, menuTitleHTML, menuHTML);
          insertHtml("#main-content", SpecialsviewHTML);
        },
        false);
    }, 
    false);
}          

// Using categories data and snippets html
// build categories view HTML to be inserted into page
function buildCategoriesViewHtml(categories,
                                 categoriesTitleHtml,
                                 categoryHtml) {

  var finalHtml = categoriesTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    var html = categoryHtml;
    var name = "" + categories[i].name;
    var short_name = categories[i].short_name;
    html =
      insertProperty(html, "name", name);
    html =
      insertProperty(html,
                     "short_name",
                     short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}

function buildSpecialsViewHtml (specials, menuTitleHTML, menuHTML) {
  var finalHtml = menuTitleHTML;
  finalHtml += "<section class='row'>";

  for (var i = 0; i < specials.length; i++) {
    var html = menuHTML;
    var name = specials[i].name;
    var short_name = specials[i].short_name;
    var description = specials[i].description;
    var price_small = specials[i].price_small;
    var small_portion_name = specials[i].small_portion_name;
    var price_large = specials[i].price_large;
    var large_portion_name = specials[i].large_portion_name
    html = insertProperty (html, "name", name);
    html = insertProperty (html, "short_name", short_name);
    html = insertProperty (html, "description", description);
    html = insertProperty (html, "price_small", price_small);
    html = insertProperty (html, "small_portion_name", small_portion_name);
    html = insertProperty (html, "price_large", price_large);
    html = insertProperty (html, "large_portion_name", large_portion_name);
    if (i % 2 != 0) {
      html +=
        "<div class='clearfix visible-lg-block visible-md-block'></div>";
    }
    finalHtml += html;
  }
  finalHtml += "</section>";
  return finalHtml;
}

global.$dc = dc;

})(window);