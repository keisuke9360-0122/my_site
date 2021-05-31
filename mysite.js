document.addEventListener("DOMContentLoaded", () => {
  $(".wrap").slideUp(2000);
});

$('#page-link a[href*="#"]').click(function () {
  let elmHash = $(this).attr("href"); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
  let pos = $(elmHash).offset().top; //idの上部の距離を取得
  $("body,html").animate({ scrollTop: pos }, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
  return false;
});

$(".next").click(function () {
  $(".slide-list:not(:animated)").animate(
    {
      "margin-left": -1 * $(".slide-item").width(),
    },
    function () {
      $(".slide-list").append($(".slide-item:first-child"));
      $(".slide-list").css("margin-left", "0");
    }
  );
});
$(".prev").click(function () {
  $(".slide-list:not(:animated)")
    .prepend($(".slide-item:last-child"))
    .css("margin-left", -1 * $(".slide-item").width())
    .animate({
      "margin-left": 0,
    });
});

let galleryTop = new Swiper(".main-image02__body", {
  loop: true, // 繰り返し指定
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: {
      el: ".main-image02-thumbs",
      slidesPerView: 4,
      loop: true,
      spaceBetween: 10,
      centerInsufficientSlides: true, // センター揃え
    },
  },
});

const swiper = new Swiper(".main-image02-thumbs", {
  loop: true,
  slidesPerView: "auto",
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
(function () {
  $(".main-image02-thumbs__item").on("click", function () {
    $("li").classList.remove("swiper-slide-thumb-active");
  });
});

$(".image").modaal({
  type: "image",
});
