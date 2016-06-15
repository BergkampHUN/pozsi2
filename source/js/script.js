$(document).ready(function() {
  resizeBlocks();

  $('a[href^="#"]').click(function(e) {
    e.preventDefault();
    console.log(this.hash)
    $(window).stop(true).scrollTo(this.hash, {duration:1000, interrupt:true});
  });

  $('.c-btn.anchor').click(function(e) {
    e.preventDefault();
    var dest = $(this).data("anchor");
    $(window).stop(true).scrollTo(dest, {duration:1000, interrupt:true});
  });

  $(window).resize(function() {
    resizeBlocks();
  })
})
function resizeBlocks() {
  $('.references__imageWrapper').height($('.references__imageWrapper').width());
}