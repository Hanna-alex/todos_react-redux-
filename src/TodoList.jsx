import React, { useState } from 'react';
import styles from './todoList.module.css';
import { ModalLoader } from './components/ModalLoader';
import { AddTaskModal } from './components/elems/AddTaskModal';
import { EditingModal } from './components/EditingModal';
import { SearchTask } from './components/SearchForm';
import { Button } from './components/elems/Button';
import { useTaskManager } from './hooks/use-task-manager';

export const TodoList = () => {
	const [isOpenAddForm, setIsOpenAddForm] = useState(false);
	const [isOpenEditingModal, setIsOpenEditingModal] = useState(false);
	const {
		tasks,
		isLoading,
		error,
		isAdding,
		newTitle,
		setNewTitle,
		handleAddTask,
		handleUpdateTask,
		handleDeleteTask,
	} = useTaskManager(setIsOpenAddForm);
	const [currentTask, setCurrentTask] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [isSortOn, setIsSortOn] = useState(false);

	const filteredTasks = tasks.filter(({ title }) =>
		title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const sortedTasks = isSortOn
		? [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTasks;

	const onClickEditingBtn = (task) => {
		setCurrentTask(task);
		setNewTitle(task.title);
		setIsOpenEditingModal(true);
	};

	return (
		<div className={styles.container}>
			{(isLoading || isAdding) && <ModalLoader />}

			<div className={styles.menu}>
				<Button
					btnFn={() => setIsOpenAddForm(true)}
					classbtn={styles.formButton}
				>
					Добавить новую задачу
				</Button>

				<SearchTask searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

				<Button
					classbtn={styles.sortButton}
					btnFn={() => setIsSortOn(!isSortOn)}
				>
					{isSortOn ? 'Не сортировать' : 'Сортировать'}
				</Button>
			</div>

			{isOpenAddForm && (
				<AddTaskModal
					errorMessage={error}
					newTitle={newTitle}
					setNewTitle={setNewTitle}
					addTask={handleAddTask}
					cancelEdit={() => setIsOpenAddForm(false)}
				/>
			)}

			{isOpenEditingModal && (
				<EditingModal
					title={newTitle}
					setTitle={setNewTitle}
					saveTask={() => {
						handleUpdateTask({ ...currentTask, title: newTitle });
					}}
					cancelEdit={() => setIsOpenEditingModal(false)}
				/>
			)}

			<ul className={styles.todoList}>
				{sortedTasks.length === 0 ? (
					<span>Список пуст</span>
				) : (
					sortedTasks.map((task) => (
						<li key={task.id} className={styles.task}>
							{task.title}
							<div>
								<Button
									btnFn={() => onClickEditingBtn(task)}
									classbtn={styles.buttonChange}
								>
									Редактировать
								</Button>
								<Button
									btnFn={() => handleDeleteTask(task.id)}
									classbtn={styles.buttonDelete}
								>
									Удалить
								</Button>
							</div>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

// json-server --watch src/todos.json --port 3005 --delay 1500
