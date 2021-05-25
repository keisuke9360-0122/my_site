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
