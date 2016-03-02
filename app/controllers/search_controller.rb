class SearchController < ApplicationController

  def get_genres
    if (params[:category_id])
      @genres = Genre.where('category_id' => params[:category_id])
    else
      @genres = Genre.all
    end
    render json: @genres
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def bookmark_params
      params.require(:genre).permit(:name, :category_id)
    end
end
