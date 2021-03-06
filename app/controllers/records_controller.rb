require 'active_support/concern'

class RecordsController < ApplicationController
  before_action :set_record, only: [:show, :edit, :update, :destroy]
  before_filter :comments, only: [:show, :edit]
  extend ActiveSupport::Concern
  # GET /records
  # GET /records.json
  def index
    if params[:query].blank? && params[:category].blank? && params[:genre_id].blank?
      @records = Record.all
    else
      @records = Record.search(params[:query], page: params[:page])
    end
    if !params[:category].blank?
      genre_ids = Genre.where('category_id' => params[:category])
      @records = Record.where(genre_id: genre_ids.ids)
    end
    if !params[:genre_id].blank?
      @records = Record.where(genre_id: params[:genre_id])
    end

  end

  def autocomplete
    render json: Record.search(params[:query], autocomplete: true, limit: 10).map(&:title)
  end
  # GET /records/1
  # GET /records/1.json
  def show
    @record = Record.get_chapters(params[:id])
  end

  def comments
    @commentable = find_commentable
    @comments = @commentable.comments.arrange(:order => :created_at)
    @comment = Comment.new
  end

  def show_user_records
    @records = Record.show_user_records(current_user.id)
  end

  # GET /records/new
  def new
    @record = Record.new
  end

  # GET /records/1/edit
  def edit
    @record = Record.get_chapters(params[:id])
  end

  # POST /records
  # POST /records.json
  def create
    @record = Record.new(record_params)
    respond_to do |format|
      if @record.save
        format.html { redirect_to @record, notice: 'Record was successfully created.' }
        format.json { render :show, status: :created, location: @record }
      else
        format.html { render :new }
        format.json { render json: @record.errors, status: :unprocessable_entity }
      end
    end
    Record.add_user_record(current_user.id, @record.id)
    @ch = Chapter.create(title: 'Untitled', content: '', order: 1, record_id: @record.id);
  end

  # PATCH/PUT /records/1
  # PATCH/PUT /records/1.json
  def update
    respond_to do |format|
      if @record.update(record_params)
        format.html { redirect_to @record, notice: 'Record was successfully updated.' }
        format.json { render :show, status: :ok, location: @record }
      else
        format.html { render :edit }
        format.json { render json: @record.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /records/1
  # DELETE /records/1.json
  def destroy
    @record.destroy
    respond_to do |format|
      format.html { redirect_to records_url, notice: 'Record was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_record
      @record = Record.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def record_params
      params[:record].permit(:title, :description, :tag_list, :genre_id, :cover)
    end

    def find_commentable
      params[:controller].singularize.classify.constantize.find(params[:id])
    end
end
