document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const tableBody = document.querySelector('#phonebook tbody');

    function normalizeText(text) {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.gerencia}</td>
                <td>${entry.area}</td>
                <td>${entry.nome}</td>
                <td>${entry.telefone}</td>
                <td>${entry.ramal}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    fetch('/assets/xml/data.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const entries = xmlDoc.getElementsByTagName('entry');
            const phonebook = [];

            for (let i = 0; i < entries.length; i++) {
                const gerencia = entries[i].getElementsByTagName('gerencia')[0].textContent;
                const area = entries[i].getElementsByTagName('area')[0].textContent;
                const nome = entries[i].getElementsByTagName('nome')[0].textContent;
                const telefone = entries[i].getElementsByTagName('telefone')[0].textContent;
                const ramal = entries[i].getElementsByTagName('ramal')[0].textContent;

                phonebook.push({ gerencia, area, nome, telefone, ramal });
            }

            phonebook.sort((a, b) => {
                if (a.gerencia < b.gerencia) return -1;
                if (a.gerencia > b.gerencia) return 1;
                if (a.area < b.area) return -1;
                if (a.area > b.area) return 1;
                if (a.nome < b.nome) return -1;
                if (a.nome > b.nome) return 1;
                return 0;
            });

            renderTable(phonebook);

            searchInput.addEventListener('input', function () {
                const searchTerm = normalizeText(searchInput.value);
                const filteredData = phonebook.filter(entry => {
                    return normalizeText(entry.gerencia).includes(searchTerm) ||
                           normalizeText(entry.area).includes(searchTerm) ||
                           normalizeText(entry.nome).includes(searchTerm);
                });
                renderTable(filteredData);
            });
        })
        .catch(error => console.error('Erro ao carregar o arquivo XML:', error));
});
