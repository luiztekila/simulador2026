// guardian.js - Protege las páginas de los temas
async function verificarUsuarioAlCargar() {
    // 1. Verificar si hay un cliente de Supabase inicializado en la página
    if (typeof supabase === 'undefined') {
        console.error("Supabase no está inicializado. Asegúrate de incluir el CDN antes de este script.");
        return;
    }

    try {
        // 2. Hacer una petición real al servidor de Supabase para validar al usuario
        const { data: { user }, error } = await supabase.auth.getUser();

        // 3. Si el servidor da error o el usuario fue eliminado del backend
        if (error || !user) {
            alert("Acceso denegado: Tu sesión ha expirado o tu usuario fue dado de baja.");
            localStorage.clear(); // Limpia los tokens viejos del navegador
            window.location.href = 'index.html'; // Lo saca a la página de inicio
        }
    } catch (err) {
        console.error("Error en la verificación de seguridad:", err);
        window.location.href = 'index.html';
    }
}

// Se ejecuta automáticamente en cuanto el navegador lee este archivo
verificarUsuarioAlCargar();
