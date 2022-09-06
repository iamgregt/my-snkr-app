class UsersController < ApplicationController
    wrap_parameters format: []

    def create
    end

    private

    def
    params.permit(:username, :password)
    end
end
