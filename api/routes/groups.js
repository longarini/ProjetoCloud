module.exports = app => {
    const controller = app.controller.groups;

    app.route('/api/v1/groups')
        .post(controller.createGroup);

    app.route('/api/v1/groups/:idUser').get(controller.getGroupByAdmin)
    app.route('/api/v1/groups/:idUser/:idGroup').get(controller.getGroupById)
    // .put(controller.updateAllGroup)
    // .patch(controller.updatePartialGroup)
    // .delete(controller.deleteGroup)

}