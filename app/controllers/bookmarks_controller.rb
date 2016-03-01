class BookmarksController < ApplicationController
  before_action :set_bookmark, only: [:show, :edit, :update, :destroy, :insert_bookmarks]
  skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]

  # GET /bookmarks
  # GET /bookmarks.json
  def index
    @bookmarks = Bookmark.all
  end

  # GET /bookmarks/1
  # GET /bookmarks/1.json
  def show
    render json: @bookmarks
  end

  # GET /bookmarks/new
  def new
    @bookmark = Bookmark.new
  end

  def insert_bookmarks
    notice = '';
    @chapter = Chapter.find_by_id(params[:chapter_id])
    @bookmarks.each do |b|
      begin
        @chapter['content'].insert(b.index, b.anchor)
        rescue IndexError
          notice = 'Some of your bookmarks may be not relevant'
          next
        end
      end
    render json: {notice: notice, title: @chapter['title'], text: @chapter['content']}
  end
  # GET /bookmarks/1/edit
  def edit
  end

  # POST /bookmarks
  # POST /bookmarks.json
  def create
    @bookmark = Bookmark.new(bookmark_params)
    respond_to do |format|
      if @bookmark.save
        format.html { redirect_to @bookmark, notice: 'Bookmark was successfully created.' }
        format.json { render :show, status: :created, location: @bookmark }
      else
        format.html { render :new }
        format.json { render json: @bookmark.errors, status: :unprocessable_entity }
      end
    end
    render json: {}
  end

  # PATCH/PUT /bookmarks/1
  # PATCH/PUT /bookmarks/1.json
  def update
    respond_to do |format|
      if @bookmark.update(bookmark_params)
        format.html { redirect_to @bookmark, notice: 'Bookmark was successfully updated.' }
        format.json { render :show, status: :ok, location: @bookmark }
      else
        format.html { render :edit }
        format.json { render json: @bookmark.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bookmarks/1
  # DELETE /bookmarks/1.json
  def destroy
    @bookmark.destroy
    respond_to do |format|
      format.html { redirect_to bookmarks_url, notice: 'Bookmark was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bookmark
      @bookmarks = Bookmark.where('chapter_id' => params[:chapter_id], 'user_id' => params[:user_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def bookmark_params
      params.require(:bookmark).permit(:anchor, :index, :name, :user_id, :chapter_id)
    end
end
