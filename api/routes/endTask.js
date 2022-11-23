module.exports = app => {
    const controller = app.controller.endTask;

    app.route('/api/v1/endtasks')
        .post(controller.endTaskUser)

        app.route('/api/v1/consultendtasks/:idTask/:idUser')
        .get(controller.consultEndTaskUser)
}