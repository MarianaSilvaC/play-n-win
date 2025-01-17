import { createModal } from '../assets/scripts/modal.js'
import { addRowCart } from '../assets/scripts/añadirFila.js'
import { addSale } from '../assets/scripts/agregarVenta.js'
import { generateTableSales } from '../assets/scripts/generarTablaVentas.js'

generateTableSales()
const btn_sell = document.querySelector('.btn-sell')

btn_sell.addEventListener('click', () => {
    createModal('modal-sale')
})

// Agrega un oyente de eventos al elemento padre que ya existe (por ejemplo, el documento o algún contenedor existente).
document.addEventListener('click', function (event) {
    const target = event.target
    const modalbg = document.querySelector('.modal-bg')
    const cant = document.querySelector('#cantidad-input')

    // Verifica si el elemento que desencadenó el evento es el botón "boton-agregar".
    if (target && target.id === 'btn-agregar') {
        addRowCart()
    }

    if (target && target.id === 'btn-submit') {
        addSale()
        modalbg.remove()
       
    }
    if (target && target.id === 'btn-clear') {
        modalbg.remove()
    }
})
