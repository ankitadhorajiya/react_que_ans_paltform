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
  authenticateCreateUser: function(email, password, confirm_password) {
    let data = {
      user: {
        email: email,
        password: password,
        confirm_password: confirm_password
      }
    };

    return axios.post(API_HOST + '/api/users/create', data)
      .then(function(response){
        return response.data;
        // return authenticateUser(response.data.email, password).then(data => {
        //   return data;
        // })
      })
      .catch(function(error){
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
  },
  getBlog: function(id) {
    return axios.get(API_HOST + '/api/blogs/' + id)
      .then(function(response){
        return response.data
      })
      .catch(function (error) {
        return undefined
      })
  }
};