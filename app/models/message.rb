class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  mount_uploader :image, ImageUploader

  scope :newMessageJadge, -> (message_id){where('id > ?' ,message_id)}

  validates :body, presence: true, unless: :image?
end
