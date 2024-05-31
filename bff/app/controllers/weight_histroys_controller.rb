class WeightHistroysController < ApplicationController
  before_action :set_weight_histroy, only: %i[ show update destroy ]

  # GET /weight_histroys
  def index
    @weight_histroys = WeightHistroy.all

    render json: @weight_histroys
  end

  # GET /weight_histroys/1
  def show
    render json: @weight_histroy
  end

  # POST /weight_histroys
  def create
    @weight_histroy = WeightHistroy.new(weight_histroy_params)

    if @weight_histroy.save
      render json: @weight_histroy, status: :created, location: @weight_histroy
    else
      render json: @weight_histroy.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /weight_histroys/1
  def update
    if @weight_histroy.update(weight_histroy_params)
      render json: @weight_histroy
    else
      render json: @weight_histroy.errors, status: :unprocessable_entity
    end
  end

  # DELETE /weight_histroys/1
  def destroy
    @weight_histroy.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_weight_histroy
      @weight_histroy = WeightHistroy.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def weight_histroy_params
      params.require(:weight_histroy).permit(:user_id, :weight, :memo)
    end
end
