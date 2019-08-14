$(function() {
  // Back to top
  $(window).scroll(function() {
    $(window).scrollTop() > 500
      ? $(".to-top").show()
      : $(".to-top").hide();
  });
  $(".to-top").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });

  // Load comment
  if ($("#comment").length) {
    var gitalk = new Gitalk({
      clientID: "5b1b57676fe4e6a65180",
      clientSecret: "3e7d46e975b1adbc7443b394662dede1e40f907c",
      repo: "lhybaobei.github.io",
      owner: "lhybaobei",
      admin: ["lhybaobei"],
      id: location.pathname,
      distractionFreeMode: false
    });
    gitalk.render("comment");
  }

  // article-share
  $('.share-box i').click(function() {
    var type = $(this).data('type');
    var title = document.title;
    var encodedUrl = encodeURIComponent(location.href);
    var url;
    if (type === 'weibo') {
      url = '//service.weibo.com/share/share.php?title=' + title + '&url=' + encodedUrl + '&searchPic=true&style=number';
    } else if (type === 'qq') {
      url = '//connect.qq.com/widget/shareqq/index.html?url=' + encodedUrl + '&title=' + title;
    } else if (type === 'douban') {
      url = '//shuo.douban.com/!service/share?href=' + encodedUrl + '&name=' + title;
    } else if (type === 'qzone') {
      url = '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodedUrl + '&title=' + title;
    }
    if (url) window.open(url);
  });
});


(function($){
  /*cubeRotate start*/
  var isIE = function(){
	return ("ActiveXObject" in window);
  };
  if( isIE() ) {
    $('.contenedor').hide();
  } else {
    var cube = $('.cube'),
        offset = $('.contenedor').offset(),
        offsetleft = (offset.left + 50),
        offsettop = (offset.top + 50);

    cube.on({
      mousemove: function(e) {
        $(this).css('transform','rotateX(' + (e.pageY - offsettop) + 'deg) rotateY(' + (e.pageX - offsetleft) + 'deg)');
        $(this).addClass('noanimar').removeClass('animar');
      },
      mouseout: function() {
        $(this).css('transform','rotateX(-25deg) rotateY(32deg)');
        $(this).addClass('animar').removeClass('noanimar');
      }
    });
    // console.log('x=' + offsetleft + ', y=' + offsettop);
  }
  /* cubeRotate end*/

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
    $('.qrcode').hide();
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      type = $this.attr('data-share'),
      offset = $this.offset();

    var url = $this.attr('data-url'),
    encodedUrl = encodeURIComponent(url),
    id = 'article-share-box-' + $this.attr('data-id');

    if ($('.' + id).length){
      var box = $('.' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
            '<a href="https://www.linkedin.com/shareArticle?url=' + encodedUrl + '" class="article-share-linkedin" target="_blank" title="Linkedin"></a>',
            '<a href="http://service.weibo.com/share/share.php?url=' + encodedUrl + '" class="article-share-weibo" target="_blank" title="Weibo"></a>',
            '<a href="http://share.renren.com/share/buttonshare.do?link=' + encodedUrl + '" class="article-share-renren" target="_blank" title="Renren"></a>',
            '<a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodedUrl + '" class="article-share-qq" target="_blank" title="Qzone"></a>',
            '<a class="article-share-weixin" target="_blank" title="Weixin"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');

    $('.article-share-weixin').click(function(){
      var e_qrcode = $(this).parents('.article-share-box').next('.qrcode');
      if (e_qrcode.length){
        e_qrcode.show();
      } else {
        $(this).parents('.article-share-box').after('<div class="qrcode"></div>');
        e_qrcode = $(this).parents('.article-share-box').next('.qrcode');
        e_qrcode.qrcode({
          "render": "div",
          "size": 180,
          "text": encodeURI(url)
        });
        e_qrcode.css({
          top: offset.top + 20,
          left: offset.left -150,
        });
      }
    });

  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });
})(jQuery);
