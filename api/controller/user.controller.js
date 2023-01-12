const jwt_decode = require('jwt-decode');
const logger = require('../logger/api.logger');
const userRepository = require('../repository/user.repository');

class TodoController{
  getUsers = (req,res) => {
      logger.info('Controller: getUsers')
      userRepository.getUsers().then(data => res.send(data));
  }

  getUserByLogin = (req,res) => {
      logger.info('Controller: getUserByLogin')
      userRepository.getUserByLogin(req.params.login).then(data => {
        if(!data){
          return res.status(404).send({message: "User not found"});
        }
        return res.status(200).send(data);
      });
  }

  getUserById = (req,res) => {
      logger.info('Controller: getUserById')
      userRepository.getUserById(req.params.id).then(data => {
        if(!data){
          return res.status(404).send({message: "User not found"});
        }
        return res.status(200).send(data);
      }
    )
  }

  getProfileInfos = (req,res) => {
    logger.info('Controller: getProfileInfos')
    const token = req.accesToken;
    const decoded = jwt_decode(token);
    userRepository.getUserById(token.userId).then(data => {
      if(!data){
        return res.status(404).send({message: "User not found"});
      }
      return res.status(200).send(data);
    }
  )
  }
}

module.exports = new TodoController()