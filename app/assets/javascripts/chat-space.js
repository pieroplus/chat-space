$(function(){
  function buildHTML(message){
    var html = `<p class="chates__list__user">
                  ${message.user}
                </p>
                <p class="chates__list__time">
                  ${message.created_at}
                </p>
                <p class="chates__list__message">
                  ${message.body}
                </p>
                ${image} if message.image.present?`
    return html;
  }
  $('.post-zone').on('submit',function(){
    var formData = new FormData(this)
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chates__list').append(html)
      $('.message-area').val('')
    })
    .fail(function(){
      alert("error");
    });
  });
});