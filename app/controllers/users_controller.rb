class UsersController < ApplicationController
    wrap_parameters format: []

    def create
        render json: User.create(user_params)
    end


    private

    def user_params
    params.permit(:username, :password)
    end
end
