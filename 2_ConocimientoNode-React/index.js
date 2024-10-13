import express from 'express';
import fs, { write } from "fs" //permite leer y escribir archivos del sistema
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
app.use(bodyParser.json());
app.use(express.json())
app.use(cors());


//constantes
const puerto = 8000;

//validacion estado servidor
app.listen(puerto, () => {
    console.log(`Servidor arriba en puerto ${puerto}`);
}).on('error', (err) => {
    console.error('Error al levantar el servidor:', err);
});

//funciones
const leerData = () => {
    try {
        const data = fs.readFileSync('./tareas.json');
        return JSON.parse(data);
    } catch (error) {
        console.log('Error al leer archivo:', error);
    }
}

const escribirData = (data) => {
    try {
        fs.writeFileSync('./tareas.json', JSON.stringify(data));
    } catch (error) {
        console.log('Error al escribir archivo:', error);
    }
}

//rutas
app.get('/api', (req, res) => {
    res.send('to do list con express');
});

app.get('/api/tareas', (req, res) => {
    const data = leerData();
    res.json(data.toDoList);
});

app.get('/api/tareas/:id', (req, res) => {
    const data = leerData();
    const id = parseInt(req.params.id);
    const tarea = data.toDoList.find(tarea => tarea.id === id);
    res.json(tarea);
});

app.post('/api/tareas', (req, res) => {
    const data = leerData();
    const body = req.body;
    const nuevaTarea = {
        "id": data.toDoList.length + 1,
        ...body,
    }
    data.toDoList.push(nuevaTarea);
    escribirData(data);
    res.json(nuevaTarea);
});

app.put('/api/tareas/:id', (req, res) => {
    const data = leerData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const tareaIndex = data.toDoList.findIndex((tarea) => tarea.id === id);

    data.toDoList[tareaIndex] = {
        ...data.toDoList[tareaIndex],
        ...body,
    };
    escribirData(data);
    res.json({ message: "Tarea actualizada" });
});

app.delete('/api/tareas/:id', (req, res) => {
    const data = leerData();
    const id = parseInt(req.params.id);
    const tareaIndex = data.toDoList.findIndex((tarea) => tarea.id === id);
    data.toDoList.splice(tareaIndex, 1);
    escribirData(data)
    res.json({ message: "tarea eliminada" })
});