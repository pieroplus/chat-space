$(function(){
  function buildHTML(message){
    var image = (message.image != null) ? `${message.image}` : `""`
    var html = `<p class="chates__list__user">
                  ${message.user}
                </p>
                <p class="chates__list__time">
                  ${message.date}
                </p>
                <p class="chates__list__message">
                  ${message.body}
                </p>
                <p class="chates__list__image">
                <img src ="${image}">
                </p>`
    return html;
  }
  $('.new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this)
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      timeout: 10000,
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chates__list').append(html)
      $('.message-area').val('')
      $('.display-none').val('')
      $('.chat-space').animate({scrollTop: $('.chat-space')[0].scrollHeight}, 'fast');
      $(".send-btn").prop("disabled", false);
    })
    .fail(function(data){
      alert("error");
      $(".send-btn").prop("disabled", false);
    });
  });
});
