class UsersController < ApplicationController
    wrap_parameters format: []

    def index
        render json: User.all
    end

    def create
        render json: User.create(user_params)
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end


    private

    def user_params
    params.permit(:username, :password)
    end
end
