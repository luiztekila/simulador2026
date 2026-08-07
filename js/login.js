document.getElementById("btnIngresar").addEventListener("click", login);

async function login() {

    try {

        const email = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value;

        console.log("Iniciando login...");

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        console.log("DATA:", data);
        console.log("ERROR:", error);

        if (error) {
            alert(error.message);
            return;
        }

        console.log("Login correcto");

        alert("Login correcto. Voy a abrir principal.html");

        window.location.href = "principal.html";

    } catch (e) {
        console.error("ERROR GENERAL:", e);
        alert(e.message);
    }
}