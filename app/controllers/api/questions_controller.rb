class Api::QuestionsController < ApplicationController
  before_action :authenticate_user, except: %i[index new create show update destroy search]

  def index
    questions = if params[:jwt].present?
                  Question.all
                elsif params[:topic].present?
                  Question.topic(params[:topic])
                else
                  Question.first(5)
                end
    render json: questions.to_json,   only: %i[id question description tag]
  end

  def create
    question = Question.new(question_params)
    if question.save!
      render json: { status: 200, question_id: question.id }
    else
      render json: { status: 404, message: 'Question couldn\'t created.  !!' }
    end
  end

  def show
    question = Question.find_by(id: params[:id])
    render json: question.to_json(only: %i[id question description tag])
  end

  def update
    question = Question.find_by(id: params[:id])
    if question.update(question_params)
      render json: { status: 200, question_id: question.id }
    else
      render json: { status: 404, message: 'Something went wrong.  !!' }
    end
  end

  def destroy
    question = Question.find_by(id: params[:id])
    if question.destroy
      render json: { id: question.id, status: 200, message: 'Qustion destroyed successfully.. !!' }
    else
      render json: { status: 500, message: 'Something went wrong.. !!' }
    end
  end

  def search
    unless params[:query].blank?
      @questions = Question.search(params[:query])
      render json: { questions: @questions }
    end
  end

  private

  def question_params
    params.require(:question).permit(:question, :description, :tag)
  end
end
