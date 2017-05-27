'use strict';
const request = require('superagent');

// initial
const initial = {
	tasks: []
};

// actions

const load = () => request
  .get('/api/tasks')
	.then(res => state => Object.assign({}, state, {
		tasks: res.body.list
	}));

const add = title => request
  .post('/api/tasks')
  .send({title})
	.then(() => load());

const _delete = _id => request
	.delete(`/api/tasks/` + _id)
	.then(() => load());

module.exports = {
	initial,
	add,
	load,
	delete: _delete
};
