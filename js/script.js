
const formulario = document.getElementById("formulario-proyecto");
const mensaje = document.getElementById("mensaje-formulario");

const SERVICE_ID = "service_drinka";
const TEMPLATE_ID = "template_36p4bhc";
const PUBLIC_KEY = "uVLAioW3JyTgDFU4E";

// Inicializar EmailJS
if (typeof emailjs !== "undefined") {
    emailjs.init({
        publicKey: PUBLIC_KEY
    });
}

if (formulario && mensaje) {
    formulario.addEventListener("submit", async function (evento) {
        evento.preventDefault();

        // Comprobar que los campos obligatorios estén completos
        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        // Protección antispam
        const campoAntispam = formulario.elements.namedItem("website");

        if (campoAntispam && campoAntispam.value.trim() !== "") {
            return;
        }

        // Comprobar que EmailJS esté disponible
        if (typeof emailjs === "undefined") {
            mensaje.textContent = "No se pudo conectar con el servicio de envío. Recarga la página e inténtalo nuevamente.";
            mensaje.style.color = "#B54747";
            mensaje.style.display = "block";
            return;
        }

        const boton = formulario.querySelector('button[type="submit"]');
        const textoOriginal = boton.textContent;

        // Preparar los datos del formulario
        const parametros = {
            nombre: formulario.elements.namedItem("nombre").value.trim(),
            negocio: formulario.elements.namedItem("negocio").value.trim(),
            correo: formulario.elements.namedItem("correo").value.trim(),
            telefono: formulario.elements.namedItem("telefono").value.trim(),
            tipo_proyecto: formulario.elements.namedItem("tipo-proyecto").value,
            plan: formulario.elements.namedItem("plan").value,
            presupuesto: formulario.elements.namedItem("presupuesto").value,
            descripcion: formulario.elements.namedItem("descripcion").value.trim()
        };

        // Mostrar estado de envío
        boton.disabled = true;
        boton.textContent = "Enviando...";

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                parametros
            );

            mensaje.textContent = "¡Gracias por confiar en Drinka! Tu solicitud fue enviada correctamente.";
            mensaje.style.color = "#536B50";
            formulario.reset();

        } catch (error) {
            console.error("Error al enviar la solicitud:", error);

            mensaje.textContent = "No pudimos enviar tu solicitud. Inténtalo nuevamente o escríbenos a drinkacat@gmail.com.";
            mensaje.style.color = "#B54747";

        } finally {
            mensaje.style.display = "block";
            boton.disabled = false;
            boton.textContent = textoOriginal;
        }
    });
}
