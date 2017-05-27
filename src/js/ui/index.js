'use strict';

// dom
const {section, button, span, form, input, ul, li} = require('iblokz-snabbdom-helpers');
const Sortable = require('sortablejs');

module.exports = ({state, actions}) => section('#ui', [
	form({
		on: {
			submit: ev => {
				ev.preventDefault();
				const addTask = document.querySelector('#add-task');
				actions.add(addTask.value);
				addTask.value = '';
			}
		}
	}, [
		input('#add-task.add-task[name="task"]')
	]),
	ul({
		hook: {
			insert: vnode =>
				new Sortable(vnode.elm)
		}
	}, state.tasks.map(task =>
		li({
			on: {
				dblclick: () => actions.delete(task._id)
			}
		}, task.title)
	))
]);
