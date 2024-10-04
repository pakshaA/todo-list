import React, { useState } from "react"
import style from './TodoItem.module.css'

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoItemProps {
    task: Task;
    onDelete: () => void;
    onEdit: (newText: string) => void;
    onToggle: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ task, onDelete, onEdit, onToggle }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [newText, setNewText] = useState<string>(task.text)

    const handleSaveText = () => {
        onEdit(newText)
        setIsEditing(false)
    }

    return (
        <div className={`${style['TodoItem']} ${task.completed ? style['checked'] : ''}`}>
            <div className={style['text-div']}>
                {isEditing ? (
                    <>
                        <textarea
                            // type='text'
                            maxLength={250}
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            className={style['input-text']}

                        />
                        <p className={style['count']}>
                            {newText ? newText.length : 0}/250
                        </p>
                    </>
                ) : (
                    <div className={style['text']}>
                        {newText}
                    </div>
                )}
            </div>


            <div className={style['buttons-container']}>
                {isEditing ? (
                    <button className={style['button']} onClick={handleSaveText}>
                        <img src="/save.svg" alt="Сохранить" />
                    </button>
                ) : (
                    <button className={style['button']} onClick={() => setIsEditing(true)}>
                        <img src="/edit.svg" alt="Редактировать" />
                    </button>
                )}
                <button className={style['button']} onClick={onToggle}>
                    {task.completed ? (
                        <img src="/check.svg" alt="Выполенено" />
                    ) : (
                        <img src="/unchecked.svg" alt="Не выполнено" />
                    )}
                </button>
                <button className={style['button']} onClick={onDelete}>
                    <img src="/trash2.svg" alt="Удалить" />
                </button>
            </div>
        </div>
    )
} 