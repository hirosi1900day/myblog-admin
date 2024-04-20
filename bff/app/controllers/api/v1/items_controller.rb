class Api::V1::ItemsController < ApplicationController
  def index
    items = [
      { id: 1, title: "Item 1", description: "Description 1" },
      { id: 2, title: "Item 2", description: "Description 2" },
      { id: 3, title: "Item 3", description: "Description 3" },
    ]
    render json: { items: }
  end
end
