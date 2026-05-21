document.addEventListener('DOMContentLoaded', function() {
    
    // Conectar el formulario de reservaciones
    const formReserva = document.getElementById('formReserva');

    if (formReserva) {
        // Le agregamos 'async' aquí para poder esperar la respuesta del servidor
        formReserva.addEventListener('submit', async function(evento) {
            
            // Evitar que la página recargue
            evento.preventDefault(); 

            // Extraer valores
            const nombre = document.getElementById('resNombre').value.trim();
            const telefono = document.getElementById('resTelefono').value.trim();
            const fecha = document.getElementById('resFecha').value;
            const hora = document.getElementById('resHora').value;
            const personas = document.getElementById('resPersonas').value;

            // ====================================================================
            // 1. NUEVA LÓGICA: Enviar al servidor local (Backend)
            // ====================================================================
            const reservaData = {
                nombre: nombre,
                telefono: telefono,
                fecha: fecha,
                hora: hora,
                personas: personas
            };

            try {
                // Transmitir los datos al servidor en milisegundos
                const respuesta = await fetch('http://localhost:3000/api/reservaciones', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reservaData)
                });

                if (respuesta.ok) {
                    console.log("¡Éxito! Reserva guardada en el backend local.");
                }
            } catch (error) {
                console.error("Error de conexión con el backend:", error);
            }

            // ====================================================================
            // 2. LÓGICA ORIGINAL: Enviar a WhatsApp
            // ====================================================================
            const telefonoRestaurante = "527717226614";

            // Formatear el mensaje de WhatsApp
            const mensaje = `¡Hola! Me gustaría hacer una reservación en Garotinho Vias.%0A%0A*Detalles de la reserva:*%0A👤 Nombre: ${nombre}%0A📞 Teléfono: ${telefono}%0A📅 Fecha: ${fecha}%0A⏰ Hora: ${hora}%0A👥 Personas: ${personas}%0A%0A¿Me podrían confirmar la disponibilidad?`;

            // Construir enlace de WhatsApp
            const urlWhatsApp = `https://wa.me/${telefonoRestaurante}?text=${mensaje}`;

            // Abrir WhatsApp en una nueva pestaña
            window.open(urlWhatsApp, '_blank');
            
            // Limpiar el formulario
            formReserva.reset();
        });
    }
});