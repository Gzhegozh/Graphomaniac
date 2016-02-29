class CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:destroy]

  def new
     @parent_id = params.delete(:parent_id)
     @commentable = find_commentable
     @comment = Comment.new( :parent_id => @parent_id,
                             :username => current_user.name,
                             :user_id => current_user.id,
                             :commentable_id => @commentable.id,
                             :commentable_type => @commentable.class.to_s)
  end

  def create
     @commentable = find_commentable
     @comment = @commentable.comments.build(params.require(:comment).permit(:parent_id, :content))
     @comment.username = current_user.name
     @comment.user_id = current_user.id
     if @comment.save
       flash[:notice] = "Successfully created comment."
       redirect_to @commentable
     else
       flash[:error] = "Error adding comment."
     end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render json: {}
  end

  private
  def find_commentable
     params.each do |name, value|
       if name =~ /(.+)_id$/
         return $1.classify.constantize.find(value)
       end
     end
     nil
  end
end
