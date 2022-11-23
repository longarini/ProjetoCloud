const jwtValidate = require('../../config/jwt');
require("dotenv-safe").config();

module.exports = app => {
    const EndTask = require('../models/endTask');

    const controller = {};

    controller.endTaskUser = async (req, res) => {
        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados para busca." });
            return;
        }

        EndTask.findOne({ task: req.body.idTask }, function (err, result) {
            if (err) throw err;

            if (result != undefined) {
                if (!result.usuarios.includes(req.body.idUser)) {

                    result.usuarios.push(req.body.idUser);

                    result.save(function (err) {
                        if (err) {
                            console.error('ERROR!');
                        }
                        return res.status(200).send(result);
                    });

                }
            }
            else {
                return res.status(401).send({ message: 'Grupo não encontrado.' });
            }
        });
    }

    controller.consultEndTaskUser = async (req, res) => {
        await jwtValidate.verifyJWT(req, res);

        if (res.statusCode != 200) {
            return;
        }

        if (!req.body) {
            res.status(400).send({ message: "Necessário o envio dos dados para busca." });
            return;
        }

        EndTask.findOne({ task: req.params.idTask }, function (err, result) {
            if (err) throw err;

            if (result != undefined) {
                if (!result.usuarios.includes(req.params.idUser)) {
                    res.send(false);
                    return;
                }
                res.send(true);
                return;
            }
            else {
                return res.status(401).send({ message: 'Grupo não encontrado.' });
            }
        });
    }

    return controller;
};