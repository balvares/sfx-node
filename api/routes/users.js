module.exports = app => {
	const controller = app.controllers.users;

	app.route('/api/v1/users')
		.get(controller.listUsers)
		.post(controller.saveUser);

	app.route('api/v1/users/:id')
		// .delete(controlller.removeUser)
		.put(controller.updateUser);
}
