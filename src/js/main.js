import initCommon from './init/common.js'
import initIndex from './init/index.js'
import SlideGallery from './modules/SlideGallery.js'


const { pathname } = window.location;

const init = () => {
  initCommon();
  switch (pathname.replace('index.html', '')) {
    case '/':
      initIndex();
      break;
    default:
  }
}
init();

//slideGallery
const galleries = [];
$('.p-slide-gallery-body').each(function(index, element){
  galleries[index] = new SlideGallery($(element));
});


//スクロールした時にgnavがトップに固定
// var nav = $('.c-gnav');
// var navItem = $('.c-gnav__item');
// var navTop = nav.offset().top;
//
// $(window).scroll(function(){
//   var winTop = $(this).scrollTop();
//   if(winTop >= navTop) {
//     nav.addClass('fixed');
//     navItem.addClass('fixed');
//   }
//   else if(winTop <= navTop){
//     nav.removeClass('fixed');
//     navItem.removeClass('fixed');
//   }
// });


// gnavのcategory項目のtoggle
var itemCategory = $('.c-gnav__item-link--category');

$(itemCategory).bind('click', function() {
  $(this).next().slideToggle();
});

var hamburger = $(".c-gnav__hamburger");
hamburger.click(function () {
  hamburger.toggleClass("active");
  $(".c-gnav__toggle-items").toggleClass("active");
});


// indexページのlistpanelsで最後の列で要素が足りなかった時、左寄せにする。
var $grid = $('.c-listpanels'),
    emptyCells = [],
    i;

    // 子パネル (ul.cell) の数だけ空の子パネル (ul.cell.is-empty) を追加する。
for (i = 0; i < $grid.find('.c-listpanels__box').length; i++) {
    emptyCells.push($('<div>', { class: 'c-listpanels__box empty' }));
}

$grid.append(emptyCells);


//indexページのlistpanels__boxを時間差で表示
// $(function(){
//   $.each($('.c-listpanels-thum').children('img'), function(index) {
//     $(this).hide();
//     $(this).delay(index * 500).fadeIn(500);
//   });
// });


//indexページのlistpanels__boxをスクロールで順にfadein
  $('.c-listpanels__box').css('visibility', 'hidden');
  $(window).scroll(function(){
    var windowHeight = $(window).height();
    var topWindow = $(window).scrollTop();
    $('.c-listpanels__box').each(function(){
      var targetPosition = $(this).offset().top;
      if(topWindow > targetPosition - windowHeight + 1/3 * windowHeight) {
        $(this).addClass('fade-in-down');
      }
    });
  });


// ページ上部へのスクロール

$(function() {
    $("#pagetop a").click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});


// pictureページスライドショー設定


window.onload = function(){

  var photoList = [
    { src: '/img/test/image1.jpg', title: 'Kamikohchi, Nagano, Japan', photoCap:'2016 October'},
    { src: '/img/test/image2.jpeg', title: 'Chicken curry I ate in Tokyo, Japan', photoCap:'2017 January'},
    { src: '/img/test/image1.jpg', title: 'Kamikohchi, Nagano, Japan', photoCap:'2016 October'},
    { src: '/img/test/image2.jpeg', title: 'Chicken curry I ate in Tokyo, Japan', photoCap:'2017 January'}
  ];

  var photoLength = photoList.length;

  var photo = document.getElementsByClassName('c-picturepanels-box');
  var nextBtn = document.getElementsByClassName('c-picturepanels-btn-next');
  var prevBtn = document.getElementsByClassName('c-picturepanels-btn-prev');
  var title = document.getElementsByClassName('c-picturepanels-title');
  var photoCap = document.getElementsByClassName('c-picturepanels-cap');

  var currentIndex = 0;

  function showPhoto(index) {
    for (var i = 0; i < photoLength; i++) {
      photoList[i].elem.style.display = 'none';
    }
    var targetPhoto = photoList[index];

    var viewNumber = index + 1;
    title[0].innerHTML =  viewNumber + '.' + targetPhoto.title;
    targetPhoto.elem.style.display = 'inline';
    photoCap[0].innerHTML = targetPhoto.photoCap;
  }

  prevBtn[0].onclick = function() {
    if (currentIndex === 0) {
      currentIndex = photoLength;
    }
    currentIndex--;
    showPhoto(currentIndex);
  };

  nextBtn[0].onclick = function() {
    currentIndex++;
    if (currentIndex === photoLength) {
      currentIndex = 0;
    }
    showPhoto(currentIndex);
  };

  var item, img;
  for(var i = 0; i < photoLength; i++) {
    item = photoList[i];
    img = document.createElement('img');
    img.src = item.src;
    img.alt = item.title;
    photo[0].appendChild(img);
    item.elem = img;
  }

  showPhoto(currentIndex);

};


