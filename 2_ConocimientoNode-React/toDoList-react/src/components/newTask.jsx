import React from 'react';

export default function NewTask({ task, setTask, setTasks,setListUpdated }) { // Recibir setTasks como prop

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = (e) => {
        // Validación campo vacío
        e.preventDefault();
        if (task.title.trim() === '') {
            alert('El título de la tarea es requerido');
            return;
        }

        // Envío de petición POST a la API
        const requestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        };

        fetch('http://localhost:8000/api/tareas', requestInit)

        .then(res => res.json())
        .then(res => console.log(res))
        setListUpdated(true)

        //reiniciando titulo del formulario
        setTask(
        {
            title:''
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              
                <label htmlFor="title" className="form-label">Title</label>
                <input 
                name='title'
                onChange={handleChange}
                value={task.title}
                type='text'
                className="form-control" />

            </div>
            <button type="submit" className="btn btn-primary">Add Task</button>
        </form>
    );
}
