module.exports = app => {
    const controller = app.controller.tasks;

    app.route('/api/v1/tasks')
        .post(controller.createTask)
        .delete(controller.deleteTaskById)

    app.route('/api/v1/tasks/:idGroup').get(controller.getTaskByGroup);
    // .get(controller.getGroups)
    // .put(controller.updateAllGroup)
    // .patch(controller.updatePartialGroup)
    // .delete(controller.deleteGroup)

}