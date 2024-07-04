document.addEventListener("DOMContentLoaded", function() {
    const recuperarPasBtn = document.getElementById('recuperar');
    const mensajeModal = new bootstrap.Modal(document.getElementById('mensajeModal'));
    const modalDisable = document.getElementById('modalDisable');
    const emailInput = document.getElementById('emailInput'); // Añadir el ID del input del email
  
    recuperarPasBtn.addEventListener('click', async function() {
      const email = emailInput.value; // Obtener el valor del input del email
      
      // Aquí podrías agregar código para enviar el correo de recuperación
      try {
        const response = await fetch('/recuperarPassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email }) // Enviar el email como JSON en el cuerpo de la solicitud
        });
  
        if (response.ok) {
          // Mostrar el modal si la solicitud al servidor fue exitosa
          mensajeModal.show();
        } else {
          console.error('Error al enviar el correo de recuperación');
          // Manejar el error de alguna manera apropiada
        }
      } catch (error) {
        console.error('Error de red:', error);
        // Manejar errores de red (por ejemplo, conexión fallida)
      }
    });
  
    // Cerrar el modal cuando se hace clic en el botón "Cerrar"
    modalDisable.addEventListener('click', function() {
      mensajeModal.hide(); // Cierra el modal
    });
  });
  