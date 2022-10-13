class UsersController < ApplicationController
    wrap_parameters format: []
    skip_before_action :authorized, only: :create
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_data
    
    def index
        render json: User.all
    end

    def create
        render json: User.create!(user_params)
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, include: :shoes
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end


    private

    def user_params
    params.permit(:username, :password)
    end

    def invalid_data
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
