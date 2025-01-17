// Agregar un evento de escucha para el botón de limpiar filtro
btnClear.addEventListener('click', () => {
    // Restablece todos los campos del formulario a sus valores iniciales
    filterForm.reset();
    // Regenera la tabla al estado inicial (sin filtros)
    generateTableSales(); // Llama a generateTableSales nuevamente después de restablecer los filtros
});

export function generateTableSales() {
    const apiURL = 'https://6534761be1b6f4c59046be6a.mockapi.io/api/games/ventas'

    // document.addEventListener('DOMContentLoaded', () => {
    const ventasTableBody = document.querySelector('#sales-results tbody')

    // Crear un Map para relacionar los títulos de juegos con los nombres de las imágenes
    //Estara hardcodeado por mientras
    const imagenesJuegosMap = new Map([
        ['Horizon Zero Dawn', 'horizon.jpg'],
        ['Beyond: Two Souls', 'beyond.jpg'],
        ['Animal Crossing: New Horizons', 'animal.jpg'],
        ['The Last of Us', 'TLOU.jpg'],
        ['Until Dawn', 'untildawn.jpg'],
        ['Saints Row IV', 'saintsrow.jpg'],
        ['Wick', 'wick.jpg'],
        ['Outlast', 'outlast.jpg'],
        ['The Witcher 3: Wild Hunt', 'witcher.jpg'],
        ['Detroit: Become Human', 'detroit.jpg'],
        ['Doki Doki Literature Club!', 'doki.jpg'],
        ['The Binding of Isaac: Rebirth', 'isaac.jpg'],
        ['Injustice 2', 'injustice2.jpg'],
        ['Tekken 7', 'tekken7.jpg'],
        ['Crash Bandicoot N. Sane Trilogy', 'crash.jpg'],
        ['Call of Duty: Modern Warfare', 'cod.jpg'],
        ['Mario Kart 8 Deluxe', 'mariokart.jpg'],
        ['Mario Party Superstars', 'marioparty.jpg'],
        ['Cuphead', 'cuphead.jpg'],
        ['Horizon Forbidden West', 'horizon2.jpg'],
    ])

    // Realiza una solicitud fetch a la API
    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            // Itera sobre los datos y crea las filas de la tabla
            data.forEach((venta) => {
                const newRow = ventasTableBody.insertRow()

                // Agrega las celdas para cada columna de la tabla
                const checkboxCell = newRow.insertCell(0)
                const orderNumberCell = newRow.insertCell(1)
                const dateCell = newRow.insertCell(2)
                const productCell = newRow.insertCell(3)
                const priceCell = newRow.insertCell(4)
                const sellerCell = newRow.insertCell(5)

                // Agregar checkbox
                // Crea un elemento input de tipo checkbox
                const checkbox = document.createElement('input')
                checkbox.type = 'checkbox'
                // Agrega el checkbox a la celda
                checkboxCell.appendChild(checkbox)

                // Llena las celdas con los datos de la venta
                orderNumberCell.textContent = venta['numero-de-orden']
                dateCell.textContent = venta.fecha
                sellerCell.textContent = venta.vendedor

                // Crea una lista desordenada para los productos
                const productList = document.createElement('ul')
                venta.productos.forEach((producto) => {
                    const listItem = document.createElement('li')

                    // Obtiene el nombre de la imagen desde el mapa
                    const imagenNombre = imagenesJuegosMap.get(producto.titulo)
                    const imagenSrc = `../assets/img/covers/${imagenNombre}`

                    listItem.innerHTML = `<img src="${imagenSrc}" alt="${producto.titulo}" /> ${producto.titulo} x${producto.cantidad}`
                    productList.appendChild(listItem)
                })
                productCell.appendChild(productList)

                // Formatea el precio como moneda
                priceCell.textContent = venta.total
            })
        })
        .catch((error) => {
            console.error('Error al cargar datos:', error)
        })
    // })
}

function regenerarTablaInicial() {
    // Realiza una solicitud para obtener los datos iniciales de la tabla
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            // Actualiza la tabla con los datos iniciales
            actualizarTablaConResultados(data);
            generateTableSales(); // Llama a generateTableSales después de cargar los datos iniciales
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        });
}


