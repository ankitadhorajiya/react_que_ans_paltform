require 'uri'
require 'net/http'

class ContactMailer < ApplicationMailer
  default from: 'ankita.essence@gmail.com'

  def send_mail
    data = JSON.parse('{
      "personalizations": [
        {
          "to": [
            {
              "email": "ankitadhorajiya@gmail.com"
            }
          ],
          "subject": "Sending with SendGrid is Fun"
        }
      ],
      "from": {
        "email": "ankitadhorajiya@gmail.com"
      },
      "content": [
        {
          "type": "text/plain",
          "value": "and easy to do anywhere, even with Ruby"
        }
      ]
    }')

    data['template_id'] =  Rails.application.credentials.template_id

    sg = SendGrid::API.new(api_key: Rails.application.credentials.send_grid_api)
    sg.client.mail._("send").post(request_body: data)
  end
end
