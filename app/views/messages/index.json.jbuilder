@new_message = Message.where('id > ? and group_id = ?',params[:message][:m_id],params[:message][:g_id])
if @new_message.present?
  json.array! @new_message do |message|
    json.id    message.id
    json.user  message.user.name
    json.date  l(message.created_at,format: :default)
    json.body  message.body
    json.image message.image_url
  end
end
