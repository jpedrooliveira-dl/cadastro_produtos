const form = document.getElementById('produtoForm');
const lista = document.getElementById('listaProdutos');

async function carregarProdutos() {
    lista.innerHTML = '';
    const res = await fetch('/produtos');
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

    await fetch('/produtos', {
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
        texto.innerHTML = 'Loja aberta';
        badge.style.backgroundColor = '#059669'; // Verde pastel
        badge.style.color = '#ECFDF5'; // Verde escuro para o texto
        ponto.style.backgroundColor = '#10B981'; // Verde vibrante para o ponto
    } else {
        texto.innerHTML = 'Loja fechada';
        badge.style.backgroundColor = '#DC2626'; // Vermelho pastel
        badge.style.color = '#FEF2F2'; // Vermelho escuro para o texto
        ponto.style.backgroundColor = '#EF4444'; // Vermelho vibrante para o ponto
    }
}

statusLoja()