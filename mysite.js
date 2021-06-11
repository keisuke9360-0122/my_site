document.addEventListener("DOMContentLoaded", () => {
  $(".wrap").fadeOut(2000);
});
$(function () {
  $(window).scroll(function () {
    $(".fadein").each(function () {
      const position = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();
      if (scroll > position - windowHeight + 100) {
        $(this).addClass("active");
      }
    });
  });
  
});

$('#page-link a[href*="#"]').click(function () {
  let elmHash = $(this).attr("href"); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
  let pos = $(elmHash).offset().top; //idの上部の距離を取得
  $("body,html").animate({ scrollTop: pos }, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
  return false;
});


$(window).on("load", function () {
  $("#splash-logo").delay(1200).fadeOut("slow"); //ロゴを1.2秒でフェードアウトする記述

  //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
  $("#splash")
    .delay(1500)
    .fadeOut("slow", function () {
      //ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述

      $("section").addClass("appear"); //フェードアウト後bodyにappearクラス付与
    });
  //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる

  //=====ここから背景が伸びた後に動かしたいJSをまとめたい場合は
  // $(".splashbg").on("animationend", function () {
  //   //この中に動かしたいJSを記載
  // });
  //=====ここまで背景が伸びた後に動かしたいJSをまとめる
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
$(".gallery-list").modaal({
  fullscreen: "true", //フルスクリーンモードにする
  before_open: function () {
    // モーダルが開く前に行う動作
    $("html").css("overflow-y", "hidden"); /*縦スクロールバーを出さない*/
  },
  after_close: function () {
    // モーダルが閉じた後に行う動作
    $("html").css("overflow-y", "scroll"); /*縦スクロールバーを出す*/
  },
});

function moveAnimation() {
  let randomElm2 = $(".randomScroll"); //親要素取得
  let randomElm2Child = $(randomElm2).children(); //親の子要素を取得
  randomScrollAnime();
  function randomScrollAnime() {
    let elemPos = $(".randomScroll").offset().top - 50; //要素より、50px上まで来たら
    let scroll = $(window).scrollTop();
    let windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      if (randomElm2Child.length > 0) {
        //配列数以上であれば処理をおこなう
        let rnd = Math.floor(Math.random() * randomElm2Child.length); //配列数から表示する数値をランダムで取得
        let moveData = "fadeUphair"; //アニメーション名＝CSSのクラス名を指定
        if (animeFlag) {
          //スクロールする度に動作するのでアニメーションが終わるまで処理をさせないようにする
          animeFlag = false; //アニメーション処理が終わるまで一時的にfalseにする
          $(randomElm2Child[rnd]).addClass(moveData); //アニメーションのクラスを追加
          setTimeout(function () {
            animeFlag = true; //次の処理をおこなうためにtrueに変更
            randomScrollAnime(); //自身の処理を繰り返す
          }, 500); //0.5秒間隔で。※ランダムのスピード調整はこの数字を変更させる
          randomElm2Child.splice(rnd, 1); //アニメーション追加となった要素を配列から削除
        }
      }
    } else {
      animeFlag = true;
    }
  }
}
let animeFlag = true; //スクロールする度に動作するのでアニメーションが終わるまで処理をさせないようにするための定義

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  moveAnimation(); /* アニメーション用の関数を呼ぶ*/
});
