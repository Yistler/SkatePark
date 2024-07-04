document.addEventListener("DOMContentLoaded", function() {
    //id boton eliminar y actualizar
    const actualizarPerfil = document.getElementById('actualizar');
    const eliminarPerfil = document.getElementById('eliminar')

    //id modal
    const actualizarDisable = document.getElementById('actualizarDisable');
    const eliminarDisable = document.getElementById('eliminarDisable')

    // Inicializa el modal
    const actualizarModal = new bootstrap.Modal(document.getElementById('actualizarModal')); 
    const eliminarModal = new bootstrap.Modal(document.getElementById('eliminarModal'));
    

    actualizarPerfil.addEventListener('click', async function(e) {
        //e.preventDefault()
      
      // Muestra el modal
      actualizarModal.show();
    });

    eliminarPerfil.addEventListener('click', async function(e) {
        //e.preventDefault()
      
      // Muestra el modal
      eliminarModal.show();
    });
  
    // Cerrar el modal cuando se hace clic en el botón "Cerrar"
    actualizarDisable.addEventListener('click', function() {
        actualizarModal.hide(); // Cierra el modal
    });
    eliminarDisable.addEventListener('click', ()=>{
        eliminarModal.hide();
    })
  });
  