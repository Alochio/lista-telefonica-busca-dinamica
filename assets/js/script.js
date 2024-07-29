document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const tableBody = document.querySelector('#phonebook tbody');

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
                const searchTerm = searchInput.value.toLowerCase();
                const filteredData = phonebook.filter(entry => 
                    entry.gerencia.toLowerCase() === searchTerm ||
                    entry.area.toLowerCase() === searchTerm ||
                    entry.nome.toLowerCase() === searchTerm
                ).concat(phonebook.filter(entry =>
                    entry.gerencia.toLowerCase().includes(searchTerm) ||
                    entry.area.toLowerCase().includes(searchTerm) ||
                    entry.nome.toLowerCase().includes(searchTerm)
                ).filter(entry => 
                    !(entry.gerencia.toLowerCase() === searchTerm ||
                    entry.area.toLowerCase() === searchTerm ||
                    entry.nome.toLowerCase() === searchTerm)
                ));
                renderTable(filteredData);
            });
        });

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
});
