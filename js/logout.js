async function salir() {
    await supabaseClient.auth.signOut();
    window.location.href = "index.html";
}