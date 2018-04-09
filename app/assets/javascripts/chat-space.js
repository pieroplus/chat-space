$(function(){
  // HTML作成処理
  function buildHTML(message){
    var image = (message.image != null) ? `${message.image}` : `""`
    var html = `<div class="chates" data-message-id="${message.id}">
                  <p class="chates__user">${message.user}</p>
                  <p class="chates__time">${message.date}</p>
                  <p class="chates__message">${message.body}</p>
                  <p class="chates__image"><img src ="${image}"></p>
                </div>`
    return html;
  }
  // SENDボタン押下時の処理
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
      if(data.id != undefined){
        // HTML作成処理呼び出し
        var html = buildHTML(data);
        $('.chat-space').append(html)
        $('.message-area').val('')
        $('.display-none').val('')
        $('.chat-space').animate({scrollTop: $('.chat-space')[0].scrollHeight}, 'fast');
      }
      $(".send-btn").prop("disabled", false);
    })
    .fail(function(data){
      alert("error");
      $(".send-btn").prop("disabled", false);
    });
  });
  // 5秒ごとに自動更新処理
  function update(){
    var message_id = $('.chates:last').data('messageId')
    console.log(message_id)
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: window.location.href,
        type: 'GET',
        data: {id: message_id},
        dataType: 'json'
      })
      .done(function(data) {
        $.each(data, function(i, data){
          // HTML作成処理呼び出し
          var html = buildHTML(data);
          console.log(data.id)
          $('.chat-space').append(html)
        });
      $('.chat-space').animate({scrollTop: $('.chat-space')[0].scrollHeight}, 'fast');
      })
      .fail(function(data){
        alert("チャット自動更新エラー");
      });
    }else{
      //画面遷移時自動更新終了
      clearInterval(autoUpdate, 5000);
    }
  };
  // 5秒ごとに自動更新処理呼び出し
  var autoUpdate = setInterval(update, 5000);
});
