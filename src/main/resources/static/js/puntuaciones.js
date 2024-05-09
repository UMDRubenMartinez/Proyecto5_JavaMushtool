import { getScores} from 'baseScores.js';

// Función para mostrar los scores en la web
const displayScores = async (orderByField, orderDirection) => {
    try {
        const scores = await getScores(orderByField, orderDirection);
        const scoresContainer = document.getElementById('tasks-container');
        scoresContainer.innerHTML = ''; // Limpia la tabla anterior

        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Fecha</th>
                <th>Creado por</th>
                <th>Puntuación</th>
            </tr>
        `;
        scores.forEach(score => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${score.createdAt.toLocaleString('es-ES')}</td>
                <td>${score.createdBy}</td>
                <td>${score.score}</td>
            `;
            table.appendChild(row);
        });
        scoresContainer.appendChild(table);
    } catch (error) {
        console.error("Error al obtener o mostrar scores:", error);
    }
};


window.addEventListener('load', async () => {
    await displayScores('score', 'desc');

    // Manejar cambios en la selección de ordenación
    document.getElementById('sort-select').addEventListener('change', async (e) => {
        const orderByField = e.target.value;
        const orderDirection = (orderByField === 'createdAt' || orderByField === 'score') ? 'desc' : 'asc';
        await displayScores(orderByField, orderDirection);
    });

});
