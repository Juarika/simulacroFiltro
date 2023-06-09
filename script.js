// Variables
let usuarios = [
    {
    nombre: "Juan",
    apellido: "Lozada",
    identificacion: "2222222",
    telefono: 111111,
    correo: "juan@example.com",
    nacimiento: "2002/02/02",
    nacionalidad: "Colombiano"
  },
  {
    nombre: "Erika",
    apellido: "Perez",
    identificacion: "2222222",
    telefono: 111111,
    correo: "juan@example.com",
    nacimiento: "2002/02/02",
    nacionalidad: "Colombiano"
  },
  {
    nombre: "Mia",
    apellido: "Lozada",
    identificacion: "2222222",
    telefono: 111111,
    correo: "juan@example.com",
    nacimiento: "2002/02/02",
    nacionalidad: "Colombiano"
  }
];
let rutas = [
    {
        id: 1,
        nombre: "Buc-Bog",
        precio: 100,
        origen: "Bucaramanga",
        destino: "Bogota",
        puntos: 10
    },
    {
        id: 2,
        nombre: "Buc-Car",
        precio: 150,
        origen: "Bucaramanga",
        destino: "Cartagena",
        puntos: 15
    },
    {
        id: 3,
        nombre: "Bog-Car",
        precio: 120,
        origen: "Bogota",
        destino: "Cartagena",
        puntos: 12
    }
]
const tableBody = document.getElementById('tableBody');
const rowRuta = document.getElementById('rowRutas');


// Funciones

function init(){
    rellenarTabla(usuarios)
    rellenarRutas(rutas)
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
    let id = 1;
    for (let ruta of rutas) {
        const div = document.createElement('div');
        div.classList = "card m-1";
        div.id = 'ruta' + id;
        div.innerHTML = `
        <h5 class="card-title">${ruta.nombre}</h5>
        <div class="card-body d-flex justify-content-between">
            <table class="g-2">
                <tr><th>ID</th><td class="text-center">${id}</td></tr>
                <tr><th>Precio</th><td class="text-center">$${ruta.precio}</td></tr>
                <tr><th>Ciudad Origen</th><td class="text-center">${ruta.origen}</td></tr>
                <tr><th>Ciudad Destino</th><td class="text-center">${ruta.destino}</td></tr>
                <tr><th>Puntos Fidelizacion</th><td class="text-center">${ruta.puntos}</td></tr>
            </table>
            <button type="button" class="btn btn-outline-danger" onclick="eliminarRuta(${id})">Eliminar</button>
        </div>`
        rowRuta.appendChild(div);
        id++;
    }
}

function eliminarRuta(id) {
    let eliminado = document.getElementById('ruta'+id);
    rowRuta.removeChild(eliminado);
    rutas.splice(id, 1);
}

// Eventos
init()
    // Clientes
document.getElementById('searchInput').addEventListener('input', buscar);
document.getElementById('formAgregar').addEventListener('submit', agregarCliente);

    // Rutas
