const jwt = require('jsonwebtoken');
const jwtValidate = require('../../config/jwt');
require("dotenv-safe").config();

module.exports = app => {
    const Groups = require('../models/groups');
    const User = require('../models/user');

    const controller = {};

    controller.createGroup = async (req, res) => {

        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados de cadastro." });
            return;
        }

        const group = new Groups({
            user: req.body.idUser,
            nomeGrupo: req.body.groupName,
            adminUsers: [],
            comunUsers: [],
            ativo: true,

        });

        group
            .save(group)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Não foi possivel criar o Grupo."
                });
            });
    }

    controller.updateGroup = async (req, res) => {

        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados de cadastro." });
            return;
        }

        const admins = req.body.adminUsers;
        const comuns = req.body.comunUsers;
        var adminUsers = [];
        var comunUsers = [];
        var adminUser;

        var query = User.findOne({ user: req.body.user });
        var result = await query.exec();
        adminUser = result._id;

        query = User.find({ user: { $in: admins } });
        result = await query.exec();
        result.forEach(element =>
            adminUsers.push(element._id)
        );

        query = User.find({ user: { $in: comuns } });
        result = await query.exec();
        result.forEach(element =>
            comunUsers.push(element._id)
        );

        filter = { 'id': req.body.id };
        set = {
            '$set':
            {
                'nomeGrupo': req.body.nomeGrupo,
                'adminUsers': adminUsers,
                'comunUsers': comunUsers,
            }
        };

        Groups.findOneAndUpdate(filter, set);
    }

    controller.getGroupByAdmin = async (req, res) => {
        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados para busca." });
            return;
        }

        Groups.find({ user: req.params.idUser }, function (err, result) {
            if (err) throw err;

            if (result != undefined) {
                return res.status(200).send(result);
            }
            else {
                return res.status(401).send({ message: 'Grupo não encontrado.' });
            }
        });
    }

    controller.getGroupByComun = async (req, res) => {
        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados para busca." });
            return;
        }

        Groups.find({comunUsers : req.params.idUser}, function (err, result) {
            if (err) throw err;

            if (result != undefined) {
                return res.status(200).send(result);
            }
            else {
                return res.status(401).send({ message: 'Grupo não encontrado.' });
            }
        });
    }

    controller.getGroupById = async (req, res) => {
        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados para busca." });
            return;
        }

        Groups.findOne({ user: req.params.idUser, _id: req.params.idGroup }, function (err, result) {
            if (err) throw err;

            if (result != undefined) {
                return res.status(200).send(result);
            }
            else {
                return res.status(401).send({ message: 'Grupo não encontrado.' });
            }
        });
    }

    controller.deleteGroup = async (req, res) => {

        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados de cadastro." });
            return;
        }

        filter = { 'id': req.body.id };
        set = {
            '$set':
            {
                'ativo': false,
            }
        };

        Groups.findOneAndUpdate(filter, set);
    }

    controller.deleteUser = async (req, res) => {

        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados de cadastro." });
            return;
        }

        Groups.findOne({ _id: req.body.id }, function (err, result) {
            if (err) throw err;

            if (result != undefined) {
                result.comunUsers.remove(req.body.user);

                result.save(function (err) {
                    if (err) {
                        console.error('ERROR!');
                    }
                }
                );

                return res.status(200).send(result);
            }
            else {
                return res.status(401).send({ message: 'Grupo não encontrado.' });
            }
        });
    }

    controller.insertUser = async (req, res) => {

        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados de cadastro." });
            return;
        }

        Groups.findOne({ _id: req.body.id }, function (err, result) {
            if (err) throw err;

            if (result != undefined) {
                result.comunUsers.push(req.body.user);

                result.save(function (err) {
                    if (err) {
                        console.error('ERROR!');
                    }
                }
                );

                return res.status(200).send(result);
            }
            else {
                return res.status(401).send({ message: 'Grupo não encontrado.' });
            }
        });
    }

    return controller;
};