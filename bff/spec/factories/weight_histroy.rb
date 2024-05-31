FactoryBot.define do
  factory :weight_histroy do
    memo { 'memo' }
    weight { 'weight' }
    association :user
  end
end