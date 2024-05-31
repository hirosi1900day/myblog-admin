# == Schema Information
#
# Table name: weight_histroys
#
#  id         :bigint           not null, primary key
#  memo       :string(255)
#  weight     :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_weight_histroys_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class WeightHistroy < ApplicationRecord
  belongs_to :user
end
