const form = document.getElementById('produtoForm');
const lista = document.getElementById('listaProdutos');

async function carregarProdutos() {
    lista.innerHTML = '';
    const res = await fetch('http://localhost:3000/produtos');
    const produtos = await res.json();

    produtos.forEach(prod => {
        const li = document.createElement('li');
        li.textContent = `${prod.nome} - R$ ${prod.preco} (${prod.descricao || 'Sem descrição'})`;
        lista.appendChild(li);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const descricao = document.getElementById('descricao').value;

    await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, preco, descricao })
    });

    form.reset();
    carregarProdutos();
});

carregarProdutos();


// Status da loja

function statusLoja() {
    const agora = new Date()
    const horasAgora = agora.getHours()

    const horasAbertura = 8
    const horasFechamento = 18

    const texto = document.querySelector('.status-text')
    const badge = document.querySelector('.status-badge')
    const ponto = document.querySelector('.pulse-dot')

    if( horasAgora >= horasAbertura && horasAgora < horasFechamento) {
        texto.innerHTML = 'Loja aberta'
        badge.style.color = '#e6f7ed'; 
        badge.style.color = '#1f7a42';            
        ponto.style.backgroundColor = '#2ec4b6';
    } else {
        texto.innerHTML = 'Loja fechada'
        badge.style.backgroundColor = "#fde8e8"; 
        badge.style.color = "#9b1c1c";
        ponto.style.backgroundColor = "#e02424";
    }
}

statusLoja()