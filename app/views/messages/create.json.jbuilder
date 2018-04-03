json.user @message.user.name
json.body @message.body
json.date l(@message.created_at,format: :default)
json.image @message.image_url
