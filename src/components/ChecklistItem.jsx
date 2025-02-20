import { useDispatch } from "react-redux";
import { toggleTask } from "../features/checklistSlice";

export default function ChecklistItem({ task }) {
    const dispatch = useDispatch();

    return (
        <div className="flex items-center p-3 bg-gray-200 dark:bg-gray-800 rounded-lg">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleTask(task.id))}
                className="mr-3 h-5 w-5"
            />
            <span className={`${task.completed ? "line-through text-gray-500" : "text-black dark:text-white"}`}>
                {task.text}
            </span>
        </div>
    );
}
