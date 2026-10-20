/* === CÓDIGO JAVASCRIPT === */

const areas = {
    'A': 'Tecnologia e Inovação',
    'B': 'Saúde e bem-estar',
    'C': 'Engenharia e infraestrutura',
    'D': 'Negócios, marketing e finanças',
    'E': 'Comunicação, artes e design',
    'F': 'Ciências humanas e sociais',
    'G': 'Natureza, agro e ciências'
};

const form = document.getElementById('quizForm');
const resultDiv = document.getElementById('result');
const rankingList = document.getElementById('rankingList');

// --- LÓGICA DO QUIZ ---
form.addEventListener('submit', function(event) {
    event.preventDefault();

    let contagem = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 };

    let respostas = [
        form.q1.value,
        form.q2.value,
        form.q3.value,
        form.q4.value,
        form.q5.value,
        form.q6.value,
        form.q7.value
    ];

    respostas.forEach(letra => {
        if (contagem[letra] !== undefined) {
            contagem[letra]++;
        }
    });

    let totalPerguntas = respostas.length;
    let arrayResultados = Object.keys(contagem).map(letra => {
        let pontos = contagem[letra];
        let porcentagem = Math.round((pontos / totalPerguntas) * 100);
        return {
            letra: letra,
            nome: areas[letra],
            porcentagem: porcentagem
        };
    });

    arrayResultados.sort((a, b) => b.porcentagem - a.porcentagem);

    rankingList.innerHTML = '';

    arrayResultados.forEach(item => {
        let divItem = document.createElement('div');
        divItem.className = 'ranking-item';
        divItem.innerHTML = `
            <span class="ranking-name">${item.nome}</span>
            <span class="ranking-percentage">${item.porcentagem}% de afinidade</span>
        `;
        rankingList.appendChild(divItem);
    });

    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
});


// --- LÓGICA DO MODO EXPLICATIVO & ABAS ---

const btnExplicacao = document.getElementById('btnExplicacao');
const bannerExplicacao = document.getElementById('bannerExplicacao');
const modalExplicacao = document.getElementById('modalExplicacao');
const fecharModal = document.getElementById('fecharModal');
const modalTitulo = document.getElementById('modalTitulo');

// Campos do Modal HTML
const modalCodigoHtml = document.getElementById('modalCodigoHtml');
const modalDescricaoHtml = document.getElementById('modalDescricaoHtml');

// Campos do Modal CSS
const modalCodigoCss = document.getElementById('modalCodigoCss');
const modalDescricaoCss = document.getElementById('modalDescricaoCss');

// Campos do Modal JS
const modalCodigoJs = document.getElementById('modalCodigoJs');
const modalDescricaoJs = document.getElementById('modalDescricaoJs');

let modoExplicativoAtivo = false;

