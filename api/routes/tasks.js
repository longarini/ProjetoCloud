module.exports = app => {
    const controller = app.controller.tasks;

    app.route('/api/v1/tasks')
        .post(controller.createTask)
        .delete(controller.deleteTaskById)

    app.route('/api/v1/endtask').get(controller.endTask);
    app.route('/api/v1/tasks/:idGroup').get(controller.getTaskByGroup);
    app.route('/api/v1/tasksbyid/:idTask').get(controller.getTaskById);
    // .get(controller.getGroups)
    // .put(controller.updateAllGroup)
    // .patch(controller.updatePartialGroup)
    // .delete(controller.deleteGroup)

}