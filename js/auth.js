async function verificarSesion() {

    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
        console.error(error);
        return;
    }

    if (!data.session) {
        window.location = "index.html";
    }
}

verificarSesion();