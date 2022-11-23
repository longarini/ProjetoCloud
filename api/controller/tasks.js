const jwtValidate = require('../../config/jwt');
require("dotenv-safe").config();

module.exports = app => {
    const Group = require('../models/groups');
    const Tasks = require('../models/tasks');
    const EndTask = require('../models/endTask');

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

        var query = Group.findOne({ _id: req.body.groupId });
        var result = await query.exec();
        groupId = result._id;

        if (groupId === undefined) {
            res.status(400).send({ message: "Necessário o envio dos dados de cadastro." });
            return;
        }

        const task = new Tasks({

            groupId: groupId,
            nomeTask: req.body.name,
            descricaoTask: req.body.descricao,
            pontosTask: req.body.pontos,
        });

        task
            .save(task)
            .then(data => {
                const endTask = new EndTask({
                    task: data._id,
                    usuarios: [],
                    usuariosAprovados: [],
                });

                endTask.save(endTask);

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

        Tasks.find({ groupId:  req.params.idGroup}, function (err, task) {
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

        Tasks.findOne({ _id: req.params.idTask }, function (err, task) {
            if (err) throw err;

            if (task != undefined) {
                return res.status(200).send(task);
            }
            else {
                return res.status(401).send({ message: 'Task não encontrado.' });
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

        Tasks.findOneAndDelete({ _id: req.body.id }, function (err, task) {
            if (err) throw err;

            if (task != undefined) {
                return res.status(200).send('Sucesso.');
            }
            else {
                return res.status(401).send({ message: 'Task não encontrado.' });
            }
        });
    }

    controller.endTask = async (req, res) => {
        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados para busca." });
            return;
        }

        Tasks.findOneAndDelete({ _id: req.body.id }, function (err, task) {
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