const jwtValidate = require('../../config/jwt');
require("dotenv-safe").config();

module.exports = app => {
    const Tasks = require('../models/tasks');

    const controller = {};

    controller.createTask = async (req, res) => {

        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados de cadastro." });
            return;
        }

        var query = Group.findOne({ user: req.body.groupId });
        var result = await query.exec();
        groupId = result._id;

        if (groupId === undefined) {
            res.status(400).send({ message: "Necessário o envio dos dados de cadastro." });
            return;
        }

        const task = new Tasks({

            groupId: adminUser,
            nomeTask: req.body.name,
            descricaoTask: req.body.descricao,
            pontosTask: req.body.pontos,
        });

        task
            .save(task)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Não foi possivel criar a Task."
                });
            });
    }

    controller.getTaskByUser = async (req, res) => {
        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados para busca." });
            return;
        }

        Task.find({ userId: req.body.userId }, function (err, task) {
            if (err) throw err;

            if (task != undefined) {
                return res.status(200).send(task);
            }
            else {
                return res.status(401).send({ message: 'Task não encontrado.' });
            }
        });
    }

    controller.getTaskByGroup = async (req, res) => {
        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados para busca." });
            return;
        }

        Task.find({ userId: req.body.userId }, function (err, task) {
            if (err) throw err;

            if (task != undefined) {
                return res.status(200).send(task);
            }
            else {
                return res.status(401).send({ message: 'Task não encontrado.' });
            }
        });
    }

    controller.getTaskById = async (req, res) => {
        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados para busca." });
            return;
        }

        Task.findOne({ _id: req.body.id }, function (err, task) {
            if (err) throw err;

            if (task != undefined) {
                return res.status(200).send(task);
            }
            else {
                return res.status(401).send({ message: 'Task nãom encontrado.' });
            }
        });
    }

    controller.deleteTaskById = async (req, res) => {
        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados para busca." });
            return;
        }

        Task.findOneAndDelete({ _id: req.body.id }, function (err, task) {
            if (err) throw err;

            if (task != undefined) {
                return res.status(200).send('Sucesso.');
            }
            else {
                return res.status(401).send({ message: 'Task não encontrado.' });
            }
        });
    }

    return controller;
};