// Banco de dados contendo explicações de HTML, CSS e JS para cada pergunta
const explicacoesPerguntas = {
    'q1': {
        titulo: 'Explicação Detalhada: Pergunta 1',
        html: {
            codigo: `<div class="question-block">\n    <h3>1. Qual tipo de atividade...</h3>\n    <label><input type="radio" name="q1" value="C"> Alternativa...</label>\n</div>`,
            descricao: `
                <p><strong>&lt;div class="question-block"&gt;:</strong> Caixa de agrupamento que isola esta pergunta do restante da página.</p>
                <p><strong>&lt;label&gt;:</strong> Cria o retângulo clicável em volta do texto da alternativa.</p>
                <p><strong>&lt;input type="radio"&gt;:</strong> Botão de escolha única. O <code>name="q1"</code> agrupa as opções desta pergunta.</p>
            `
        },
        css: {
            codigo: `.question-block {\n    margin-bottom: 25px;\n    padding-bottom: 20px;\n    border-bottom: 1px solid var(--border-color);\n}\n\nlabel {\n    display: block;\n    background-color: var(--primary-light);\n    border-radius: 6px;\n    padding: 10px;\n}`,
            descricao: `
                <p><strong>.question-block:</strong> Adiciona um espaçamento inferior e uma linha separadora sutil entre as perguntas.</p>
                <p><strong>label:</strong> Deixa a resposta em formato de bloco verde claro com cantos arredondados, melhorando a experiência visual.</p>
            `
        },
        js: {
            codigo: `let respostas = [\n    form.q1.value,\n    // ...outras respostas\n];`,
            descricao: `
                <p><strong>form.q1.value:</strong> O JavaScript captura qual alternativa (` + '`A`, `B`, `C`...' + `) foi marcada nesta pergunta específica no momento do envio.</p>
            `
        }
    },
    'q2': {
        titulo: 'Explicação Detalhada: Pergunta 2',
        html: {
            codigo: `<div class="question-block">\n    <h3>2. Qual desses desafios...</h3>\n    <label><input type="radio" name="q2" value="D"> Alternativa...</label>\n</div>`,
            descricao: `
                <p><strong>Estrutura HTML:</strong> Mantém o mesmo padrão de blocos, mas com <code>name="q2"</code> para diferenciar a pergunta.</p>
            `
        },
        css: {
            codigo: `label:hover {\n    background-color: #c8e6c9;\n}`,
            descricao: `
                <p><strong>:hover:</strong> Efeito visual do CSS que escurece levemente o verde do fundo quando o mouse passa por cima da alternativa.</p>
            `
        },
        js: {
            codigo: `respostas.push(form.q2.value);`,
            descricao: `
                <p>O JavaScript lê o valor escolhido na pergunta 2 para computar o total de pontos da respectiva área profissional.</p>
            `
        }
    },
    'q3': {
        titulo: 'Explicação Detalhada: Pergunta 3',
        html: {
            codigo: `<div class="question-block">\n    <h3>3. Em um trabalho em grupo...</h3>\n    <label><input type="radio" name="q3" value="G"> Alternativa...</label>\n</div>`,
            descricao: `
                <p>Estrutura idêntica às anteriores, utilizando <code>name="q3"</code> para isolar as opções.</p>
            `
        },
        css: {
            codigo: `:root {\n    --primary-color: #4caf50;\n    --primary-light: #e8f5e9;\n}`,
            descricao: `
                <p><strong>Variáveis CSS (:root):</strong> Definem as cores globais de verde claro e branco em todo o projeto, facilitando alterações rápidas.</p>
            `
        },
        js: {
            codigo: `respostas.push(form.q3.value);`,
            descricao: `
                <p>Coleta o valor da terceira resposta para somar no objeto de contagem geral.</p>
            `
        }
    },
    'q4': {
        titulo: 'Explicação Detalhada: Pergunta 4',
        html: {
            codigo: `<div class="question-block">\n    <h3>4. Qual ambiente de trabalho...</h3>\n    <label><input type="radio" name="q4" value="B"> Alternativa...</label>\n</div>`,
            descricao: `
                <p>Define o quarto bloco de perguntas utilizando rótulos e botões radiais.</p>
            `
        },
        css: {
            codigo: `input[type="radio"] {\n    margin-right: 10px;\n}`,
            descricao: `
                <p>Adiciona um pequeno espaçamento à direita da bolinha de seleção (` + '`radio`' + `) para não colar no texto.</p>
            `
        },
        js: {
            codigo: `respostas.push(form.q4.value);`,
            descricao: `
                <p>Lê a opção escolhida na quarta questão.</p>
            `
        }
    },
    'q5': {
        titulo: 'Explicação Detalhada: Pergunta 5',
        html: {
            codigo: `<div class="question-block">\n    <h3>5. O que mais traz sentido...</h3>\n    <label><input type="radio" name="q5" value="C"> Alternativa...</label>\n</div>`,
            descricao: `
                <p>Quinto bloco de questões estruturado com tags HTML padrão.</p>
            `
        },
        css: {
            codigo: `body {\n    background-color: var(--bg-color);\n    font-family: 'Segoe UI', sans-serif;\n}`,
            descricao: `
                <p>Configura o fundo geral da página e a fonte tipográfica minimalista.</p>
            `
        },
        js: {
            codigo: `respostas.push(form.q5.value);`,
            descricao: `
                <p>Captura a escolha da quinta pergunta.</p>
            `
        }
    },
    'q6': {
        titulo: 'Explicação Detalhada: Pergunta 6',
        html: {
            codigo: `<div class="question-block">\n    <h3>6. Se pudesse escolher um projeto...</h3>\n    <label><input type="radio" name="q6" value="E"> Alternativa...</label>\n</div>`,
            descricao: `
                <p>Sexto bloco de perguntas do questionário.</p>
            `
        },
        css: {
            codigo: `.container {\n    background-color: white;\n    border-radius: 12px;\n    box-shadow: 0 4px 20px rgba(0,0,0,0.05);\n}`,
            descricao: `
                <p>Estiliza o cartão central branco onde o quiz fica acomodado, aplicando sombras suaves para uma estética limpa.</p>
            `
        },
        js: {
            codigo: `respostas.push(form.q6.value);`,
            descricao: `
                <p>Captura o dado da sexta questão.</p>
            `
        }
    },
    'q7': {
        titulo: 'Explicação Detalhada: Pergunta 7',
        html: {
            codigo: `<div class="question-block">\n    <h3>7. Qual destas habilidades...</h3>\n    <label><input type="radio" name="q7" value="F"> Alternativa...</label>\n</div>`,
            descricao: `
                <p>Sétima e última pergunta antes do botão de envio do formulário.</p>
            `
        },
        css: {
            codigo: `button[type="submit"] {\n    background-color: var(--primary-color);\n    color: white;\n    font-weight: bold;\n}`,
            descricao: `
                <p>Estiliza o botão principal de envio com a cor verde tema do site.</p>
            `
        },
        js: {
            codigo: `respostas.forEach(letra => {\n    contagem[letra]++;\n});`,
            descricao: `
                <p><strong>Loop forEach:</strong> O JavaScript percorre todas as respostas coletadas e incrementa os pontos no placar final.</p>
            `
        }
    }
};

