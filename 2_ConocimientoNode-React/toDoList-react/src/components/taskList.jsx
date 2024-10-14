import React from 'react';

export default function TaskList({ tasks, setTasks, setListUpdated, task, setTask }) {
    
    const handleDelete = (id) => {
        const requestInit = {
            method: 'DELETE'
        };

        fetch(`http://localhost:8000/api/tareas/${id}`, requestInit)
        .then(res => res.json())
        .then(res => console.log(res))
        setListUpdated(true);
    };

    const handleUpdate = (id, completed) => {
        const newTitle = prompt("Ingresa el nuevo titulo", task.title);
        if (newTitle) {
            const requestInit = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTitle, completed }) 
            };
            fetch(`http://localhost:8000/api/tareas/${id}`, requestInit)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    setListUpdated(true);
                });
        }
    };

    const handleCheckboxChange = (id, completed) => {
        handleUpdate(id, !completed); 
    };

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Completed</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td>
                            <input 
                                type="checkbox" 
                                checked={task.completed} 
                                onChange={() => handleCheckboxChange(task.id, task.completed)} 
                            />
                        </td>
                        <td>
                            <button style={{ marginRight: 10 }} className='btn btn-danger' onClick={() => handleDelete(task.id)}>Delete</button>
                            
                            <button className='btn btn-dark' onClick={() => handleUpdate(task.id, task.completed)}>Update</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
