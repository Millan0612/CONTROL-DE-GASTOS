let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = [];

function agregarGasto() {
    let nombreGasto = document.getElementById('nombreGasto').value.trim();
    let valorGasto = parseFloat(document.getElementById('valorGasto').value);
    let descripcionGasto = document.getElementById('descripcionGasto').value.trim();

    // Validar que los campos no estén vacíos y que el valor sea un número válido
    if (nombreGasto === '' || isNaN(valorGasto) || descripcionGasto === '') {
        alert('Por favor, complete todos los campos correctamente.');
        return;
    }

    if (valorGasto > 150) {
        alert('¡Atención! Has registrado un gasto mayor a 150 pesos!');
    }

    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);
    listaDescripcionesGastos.push(descripcionGasto);

    actualizarListaGastos();
}

function actualizarListaGastos() {
    const totalElementos = document.getElementById('totalGastos');
    const listaElementos = document.getElementById('listaDeGastos');
    let htmlLista = '';
    let totalGastos = 0;
    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = listaValoresGastos[posicion];
        const descripcionGasto = listaDescripcionesGastos[posicion];
        htmlLista += `<li>
            <strong>${elemento}</strong> - COP ${valorGasto.toFixed(3)}
            <br>
            <em>Descripción: ${descripcionGasto}</em>
            <br>
            <button onclick="editarGasto(${posicion});">Editar</button>
            <button onclick="eliminarGasto(${posicion});">Eliminar</button>
        </li>`;

        totalGastos += valorGasto;
    });
    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(3);
    limpiar();
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
    document.getElementById('botonAgregar').style.display = 'inline-block';
    document.getElementById('botonActualizar').style.display = 'none';
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);
    actualizarListaGastos();
}

function editarGasto(posicion) {
    const nombre = listaNombresGastos[posicion];
    const valor = listaValoresGastos[posicion];
    const descripcion = listaDescripcionesGastos[posicion];

    document.getElementById('nombreGasto').value = nombre;
    document.getElementById('valorGasto').value = valor;
    document.getElementById('descripcionGasto').value = descripcion;

    document.getElementById('botonAgregar').style.display = 'none';
    document.getElementById('botonActualizar').style.display = 'inline-block';
    
    document.getElementById('botonActualizar').onclick = function() {
        actualizarGastoExistente(posicion);
    };
}

function actualizarGastoExistente(posicion) {
    let nombreGasto = document.getElementById('nombreGasto').value.trim();
    let valorGasto = parseFloat(document.getElementById('valorGasto').value);
    let descripcionGasto = document.getElementById('descripcionGasto').value.trim();

    // Validar que los campos no estén vacíos y que el valor sea un número válido
    if (nombreGasto === '' || isNaN(valorGasto) || descripcionGasto === '') {
        alert('Por favor, complete todos los campos correctamente.');
        return;
    }

    listaNombresGastos[posicion] = nombreGasto;
    listaValoresGastos[posicion] = valorGasto;
    listaDescripcionesGastos[posicion] = descripcionGasto;

    actualizarListaGastos();
}