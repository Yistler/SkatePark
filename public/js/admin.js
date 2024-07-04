document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', async function() {
        const skaterId = this.id.replace('estado', ''); // Obtener el ID del skater desde el ID del checkbox
        const estado = this.checked; // Obtener el estado del checkbox (true o false)
        
        try {
          // Realizar una solicitud AJAX al servidor
          const response = await fetch(`/estado`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ skaterId, estado })
          });
          
          if (response.ok) {
            console.log(`Estado actualizado para el skater con ID ${skaterId}`);
          } else {
            console.error('Error al actualizar el estado del skater');
          }
        } catch (error) {
          console.error('Error al procesar la solicitud:', error);
        }
      });
    });
  });
  