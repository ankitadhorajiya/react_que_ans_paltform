class Api::UsersController < ApplicationController
  before_action :authenticate_user, only: :current

  def current
    render json: current_user.as_json(only: %i[id email])
  end

  def create
    if params.dig(:user, :password) == params.dig(:user, :confirm_password)
      user = User.new(user_params)
      if user.valid?

        user.save
        render json: { status: 200, message: 'User create successfully !!' }
      else
        render json: { status: 500, message: 'Email or Password is invalid !!' }
      end
    else
      render json: { status: 500, message: 'Password Is Not Valid !!' }
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, category_ids: [])
  end
end
