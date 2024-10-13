import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskList from './components/taskList';
import NewTask from './components/newTask';
import Footer from './components/footer.jSX';

function App() {
    const [task, setTask] = useState({
        title: '',
        completed: false
    });
    
    const [tasks, setTasks] = useState([]);
    const [listUpdated, setListUpdated] = useState(false);

    useEffect(() => {
        const getTasks = async () => {
            const res = await fetch('http://localhost:8000/api/tareas');
            const data = await res.json();
            setTasks(data);
        };
        getTasks();
        setListUpdated(false)
    }, [listUpdated]);

    const refreshTaskList = () => {
        setListUpdated(prev => !prev); 
    };

    return (
        <>
            <NavBar brand='To Do List' />
            <div className="app-container d-flex flex-column min-vh-100"> {/* Agregado para flexbox */}
            <div className='container flex-fill'> {/* Flex-fill para que ocupe espacio disponible */}
                <h2 id='header'>Task List</h2>
                <TaskList task={task} setTask={setTask} tasks={tasks} setTasks={setTasks} setListUpdated={setListUpdated} />
                <NewTask task={task} setTask={setTask} setTasks={setTasks} setListUpdated={setListUpdated} />
            </div>
            <Footer /> {/* Footer al final */}
        </div>
        </>
    );
}

export default App;