// Alternar Modo Explicativo
btnExplicacao.addEventListener('click', function() {
    modoExplicativoAtivo = !modoExplicativoAtivo;
    document.body.classList.toggle('modo-explicacao', modoExplicativoAtivo);
    btnExplicacao.classList.toggle('ativo', modoExplicativoAtivo);
    
    if (modoExplicativoAtivo) {
        bannerExplicacao.style.display = 'block';
        btnExplicacao.innerText = '✖ Sair da Explicação';
    } else {
        bannerExplicacao.style.display = 'none';
        btnExplicacao.innerText = '💡 Explicação';
    }
});

// Abrir Modal ao clicar no bloco de pergunta
const blocosPerguntas = document.querySelectorAll('.question-block');
blocosPerguntas.forEach(bloco => {
    bloco.addEventListener('click', function() {
        if (!modoExplicativoAtivo) return;

        let id = bloco.getAttribute('data-id');
        let info = explicacoesPerguntas[id];

        if (info) {
            modalTitulo.innerText = info.titulo;
            
            // Preencher HTML
            modalCodigoHtml.innerText = info.html.codigo;
            modalDescricaoHtml.innerHTML = info.html.descricao;

            // Preencher CSS
            modalCodigoCss.innerText = info.css.codigo;
            modalDescricaoCss.innerHTML = info.css.descricao;

            // Preencher JS
            modalCodigoJs.innerText = info.js.codigo;
            modalDescricaoJs.innerHTML = info.js.descricao;

            // Resetar para a aba HTML por padrão
            mudarAba('html');

            modalExplicacao.style.display = 'flex';
        }
    });
});

// Lógica de navegação entre as Abas (HTML, CSS, JS) dentro do Modal
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        let abaAlvo = btn.getAttribute('data-tab');
        mudarAba(abaAlvo);
    });
});

function mudarAba(nomeAba) {
    // Remover classe active de todos os botões e conteúdos
    tabBtns.forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    // Ativar o botão e o conteúdo correspondente
    document.querySelector(`.tab-btn[data-tab="${nomeAba}"]`).classList.add('active');
    document.getElementById(`conteudo-${nomeAba}`).classList.add('active');
}

// Fechar Modal
fecharModal.addEventListener('click', function() {
    modalExplicacao.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modalExplicacao) {
        modalExplicacao.style.display = 'none';
    }
});