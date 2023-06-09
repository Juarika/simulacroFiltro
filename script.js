// Variables
let usuarios = [
    {
    nombre: "Juan",
    apellido: "Lozada",
    identificacion: "2222222",
    telefono: 111111,
    correo: "juan@example.com",
    nacimiento: "02/02/02",
    nacionalidad: "Colombiano"
  },
  {
    nombre: "Erika",
    apellido: "Perez",
    identificacion: "2222222",
    telefono: 111111,
    correo: "juan@example.com",
    nacimiento: "02/02/02",
    nacionalidad: "Colombiano"
  },
  {
    nombre: "Mia",
    apellido: "Lozada",
    identificacion: "2222222",
    telefono: 111111,
    correo: "juan@example.com",
    nacimiento: "02/02/02",
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
    usuarios.push(usuario)
    console.log(usuarios)
    rellenarTabla(usuarios)
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
    let usuario = usuarios[id];
    document.getElementById('formNombre').value = usuario.nombre;
    document.getElementById('formApellido').value = usuario.apellido;
    document.getElementById('formIdentificacion').value = usuario.identificacion;
    document.getElementById('formNacimiento').value = usuario.nacimiento;
    document.getElementById('formCorreo').value = usuario.correo;
    document.getElementById('formNacionalidad').value = usuario.nacionalidad;
    document.getElementById('agregarCliente').value = 'Editar';

}

// Eventos
document.getElementById('searchInput').addEventListener('input', buscar);
document.getElementById('formAgregar').addEventListener('submit', agregarCliente);
init()