export default class SlideGallery {
  constructor($elm) {
    this.$elm = $elm;
    this.data = this.$elm.data('slide-gallery');
    this.$inner = $('.p-slide-gallery-inner', this.$elm);
    this.$prev = $('.p-slide-gallery-controler-button--prev');
    this.$next = $('.p-slide-gallery-controler-button--next');

    this.init();
  }
  init() {
    this.buildGallery();
    this.buildNext();
    this.buildPrev();
  }
  buildGallery() {
    let str = [];
    for (var i = 0; i < this.data.length; i++) {
      str[i] = `<div class="p-slide-gallery-item">${this.data[i].label}</div>`;
    }
    let strLength = str.length - 1;
    this.$inner.html(str[strLength]);
    for (var i = 0; i < strLength; i++) {
      this.$inner.append(str[i]);
    }
  }
  buildNext() {
    let str = this.$inner.children();
    let strLength = str.length - 1;
      $('.p-slide-gallery-controler-button--next').on('click',function(){
      $('.p-slide-gallery-inner').addClass('is-animate-next')
      if($('.p-slide-gallery-inner').hasClass('is-animate-next')) {
        $('.p-slide-gallery-inner').html(str[1]);
        for (var i = 2; i < strLength + 1; i++) {
          $('.p-slide-gallery-inner').append(str[i])
        }
        $('.p-slide-gallery-inner').append(str[0]);
        // $('.p-slide-gallery-inner').removeClass('is-animate-next');
      }
    });
  }



  // buildNextGallery() {
  //   let str = this.$inner.children();
  //   let strLength = str.length - 1;
  //
  // }


  // buildPrev() {
  //   this.$prev.on('click',function(){
  //     $('.p-slide-gallery-inner').addClass('is-animate-prev');
  //     });
  // }
}
