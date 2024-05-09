// index.js
import { getScores, getMushrooms,deleteMushroom } from './firebase2.js';

// Función para mostrar los scores en la web
const displayScores = async (orderByField, orderDirection) => {
    try {
        const scores = await getScores(orderByField, orderDirection);
        const scoresContainer = document.getElementById('tasks-container');
        scoresContainer.innerHTML = ''; // Limpia la tabla anterior

        const table = document.createElement('table');
        table.style.width = '100%'; // Establece la tabla para ocupar todo el ancho disponible
        table.innerHTML = `
            <tr>
                <th style="width: 10%;">Posición</th>
                <th style="width: 30%;">Fecha</th>
                <th style="width: 30%;">Creado por</th>
                <th style="width: 30%;">Puntuación</th>
            </tr>
        `;
        scores.forEach((score, index) => {
            const row = document.createElement('tr');
            row.style.borderBottom = '1px solid #ddd'; // Agrega una línea divisoria entre filas
            
            // Añadir imagen y color de fondo según la posición
            let positionContent = '';
            let backgroundColor = '';
            if (index === 0) {
                positionContent = '<img src="images/primero.png" alt="Primero" style="width: 30px; height: 30px;"/>';
                backgroundColor = '#ffd700'; // Amarillo para el primer lugar
            } else if (index === 1) {
                positionContent = '<img src="images/segundo.png" alt="Segundo" style="width: 30px; height: 30px;"/>';
                backgroundColor = '#c0c0c0'; // Gris para el segundo lugar
            } else if (index === 2) {
                positionContent = '<img src="images/tercero.png" alt="Tercero" style="width: 30px; height: 30px;"/>';
                backgroundColor = '#cd7f32'; // Bronce para el tercer lugar
            } else {
                positionContent = index + 1;
            }
            
            row.innerHTML = `
                <td style="text-align: center; background-color: ${backgroundColor};">${positionContent}</td>
                <td>${score.createdAt.toLocaleString('es-ES')}</td>
                <td>${score.createdBy}</td>
                <td style="text-align: center;">${score.score}</td>
            `;
            table.appendChild(row);
        });
        scoresContainer.appendChild(table);
    } catch (error) {
        console.error("Error al obtener o mostrar scores:", error);
    }
};



/*
// Función para mostrar las setas
const displayMushrooms = async () => {
    try {
        const mushrooms = await getMushrooms();
        const mushroomsContainer = document.getElementById('mushrooms-container');
        mushroomsContainer.innerHTML = ''; // Limpia el contenedor anterior

        mushrooms.forEach(mushroom => {
            const mushroomCard = document.createElement('div');
            mushroomCard.classList.add('mushroom-card');

            const commonName = document.createElement('h3');
            commonName.textContent = mushroom.commonName;
            mushroomCard.appendChild(commonName);

            const description = document.createElement('p');
            description.textContent = mushroom.description;
            mushroomCard.appendChild(description);

            const difficulty = document.createElement('p');
            difficulty.textContent = `Dificultad: ${mushroom.difficulty}`;
            mushroomCard.appendChild(difficulty);

            const mushroomType = document.createElement('p');
            mushroomType.textContent = `Tipo de hongo: ${mushroom.mushroomType}`;
            mushroomCard.appendChild(mushroomType);

            // Agregar la imagen
            const image = document.createElement('img');
            image.src = mushroom.imageUrl; // Asignar la URL de la imagen
            image.alt = mushroom.commonName; // Asignar un texto alternativo para la accesibilidad
            mushroomCard.appendChild(image);
            // Botón de eliminar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', async () => {
                await deleteMushroom(mushroom.id);
            });
            mushroomCard.appendChild(deleteButton);

            mushroomsContainer.appendChild(mushroomCard);
        });
    } catch (error) {
        console.error("Error al obtener los hongos:", error);
    }
};
*/

// Al cargar la página, muestra los scores y los hongos
window.addEventListener('DOMContentLoaded', async () => {
    await displayScores('score', 'desc');

    // Manejar cambios en la selección de ordenación
    document.getElementById('sort-select').addEventListener('change', async (e) => {
        const orderByField = e.target.value;
        const orderDirection = (orderByField === 'createdAt' || orderByField === 'score') ? 'desc' : 'asc';
        await displayScores(orderByField, orderDirection);
    });

    // Muestra los hongos
    //await displayMushrooms();
});
