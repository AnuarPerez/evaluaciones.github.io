      // Función para agregar datos a la tabla
        function agregarDatos(placa, evaluacion, fecha, novedades) {
            const tablaBody = document.getElementById("tabla-body");
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${placa}</td>
                <td>${evaluacion}</td>
                <td>${fecha}</td>
                <td>${novedades}</td>
                <td>
                    <button class="btn btn-warning" onclick="editarDato(this)">                    Editar</button>
                    <button class="btn btn-danger" onclick="eliminarDato(this)">Eliminar</button>
                </td>
            `;
            tablaBody.appendChild(fila);

            // Verificar si el dato ya existe en LocalStorage
            const datos = JSON.parse(localStorage.getItem("datos")) || [];
            const existe = datos.find((dato) => dato.placa === placa);
            if (!existe) {
                datos.push({ placa, evaluacion, fecha, novedades });
                localStorage.setItem("datos", JSON.stringify(datos));
            }
        }

        // Función para enviar formulario y agregar datos a la tabla
        document.getElementById("formulario").addEventListener("submit", (e) => {
            e.preventDefault();
            const placa = document.getElementById("placa").value;
            const evaluacion = document.getElementById("evaluacion").value;
            const fecha = document.getElementById("fecha_hora").value;
            const novedades = document.getElementById("novedades").value;
            agregarDatos(placa, evaluacion, fecha, novedades);
            document.getElementById("formulario").reset();
        });

        // Función para eliminar un dato de la tabla y de LocalStorage
        function eliminarDato(elemento) {
            const fila = elemento.parentNode.parentNode;
            const placa = fila.cells[0].textContent;
            const datos = JSON.parse(localStorage.getItem("datos")) || [];
            const indice = datos.findIndex((dato) => dato.placa === placa);
            if (indice !== -1) {
                datos.splice(indice, 1);
                localStorage.setItem("datos", JSON.stringify(datos));
            }
            fila.remove();
        }

        // Función para editar un dato de la tabla
        function editarDato(elemento) {
            const fila = elemento.parentNode.parentNode;
            const placa = fila.cells[0].textContent;
            const evaluacion = fila.cells[1].textContent;
            const fecha = fila.cells[2].textContent;
            const novedades = fila.cells[3].textContent;
            document.getElementById("placa").value = placa;
            document.getElementById("evaluacion").value = evaluacion;
            document.getElementById("fecha_hora").value = fecha;
            document.getElementById("novedades").value = novedades;
        }

        // Función para vaciar la tabla y eliminar todos los datos de LocalStorage
        document.getElementById("vaciar-tabla").addEventListener("click", () => {
            const tablaBody = document.getElementById("tabla-body");
            while (tablaBody.firstChild) {
                tablaBody.removeChild(tablaBody.firstChild);
            }
            localStorage.removeItem("datos");
        });

        // Recuperar datos de LocalStorage y mostrarlos en la tabla
        document.addEventListener("DOMContentLoaded", () => {
            const datos = JSON.parse(localStorage.getItem("datos")) || [];
            datos.forEach((dato) => {
                agregarDatos(dato.placa, dato.evaluacion, dato.fecha, dato.novedades);
            });
        });
        
        // GENERAR PDF-REPORTE
        document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnCrearPdf");
    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.getElementById("tabla1"); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 1,
                filename: 'documento.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a3",
                    orientation: 'portrait' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});