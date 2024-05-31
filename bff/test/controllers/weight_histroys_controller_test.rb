require "test_helper"

class WeightHistroysControllerTest < ActionDispatch::IntegrationTest
  setup do
    @weight_histroy = weight_histroys(:one)
  end

  test "should get index" do
    get weight_histroys_url, as: :json
    assert_response :success
  end

  test "should create weight_histroy" do
    assert_difference("WeightHistroy.count") do
      post weight_histroys_url, params: { weight_histroy: { memo: @weight_histroy.memo, user_id: @weight_histroy.user_id, weight: @weight_histroy.weight } }, as: :json
    end

    assert_response :created
  end

  test "should show weight_histroy" do
    get weight_histroy_url(@weight_histroy), as: :json
    assert_response :success
  end

  test "should update weight_histroy" do
    patch weight_histroy_url(@weight_histroy), params: { weight_histroy: { memo: @weight_histroy.memo, user_id: @weight_histroy.user_id, weight: @weight_histroy.weight } }, as: :json
    assert_response :success
  end

  test "should destroy weight_histroy" do
    assert_difference("WeightHistroy.count", -1) do
      delete weight_histroy_url(@weight_histroy), as: :json
    end

    assert_response :no_content
  end
end
