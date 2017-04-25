for(var i=1;i<stadiums.length;i++) {
  $.injectCSS({
      ".slideshow li:nth-child(" + i + ")": {
          "background-image: url(" + stadiums.url + ");"
      }
  });
}
