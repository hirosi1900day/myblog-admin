module Resolvers
  class ItemResolver < BaseResolver
    type Types::ItemType, null: false
    argument :title, String, required: true

    def resolve(title:)
      [
        { id: 1, title: "1", description: "Description 1" },
        { id: 2, title: "Item 2", description: "Description 2" },
        { id: 3, title: "Item 3", description: "Description 3" },
      ].select {|item| item[:title] == title }.first
    end
  end
end