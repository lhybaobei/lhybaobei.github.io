hexo.extend.helper.register("shortPost", function(content) {
  var br = 0;
  for (var i = 0; i < 5; ++i) {
    br = content.indexOf("\n", br + 1);
    if (br < 0 || br > 150) break;
  }
  if (br < 0) {
    return content;
  }
  return content.substring(0, br);
});
