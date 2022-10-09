class User < ApplicationRecord
    has_secure_password

    validates :password, presence: true

    has_many :shoes
    has_many :stores, through: :shoes
end
