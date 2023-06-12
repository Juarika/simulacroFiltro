// Variables
const tableBody = document.getElementById('tableBody');
const rowRuta = document.getElementById('rowRutas');
let idRuta = 1;

// Funciones

function init(){
    rellenarTabla(usuarios)
    rellenarRutas(rutas)
    agregarSelects(usuarios, rutas)
}

function agregarCliente(e) {
    e.preventDefault();
    let usuario = {
        nombre: document.getElementById('formNombre').value,
        apellido: document.getElementById('formApellido').value,
        identificacion: document.getElementById('formIdentificacion').value,
        telefono: document.getElementById('formTelefono').value,
        correo: document.getElementById('formCorreo').value,
        nacimiento: document.getElementById('formNacimiento').value,
        nacionalidad: document.getElementById('formNacionalidad').value
    }
    usuarios.push(usuario);
    console.log(usuarios);
    rellenarTabla(usuarios);
    document.getElementById('formAgregar').reset();
}

function rellenarTabla(usuarios) {
    tableBody.innerHTML = '';
    let id = 0;
    for (let usuario of usuarios) {
        const row = document.createElement('tr');
        row.id = 'usuario' + id;
        row.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.apellido}</td>
        <td>${usuario.identificacion}</td>
        <td>${usuario.nacimiento}</td>
        <td>${usuario.correo}</td>
        <td>${usuario.nacionalidad}</td>
        <td><button type="button" class="btn btn-outline-danger" onclick="eliminar(${id})">Eliminar</button> <button type="button" class="btn btn-outline-success" onclick="editar(${id})" id="botonEditar">Editar</button></td>`
        tableBody.appendChild(row)
        id++;
    }
    
}

function eliminar(id) {
    let eliminado = document.getElementById('usuario'+id);
    tableBody.removeChild(eliminado);
    usuarios.splice(id, 1);
    console.log(usuarios)
}

function buscar() {
    const buscado = document.getElementById('searchInput').value.toLowerCase();
    const rows = tableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const columns = rows[i].getElementsByTagName('td');
        let found = false;
        for (let j = 0; j < columns.length; j++) {
            const columnValue = columns[j].textContent.toLowerCase();
            if (columnValue.includes(buscado)) {
                found = true;
                break;
            }
        }
        if (found) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

function editar(id) {
    let form = document.getElementById('formAgregar')
    let inputs = form.getElementsByTagName('input')
    console.log(inputs)
    let [nombre, apellido, telefono, identificacion, nacimiento, correo, nacionalidad] = inputs
    if (nombre.value != '' || apellido.value !='' || telefono.value !='' || identificacion.value !='' || nacimiento.value !='' || correo.value !='' || nacionalidad.value !='' ) {
        alert ('Esta editando otro usuario')
        return
    }
    let usuario = usuarios[id];
    let fecha_nac = usuario.nacimiento
    let cambiada = fecha_nac.split("/").join("-");
    nombre.value = usuario.nombre;
    apellido.value = usuario.apellido;
    telefono.value = usuario.telefono;
    identificacion.value = usuario.identificacion;
    nacimiento.value = cambiada;
    correo.value = usuario.correo;
    nacionalidad.value = usuario.nacionalidad;
    eliminar(id);
}

function rellenarRutas(rutas) {
    rowRuta.innerHTML = ''
    id = 1;
    for (let ruta of rutas) {
        const div = document.createElement('div');
        div.classList = "card m-1";
        div.id = 'ruta' + id;
        div.innerHTML = `
        <h5 class="card-title">${ruta.nombre}</h5>
        <div class="card-body d-flex justify-content-between">
            <table class="g-2">
                <tr><th>ID</th><td class="text-center">${id}</td></tr>
                <tr><th>Valor del Tiquete</th><td class="text-center">$${ruta.precio}</td></tr>
                <tr><th>Ciudad Origen</th><td class="text-center">${ruta.origen}</td></tr>
                <tr><th>Ciudad Destino</th><td class="text-center">${ruta.destino}</td></tr>
                <tr><th>Puntos Fidelizacion</th><td class="text-center">${ruta.puntos}</td></tr>
            </table>
            <button type="button" class="btn btn-outline-danger" onclick="eliminarRuta(${id})">Eliminar</button>
        </div>`
        rowRuta.appendChild(div);
        id++;
    }
    idRuta = id; 
}

function eliminarRuta(id) {
    let eliminado = document.getElementById('ruta'+id);
    rowRuta.removeChild(eliminado);
    rutas.splice(id, 1);
}

function agregarRuta(e) {
    e.preventDefault();
    let origen = document.getElementById('formOrigen').value;
    let destino = document.getElementById('formDestino').value;
    let precio = document.getElementById('formPrecio').value;
    let ruta = {
        id: idRuta,
        nombre: origen.substr(0, 3) + '-' + destino.substr(0, 3),
        precio: precio,
        origen: origen,
        destino: destino,
        puntos: precio*0.1
    }
    rutas.push(ruta);
    rellenarRutas(rutas);
    document.getElementById('formAgregarRuta').reset();
}

function agregarSelects(usuarios, rutas) {
    usuarios.forEach(usuario => {
        let opcion = document.createElement('option');
        opcion.value = usuario.nombre + ' ' + usuario.apellido;
        opcion.textContent = usuario.nombre + ' ' + usuario.apellido;
        document.getElementById('selectUsuario').appendChild(opcion)
    });
    rutas.forEach(ruta => {
        let opcion = document.createElement('option');
        opcion.value = rutas.indexOf(ruta);
        opcion.textContent = ruta.nombre;
        document.getElementById('selectRuta').appendChild(opcion)
    });
}

function tiquetes(e) {
    e.preventDefault();
    let div = document.getElementById('factura');
    let opcionCliente = document.getElementById('selectUsuario').value;
    let opcionRuta = document.getElementById('selectRuta').value;
    let precio = rutas[opcionRuta].precio 
    let precioTotal = (precio*1.16) + (precio*0.04)
    div.className = 'show'
    div.innerHTML = `
    <div class="card card-body" style="width: 500px;">
        <h3>Factura</h3>
        <div class="position-absolute top-0 start-100 translate-middle">
        <button type="button" class="btn-close" id="cerrar"></button>
        </div>
        <table class="g-2">
            <tr><th>Cliente</th><td class="text-end">${opcionCliente}</td></tr>
            <tr><th>Valor del Tiquete</th><td class="text-end">$${precioTotal}</td></tr>
            <tr><th>Ciudad Origen</th><td class="text-end">${rutas[opcionRuta].origen}</td></tr>
            <tr><th>Ciudad Destino</th><td class="text-end">${rutas[opcionRuta].destino}</td></tr>
            <tr><th>Puntos Fidelizacion</th><td class="text-end">${rutas[opcionRuta].puntos}</td></tr>
        </table>
    </div>`
    document.getElementById('formTiquetes').reset();
    document.getElementById('cerrar').addEventListener('click', () => {
        div.innerHTML = '';
    });
}
    

// Eventos
init()
    // Clientes
document.getElementById('searchInput').addEventListener('input', buscar);
document.getElementById('formAgregar').addEventListener('submit', agregarCliente);
    // Rutas
document.getElementById('formAgregarRuta').addEventListener('submit', agregarRuta);
document.getElementById('formTiquetes').addEventListener('submit', tiquetes);

// Se debe seleccionar el cliente de la lista de registrados.
//  Se debe seleccionar la ruta de viaje: Nombre de Ruta
//  Al valor de la ruta elegida, se le debe aplicar el impuesto del IVA 16% y el valor de la
// tasa aeroportuaria del 4% sobre el valor antes del IVA.
//  Cuando finalice el proceso de compra el sistema mostrará el resumen de la compra y
// abonará los puntos para su fidelización.`