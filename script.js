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
const tableBody = document.getElementById('tableBody');

// Funciones

function init(){
    rellenarTabla(usuarios)
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

// Eventos
document.getElementById('searchInput').addEventListener('input', buscar);
document.getElementById('formAgregar').addEventListener('submit', agregarCliente);
init()