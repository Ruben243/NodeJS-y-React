import '../css/style.scss';

const clientes = ['Antonio', 'Maria', 'Cristina', 'Manolin'];
let html = '';
clientes.forEach(cliente => {
    html += `
    <li>${cliente}</li>
    `;
});


document.querySelector('#clientes').innerHTML = html;