const logger = require('../logger/api.logger');
const userRepository = require('../repository/user.repository');

class TodoController{
  getUsers = async () => {
      logger.info('Controller: getUsers')
      return await userRepository.getUsers();
  }

  getUserByLogin = async (login) => {
      logger.info('Controller: getUserByLogin')
      return await userRepository.getUserByLogin(login);
  }

  getUserById = async (id) => {
      logger.info('Controller: getUserById')
      return await userRepository.getUserById(id);
  }

  allAccess = (req, res) => {
      res.status(200).send("Public Content.");
    };
    
    vendeurBoard = (req, res) => {
      res.status(200).send("Seller Content.");
    };
    
    adminBoard = (req, res) => {
      res.status(200).send("Admin Content.");
    };
    
    acheteurBoard = (req, res) => {
      res.status(200).send("Buyer Content.");
    };
}

module.exports = new TodoController()