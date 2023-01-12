const jwt = require("jsonwebtoken");
const logger = require('../logger/api.logger');
const userRepository = require('../repository/user.repository');
const roleRepository = require('../repository/role.repository');

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
    let token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    userRepository.getUserById(decoded.id).then(user => {
      if(!user){
        return res.status(404).send({message: "User not found"});
      }

      roleRepository.getRoleById(user.roleId).then(role => {
        if(!role){
          return res.status(404).send({message: "Role not found"});
        }
      return res.status(200).send({user, role: "ROLE_" + role.name.toUpperCase() });
      });
    });
  }
}

module.exports = new TodoController()