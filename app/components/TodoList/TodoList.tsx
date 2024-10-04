'use client'

import React, { useState, useEffect } from "react"
import style from './TodoList.module.css'
import { TodoItem } from "../TodoItem/TodoItem"
import { Modal } from "../Modal/Modal"

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export const TodoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    let newText: string;


    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, [])

    const handleEditTask = (id: number, newText: string) => {
        setTasks(prevTasks =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, text: newText } : task
            )
        )
    }

    const handleAddTask = (taskText: string) => {
        const newTask = { id: Date.now(), text: taskText, completed: false };
        setTasks([...tasks, newTask]);
        localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    };

    const saveTasksToLocalStorage = (tasks: Task[]) => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    const deleteTask = (taskId: number) => {
        const confirmDelete = confirm("Вы действительно хотите удалить?");
        if (confirmDelete) {
            const updatedTasks = tasks.filter((task) => task.id !== taskId)
            setTasks(updatedTasks);
            saveTasksToLocalStorage(updatedTasks);
        }
    }

    const deleteAll = () => {
        const confirmDelete = confirm("Вы действительно хотите удалить все задачи?");
        if (confirmDelete) {
            setTasks([]);
            saveTasksToLocalStorage([])
        }
    }

    const toggleTaskCompletiton = (taskId: number) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        )
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
    }

    return (
        <div className={style['TodoList']}>
            <div className={style['button-container']}>
                <button onClick={() => setIsModalOpen(true)} className={style["Button"]}>Добавить задачу</button>
                {tasks.length > 0 &&
                    <button onClick={() => deleteAll()} className={style['Button']}>Удалить все</button>
                }
            </div>
            <div className={style['todos-list']}>
                {tasks.map((task) => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        onDelete={() => deleteTask(task.id)}
                        onEdit={() => handleEditTask(task.id, newText)}
                        onToggle={() => toggleTaskCompletiton(task.id)}
                    />
                ))}
            </div>


            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddTask}
            />
        </div>
    )
} 
