$(document).ready(function() {
  $('.img-caption').each(function() {
    if ($(this).attr("title")) {
      $(this).wrap('<div class="img-caption-wrapper"></div>');
      $(this).after( '<span class="caption">' + $(this).attr('title') + "</span>" );
    }
  });
});