@new_messages = @group.messages.newMessageJadge(params[:m_id])
if @new_messages.present?
  json.array! @new_messages do |message|
    json.id    message.id
    json.user  message.user.name
    json.date  l(message.created_at,format: :default)
    json.body  message.body
    json.image message.image_url
  end
end
