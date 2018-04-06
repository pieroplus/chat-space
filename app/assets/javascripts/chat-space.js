$(function(){
  // HTML作成処理
  function buildHTML(message){
    var image = (message.image != null) ? `${message.image}` : `""`
    var html = `<p class="chates__user">${message.user}</p>
                <p class="chates__time">${message.date}</p>
                <p class="chates__message">${message.body}</p>
                <p class="chates__image"><img src ="${image}"></p>
                <p class="chates__id">${message.id}</p>`
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
      // HTML作成処理呼び出し
      var html = buildHTML(data);
      $('.chates').append(html)
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
  // 5秒ごとに自動更新処理
  function update(){
    var href = window.location.href
    var message_id = $('.chates__id').last().text();
    // URLよりグループID抽出
    var urlArray = href.split("/");
    var group_id = urlArray[4];
    if (href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: href,
        type: 'GET',
        data: {
          message: {m_id: message_id,
                    g_id: group_id}
        },
        dataType: 'json'
      })
      .done(function(data) {
        $.each(data, function(i, data){
            // HTML作成処理呼び出し
            var html = buildHTML(data);
            $('.chates').append(html)
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
