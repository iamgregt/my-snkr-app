class User < ApplicationRecord
    has_secure_password

    has_many :shoes
    has_many :stores, through: :shoes
end
