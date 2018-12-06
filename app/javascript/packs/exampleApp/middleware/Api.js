const axios = require('axios');

const API_HOST = require('../../exampleApp/constants/endpoints').API_HOST;

module.exports = {
  authenticateUser: function(email, password) {
    let data = {
      auth: {
        email: email,
        password: password
      }
    };
    return axios.post(API_HOST + '/api/user/token', data)
      .then(function (response) {
        return response.data.jwt
      })
      .catch(function (error) {
        return undefined
      })
  },
  getCurrentUser: function(jwt) {
    var config = {
      headers: {}
    };
    if (jwt) {
      config['headers']['Authorization'] = 'Bearer ' + jwt
    }
    return axios.get(API_HOST + '/api/users/current', config)
      .then(function(response){
        return response.data
      })
      .catch(function (error) {
        return undefined
      })
  },
  getBlogsList: function(blogType) {
    return axios.get(API_HOST + '/api/blogs?type=' + blogType)
      .then(function(response){
        return response.data
      })
      .catch(function (error) {
        return undefined
      })
  }
};