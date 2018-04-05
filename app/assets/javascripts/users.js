$(function(){
  var list = $('#user-search-result');

  // ユーザリスト作成HTML
  function searchUserHTML(user) {
    var html =`<div class='chat-group-user clearfix'>
                 <p class='chat-group-user__name'>
                   ${user.name}
                 </p>
                 <a class='user-search-add chat-group-user__btn chat-group-user__btn--add' data-user-id=${user.id} data-user-name='${user.name}''>
                   追加
                 </a>
               </div>`
    list.append(html);
  }

  // ユーザ名が存在しない
  function searchNotUserHTML(){
    var html = `<div class='chat-group-user clearfix'>
                  <p class="chat-group-user__name">一致するユーザーは存在しません</p>
               </div>`
    list.append(html);
  }

  //追加ユーザリスト作成HTML
  function addUserHTML(id,name){
    var html =`<div class='chat-group-user clearfix js-chat-member'>
                 <input name='group[user_ids][]' type='hidden' value='${id}'>
                   <p class='chat-group-user__name'>${name}</p>
                   <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
             </div>`
    $('#chat-group-users').append(html);
  }

  // 追加ボタン押下時の処理
  $('#user-search-result').on('click','.user-search-add',function(){
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    addUserHTML(user_id, user_name);
    $(this).parent().remove();
  });

  // 削除ボタン押下時の処理
  $('#chat-group-users').on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  })

  // ユーザ名入力時の処理
  $('#user-search-field').on('keyup',function(){
    var input = $('#user-search-field').val();
    console.log(input);
     $.ajax({
       type: 'GET',
       url: '/users',
       data: { keyword: input },
       dataType: 'json'
     })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
        searchUserHTML(user);
        });
      }
      else {
        searchNotUserHTML("一致するユーザは存在しません");
      }
    })
    .fail(function() {
      alert("ユーザー名の検索に失敗しました。");
    })
  })
});
