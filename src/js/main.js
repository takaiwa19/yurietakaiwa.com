import initCommon from './init/common.js'
import initIndex from './init/index.js'

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


// indexページのlistpanelsで最後の列で要素が足りなかった時、左寄せにする。
var $grid = $('.c-listpanels'),
    emptyCells = [],
    i;

    // 子パネル (ul.cell) の数だけ空の子パネル (ul.cell.is-empty) を追加する。
for (i = 0; i < $grid.find('.c-listpanels__box').length; i++) {
    emptyCells.push($('<div>', { class: 'c-listpanels__box empty' }));
}

$grid.append(emptyCells);



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
