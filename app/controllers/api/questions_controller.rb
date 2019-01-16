class Api::QuestionsController < ApplicationController
  before_action :authenticate_user, except: %i[index new create show update]

  def index
  end

  def create
    question = Question.new(question_params)
    if question.save!
      render json: {status: 200, question_id: question.id}
    else
      render json: {status: 404, message: 'Question couldn\'t created.  !!'}
    end
  end

  def show
    question = Question.find_by(id: params[:id])
    render json: question.to_json(only: %i(id question description tag))
  end

  def update
    question = Question.find_by(id: params[:id])
    if question.update(question_params)
      render json: {status: 200, question_id: question.id}
    else
      render json: {status: 404, message: 'Something went wrong.  !!'}
    end
    p 11111111111111111111
    p params
    p 1111111111111111111111111
  end

  private

  def question_params
    params.require(:question).permit(:question, :description, :tag)
  end
end
