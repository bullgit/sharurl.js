/* 
*
* sharurl.js
* v1.1
* Design by Bullgit and legendary flyers for bullgit ...
* Track the number of times your page has been shared on several social networks.
* For bullgit.
* Developer: @mrjopino
*
*/
(function() {
  var url, SharURL, conURL;

  url = "http://twitter.com"; // Substitute its URL

  $.getJSON("http://graph.facebook.com/" + url, function(json) {
    return SharURL($("#conteoFB"), json.shares);
});

  $.getJSON("http://urls.api.twitter.com/1/urls/count.json?url=" + url + "&callback=?", function(json) {
    return SharURL($("#conteoTW"), json.count);
});

  $.getJSON("http://www.linkedin.com/countserv/count/share?url=" + url + "&callback=?", function(json) {
    return SharURL($("#conteoLI"), json.count);
});
  
  $.getJSON("https://api.bufferapp.com/1/links/shares.json?url=" + url + "&callback=?", function(json) {
    return SharURL($("#conteoBA"), json.shares);
});

  $.getJSON("http://api.pinterest.com/v1/urls/count.json?url=" + url + "&callback=?", function(json) {
    return SharURL($("#conteoPT"), json.count);
});

  conURL = function($item) {
    return setTimeout(function() {
      var timeline, enlace, target;
      timeline = $item.attr("sharurl") * 1;
      target = $item.attr("data-sharurl") * 1;
      enlace = timeline + Math.ceil((target - timeline) / 2);
      $item.attr("sharurl", enlace);
      $item.html(enlace);
      if (enlace < target) {
        return conURL($item);
      }
    }, 100);
  };

  SharURL = function($item, contar) {
    if (contar == null) {
      contar = null;
    }
    $item.attr("data-sharurl", contar);
    $item.attr("sharurl", 0);
    return conURL($item);
  };

}).call(this);
