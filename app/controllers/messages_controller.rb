class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user).order("created_at ASC")
    respond_to do |format|
      format.html
      format.json {@new_messages = @group.messages.newMessageJadge(params[:id])}
    end
  end

   def create
     @message = @group.messages.new(message_params)
     if @message.save
       respond_to do |format|
         format.html { redirect_to group_messages_path(@group) }
         format.json
       end
     else
      @messages = @group.messages.includes(:user)
      render :index
    end
  end

  private
  def set_group
    @group = Group.find(params[:group_id])
  end

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end
end
