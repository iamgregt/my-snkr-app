class ShoesController < ApplicationController

    wrap_parameters format: []

    def index
        render json: Shoe.all
    end
    
    def show
        shoe = Shoe.find_by(id: params[:id])
        if shoe
            render json: shoe, status: :accepted
        else
        render json: {error: "No shoe with that ID"}, status: :unprocessable_entity
        end
    end

    def create
        shoe = Shoe.create(shoe_params)
        render json: shoe, status: :created
    end

    def update
        shoe = Shoe.find_by(id: params[:id])
        shoe.update(shoe_params)
        render json: shoe, status: :accepted
    end

    def destroy
        shoe = Shoe.find_by(id: params[:id])
        shoe.delete
        head :no_content
    end


    private

    def shoe_params
        params.permit(:brand, :size, :image, :user_id, :firebase, :store_id, :for_sale)
    end
end

