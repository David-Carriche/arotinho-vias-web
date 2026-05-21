const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ==========================================
// CONFIGURACIONES BÁSICAS
// ==========================================
app.use(cors()); // Permite que tu página web se comunique con este servidor
app.use(express.json()); // Le enseña al servidor a leer los datos del formulario

// Nuestra base de datos temporal (una lista vacía por ahora)
let reservaciones = [];

// ==========================================
// RUTAS (API)
// ==========================================

// 1. Ruta de prueba (Para ver que funcione en el navegador)
app.get('/', (req, res) => {
    res.send('¡El servidor de Garotinho Vias está vivo y corriendo!');
});

// 2. Ruta para que el dueño VEA las reservaciones
app.get('/api/reservaciones', (req, res) => {
    res.json(reservaciones);
});

// 3. Ruta para RECIBIR nuevas reservaciones desde la página web
app.post('/api/reservaciones', (req, res) => {
    const nuevaReserva = req.body;
    
    // Le agregamos un ID único y la hora exacta a la que cayó la reserva
    nuevaReserva.id = Date.now();
    nuevaReserva.fechaRegistro = new Date().toLocaleString();

    // Guardamos la reserva en nuestra lista
    reservaciones.push(nuevaReserva);

    console.log('¡🔔 Nueva reserva interceptada!', nuevaReserva);
    res.status(201).json({ mensaje: 'Reserva guardada con éxito', reserva: nuevaReserva });
});

// ==========================================
// ENCENDER EL SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});