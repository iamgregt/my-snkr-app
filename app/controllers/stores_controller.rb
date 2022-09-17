class StoresController < ApplicationController
    def index
        render json: Store.all()
    end

    def show
        store  = Store.find_by(id: params[:id])
        render json: store, status: :accepted
    end

    def update
        store = Store.find_by(id: params[:id])
        store.update(store_params)
        render json: store, status: :accepted
    end

    private

    def store_params
        params.permit(:name)
    end

end