//pictureページinstagram gallery設定

$(document).ready(function(){
  var dataURL = 'https://api.instagram.com/v1/users/self/media/recent';
  var photoData;

  var getData = function(url){
    $.ajax({
      url: url,
      dataType: 'jsonp',
      data: {
        access_token: '18048844.a72b84a.c1e9373230174c9f8e3b19ce7d50fedd',
        count: 6
      }
    })
    .done(function(data){
      photoData = data;
      // console.dir(photoData);
      $(photoData.data).each(function(){
        var caption = '';
        if(this.caption) {
          caption = this.caption.text;
        }

        $('#c-picturepanels-insta').append(
          $('<div class="c-picturepanels-insta-box"></div>')
          .append(
            $('<a></a>')
            .attr('href', this.link)
            .attr('target', '_blank')
            .append(
              $('<img>').attr('src', this.images.low_resolution.url)
            )
            .append(
              $('<p class="c-picturepanels-insta-caption"></p>').text(caption)
            )
            .append(
              $('<p class="c-picturepanels-insta-likes"></p>').text(' ♡' + this.likes.count)
            )
          )

        );
      });
      if($('#c-picturepanels-insta-pagination').children().length === 0){
        $('#c-picturepanels-insta-pagination').append(
          $('<a class="c-picturepanels-insta-next"></a>').attr('href', '#').text('MORE').on('click', function(e){
            e.preventDefault();
            if(photoData.pagination.next_url) {
              getData(photoData.pagination.next_url);
            }
          })
        );
      }
      if(!photoData.pagination.next_url) {
        $('.c-picturepanels-insta-next').remove();
      }
    })
    .fail(function(){
      $('#c-picturepanels-insta').text(textStatus);
    })
  }

  getData(dataURL);
});


//workページカルーセル設定
$("document").ready(function(){
  $('.c-workpanels__slider').slick({
    accessibility: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 800,
    dots: true,
    arrows: false,
    centerMode: true,
    centerPadding: '20%'
  });
});

// aboutページc-canvas__container
  var canvas = document.getElementById('c-canvas__container');
  var ctx = canvas.getContext('2d');

  window.requestAnimFrame = (function(){
          return  window.requestAnimationFrame   ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(callback){
                  window.setTimeout(callback, 1000 / 60);
              };
      })();

  function drawCircle(x, y, scale, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, scale, 0, 2*Math.PI, false);
    ctx.fill();
  }

  function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.fillRect(x, y, w, h);
    ctx.fill();
  }

var speed = 100;    //移動速度
var x = 0;      //X軸の位置

loop();

// ループ処理
function loop() {
    requestAnimFrame(loop);
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
    // ループ毎にxを加算
    x += (340 - x) / speed;
    // 円を描画
    drawRect(x, 50, 30, 30, '#A9C52F');
    drawCircle(680-1/3*x, 150, 40, '#2C5D63');
    drawCircle(680-2/3*x, 500, 30, '#A9C52F');
    drawRect(1/3*x, 250, 80, 80, '#2C5D63');
}
