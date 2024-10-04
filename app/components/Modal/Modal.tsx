import React from "react";
import style from './Modal.module.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (taskText: string) => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
    const [taskText, setTaskText] = React.useState<string>("");

    if (!isOpen) return null;

    const handleSave = () => {
        if (taskText.trim()) {
            onSave(taskText);
            setTaskText("");
            onClose();
        } else {
            alert("Введите текст задачи");
        }
    };

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <h2>Новая задача</h2>
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Введите задачу"
                />
                <button onClick={handleSave}>Сохранить</button>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};
