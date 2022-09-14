# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# Shoe.create(
#     brand: "Jordan",
#     size: 13,
#     image: "https://static.nike.com/a/images/t_default/fdd52124-ee5b-4ad6-b505-240b184e29e8/air-jordan-7-retro-mens-shoes-7Zr804.png"
# )

# Shoe.create(
#     brand: "Nike",
#     size: 13,
#     image: "https://www.blacklabelkicks.com/en-us/products/nike-dunk-low-racer-blue",
#     user_id: 1
# )

User.create(
    username: "gregt",
    password: "test",
    
)

Store.create(
    name: "Finish Line"
)