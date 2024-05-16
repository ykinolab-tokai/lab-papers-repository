document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            const papers = data.values.slice(1).map(row => {
                return {
                    title: row[0],
                    authors: row[1],
                    abstract: row[2],
                    publicationDate: row[3],
                    pdfUrl: row[4],
                    otherMetadata: row[5] || ''
                };
            });

            const papersDiv = document.getElementById('papers');
            papers.forEach(paper => {
                const paperDiv = document.createElement('div');
                paperDiv.className = 'paper';
                paperDiv.innerHTML = `
                    <h2>${paper.title}</h2>
                    <p><strong>Authors:</strong> ${paper.authors}</p>
                    <p><strong>Abstract:</strong> ${paper.abstract}</p>
                    <p><strong>Publication Date:</strong> ${paper.publicationDate}</p>
                    <p><a href="${paper.pdfUrl}" target="_blank">Read PDF</a></p>
                    <p><strong>Other Metadata:</strong> ${paper.otherMetadata}</p>
                `;
                papersDiv.appendChild(paperDiv);
            });
        });
});
