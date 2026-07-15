// ============ CONFIGURAÇÃO DO BANCO (IndexedDB com Dexie) ============
const db = new Dexie('BibliotecaDB');
db.version(1).stores({
    clientes: '++id, cpf',
    alugueis: '++id, cliente_id, status, livro'
});

// ============ LISTA DE LIVROS POPULARES ============
const livrosPopulares = [
    "1984 - George Orwell", "A Bagaceira - José Américo de Almeida", "A Culpa é das Estrelas - John Green",
    "A Dança da Morte - Stephen King", "A Divina Comédia - Dante Alighieri", "A Garota no Trem - Paula Hawkins",
    "A Hora da Estrela - Clarice Lispector", "A Menina que Roubava Livros - Markus Zusak", "A Metamorfose - Franz Kafka",
    "A Moreninha - Joaquim Manuel de Macedo", "A Náusea - Jean-Paul Sartre", "A Peste - Albert Camus",
    "A Revolução dos Bichos - George Orwell", "A Seleção - Kiera Cass", "A Sombra do Vento - Carlos Ruiz Zafón",
    "Admirável Mundo Novo - Aldous Huxley", "Água Viva - Clarice Lispector", "Angústia - Graciliano Ramos",
    "Anjos e Demônios - Dan Brown", "Anna Kariênina - Liev Tolstói", "Anne de Green Gables - Lucy Maud Montgomery",
    "As Aventuras de Tom Sawyer - Mark Twain", "As Crônicas de Nárnia - C.S. Lewis", "As Vinhas da Ira - John Steinbeck",
    "Brasil: Uma Biografia - Lilia M. Schwarcz & Heloisa M. Starling", "Capitães da Areia - Jorge Amado", "Carrie, a Estranha - Stephen King",
    "Casa-Grande & Senzala - Gilberto Freyre", "Cem Anos de Solidão - Gabriel García Márquez", "Cidades de Papel - John Green",
    "Clube da Luta - Chuck Palahniuk", "Crime e Castigo - Fiódor Dostoiévski", "Divergente - Veronica Roth",
    "Dom Casmurro - Machado de Assis", "Dom Quixote - Miguel de Cervantes", "Doutor Jivago - Boris Pasternak",
    "Doutor Sono - Stephen King", "Ensaio sobre a Cegueira - José Saramago", "Extraordinário - R.J. Palacio",
    "Fahrenheit 451 - Ray Bradbury", "Fortaleza Digital - Dan Brown", "Gabriela, Cravo e Canela - Jorge Amado",
    "Grande Sertão: Veredas - João Guimarães Rosa", "Guerra e Paz - Liev Tolstói", "Hamlet - William Shakespeare",
    "Harry Potter e a Pedra Filosofal - J.K. Rowling", "Inferno - Dan Brown", "Iracema - José de Alencar",
    "It: A Coisa - Stephen King", "Jane Eyre - Charlotte Brontë", "Jogos Vorazes - Suzanne Collins",
    "Lira dos Vinte Anos - Álvares de Azevedo", "Lolita - Vladimir Nabokov", "Lucíola - José de Alencar",
    "Macunaíma - Mário de Andrade", "Marina - Carlos Ruiz Zafón", "Memorial de Aires - Machado de Assis",
    "Memórias Póstumas de Brás Cubas - Machado de Assis", "Moby Dick - Herman Melville", "Morte e Vida Severina - João Cabral de Melo Neto",
    "Noite na Taverna - Álvares de Azevedo", "O Alienista - Machado de Assis", "O Apanhador no Campo de Centeio - J.D. Salinger",
    "O Auto da Compadecida - Ariano Suassuna", "O Código Da Vinci - Dan Brown", "O Conde de Monte Cristo - Alexandre Dumas",
    "O Cortiço - Aluísio Azevedo", "O Diário de Anne Frank - Anne Frank", "O Estrangeiro - Albert Camus",
    "O Grande Gatsby - F. Scott Fitzgerald", "O Guarani - José de Alencar", "O Hobbit - J.R.R. Tolkien",
    "O Homem que Calculava - Malba Tahan", "O Iluminado - Stephen King", "O Jogo do Anjo - Carlos Ruiz Zafón",
    "O Lobo da Estepe - Hermann Hesse", "O Morro dos Ventos Uivantes - Emily Brontë", "O Nome da Rosa - Umberto Eco",
    "O Pagador de Promessas - Dias Gomes", "O Pequeno Príncipe - Antoine de Saint-Exupéry", "O Perfume - Patrick Süskind",
    "O Povo Brasileiro - Darcy Ribeiro", "O Processo - Franz Kafka", "O Quinze - Rachel de Queiroz",
    "O Senhor dos Anéis - J.R.R. Tolkien", "O Silêncio dos Inocentes - Thomas Harris", "O Sol é para Todos - Harper Lee",
    "O Símbolo Perdido - Dan Brown", "O Tempo e o Vento - Érico Veríssimo", "Orgulho e Preconceito - Jane Austen",
    "Os Miseráveis - Victor Hugo", "Os Sertões - Euclides da Cunha", "Poemas - Carlos Drummond de Andrade",
    "Pollyanna - Eleanor H. Porter", "Psicose - Robert Bloch", "Quincas Borba - Machado de Assis",
    "Raízes do Brasil - Sérgio Buarque de Holanda", "Ratos e Homens - John Steinbeck", "Romeu e Julieta - William Shakespeare",
    "São Bernardo - Graciliano Ramos", "Senhora - José de Alencar", "Sidarta - Hermann Hesse",
    "Ulisses - James Joyce", "Vidas Secas - Graciliano Ramos"
];

// ============ INFORMAÇÕES DOS LIVROS (AUTOR, ANO, EDITORA) ============
const livrosInfo = {
    "1984 - George Orwell": { autor: "George Orwell", ano: 1949, editora: "Companhia das Letras" },
    "A Bagaceira - José Américo de Almeida": { autor: "José Américo de Almeida", ano: 1928, editora: "José Olympio" },
    "A Culpa é das Estrelas - John Green": { autor: "John Green", ano: 2012, editora: "Intrínseca" },
    "A Dança da Morte - Stephen King": { autor: "Stephen King", ano: 1978, editora: "Suma" },
    "A Divina Comédia - Dante Alighieri": { autor: "Dante Alighieri", ano: 1321, editora: "Editora 34" },
    "A Garota no Trem - Paula Hawkins": { autor: "Paula Hawkins", ano: 2015, editora: "Record" },
    "A Hora da Estrela - Clarice Lispector": { autor: "Clarice Lispector", ano: 1977, editora: "Rocco" },
    "A Menina que Roubava Livros - Markus Zusak": { autor: "Markus Zusak", ano: 2005, editora: "Intrínseca" },
    "A Metamorfose - Franz Kafka": { autor: "Franz Kafka", ano: 1915, editora: "Companhia das Letras" },
    "A Moreninha - Joaquim Manuel de Macedo": { autor: "Joaquim Manuel de Macedo", ano: 1844, editora: "Ática" },
    "A Náusea - Jean-Paul Sartre": { autor: "Jean-Paul Sartre", ano: 1938, editora: "Nova Fronteira" },
    "A Peste - Albert Camus": { autor: "Albert Camus", ano: 1947, editora: "Record" },
    "A Revolução dos Bichos - George Orwell": { autor: "George Orwell", ano: 1945, editora: "Companhia das Letras" },
    "A Seleção - Kiera Cass": { autor: "Kiera Cass", ano: 2012, editora: "Seguinte" },
    "A Sombra do Vento - Carlos Ruiz Zafón": { autor: "Carlos Ruiz Zafón", ano: 2001, editora: "Suma" },
    "Admirável Mundo Novo - Aldous Huxley": { autor: "Aldous Huxley", ano: 1932, editora: "Globo" },
    "Água Viva - Clarice Lispector": { autor: "Clarice Lispector", ano: 1973, editora: "Rocco" },
    "Angústia - Graciliano Ramos": { autor: "Graciliano Ramos", ano: 1936, editora: "Record" },
    "Anjos e Demônios - Dan Brown": { autor: "Dan Brown", ano: 2000, editora: "Arqueiro" },
    "Anna Kariênina - Liev Tolstói": { autor: "Liev Tolstói", ano: 1877, editora: "Penguin" },
    "Anne de Green Gables - Lucy Maud Montgomery": { autor: "Lucy Maud Montgomery", ano: 1908, editora: "Martin Claret" },
    "As Aventuras de Tom Sawyer - Mark Twain": { autor: "Mark Twain", ano: 1876, editora: "Penguin" },
    "As Crônicas de Nárnia - C.S. Lewis": { autor: "C.S. Lewis", ano: 1950, editora: "Martins Fontes" },
    "As Vinhas da Ira - John Steinbeck": { autor: "John Steinbeck", ano: 1939, editora: "Record" },
    "Brasil: Uma Biografia - Lilia M. Schwarcz & Heloisa M. Starling": { autor: "Lilia M. Schwarcz & Heloisa M. Starling", ano: 2015, editora: "Companhia das Letras" },
    "Capitães da Areia - Jorge Amado": { autor: "Jorge Amado", ano: 1937, editora: "Companhia das Letras" },
    "Carrie, a Estranha - Stephen King": { autor: "Stephen King", ano: 1974, editora: "Suma" },
    "Casa-Grande & Senzala - Gilberto Freyre": { autor: "Gilberto Freyre", ano: 1933, editora: "Global" },
    "Cem Anos de Solidão - Gabriel García Márquez": { autor: "Gabriel García Márquez", ano: 1967, editora: "Record" },
    "Cidades de Papel - John Green": { autor: "John Green", ano: 2008, editora: "Intrínseca" },
    "Clube da Luta - Chuck Palahniuk": { autor: "Chuck Palahniuk", ano: 1996, editora: "Leya" },
    "Crime e Castigo - Fiódor Dostoiévski": { autor: "Fiódor Dostoiévski", ano: 1866, editora: "Editora 34" },
    "Divergente - Veronica Roth": { autor: "Veronica Roth", ano: 2011, editora: "Rocco" },
    "Dom Casmurro - Machado de Assis": { autor: "Machado de Assis", ano: 1899, editora: "Principis" },
    "Dom Quixote - Miguel de Cervantes": { autor: "Miguel de Cervantes", ano: 1605, editora: "Penguin" },
    "Doutor Jivago - Boris Pasternak": { autor: "Boris Pasternak", ano: 1957, editora: "José Olympio" },
    "Doutor Sono - Stephen King": { autor: "Stephen King", ano: 2013, editora: "Suma" },
    "Ensaio sobre a Cegueira - José Saramago": { autor: "José Saramago", ano: 1995, editora: "Companhia das Letras" },
    "Extraordinário - R.J. Palacio": { autor: "R.J. Palacio", ano: 2012, editora: "Intrínseca" },
    "Fahrenheit 451 - Ray Bradbury": { autor: "Ray Bradbury", ano: 1953, editora: "Biblioteca Azul" },
    "Fortaleza Digital - Dan Brown": { autor: "Dan Brown", ano: 1998, editora: "Arqueiro" },
    "Gabriela, Cravo e Canela - Jorge Amado": { autor: "Jorge Amado", ano: 1958, editora: "Companhia das Letras" },
    "Grande Sertão: Veredas - João Guimarães Rosa": { autor: "João Guimarães Rosa", ano: 1956, editora: "Global" },
    "Guerra e Paz - Liev Tolstói": { autor: "Liev Tolstói", ano: 1869, editora: "Penguin" },
    "Hamlet - William Shakespeare": { autor: "William Shakespeare", ano: 1603, editora: "Penguin" },
    "Harry Potter e a Pedra Filosofal - J.K. Rowling": { autor: "J.K. Rowling", ano: 1997, editora: "Rocco" },
    "Inferno - Dan Brown": { autor: "Dan Brown", ano: 2013, editora: "Arqueiro" },
    "Iracema - José de Alencar": { autor: "José de Alencar", ano: 1865, editora: "Ática" },
    "It: A Coisa - Stephen King": { autor: "Stephen King", ano: 1986, editora: "Suma" },
    "Jane Eyre - Charlotte Brontë": { autor: "Charlotte Brontë", ano: 1847, editora: "Penguin" },
    "Jogos Vorazes - Suzanne Collins": { autor: "Suzanne Collins", ano: 2008, editora: "Rocco" },
    "Lira dos Vinte Anos - Álvares de Azevedo": { autor: "Álvares de Azevedo", ano: 1853, editora: "Martins Fontes" },
    "Lolita - Vladimir Nabokov": { autor: "Vladimir Nabokov", ano: 1955, editora: "Companhia das Letras" },
    "Lucíola - José de Alencar": { autor: "José de Alencar", ano: 1862, editora: "Ática" },
    "Macunaíma - Mário de Andrade": { autor: "Mário de Andrade", ano: 1928, editora: "Global" },
    "Marina - Carlos Ruiz Zafón": { autor: "Carlos Ruiz Zafón", ano: 1999, editora: "Suma" },
    "Memorial de Aires - Machado de Assis": { autor: "Machado de Assis", ano: 1908, editora: "Principis" },
    "Memórias Póstumas de Brás Cubas - Machado de Assis": { autor: "Machado de Assis", ano: 1881, editora: "Principis" },
    "Moby Dick - Herman Melville": { autor: "Herman Melville", ano: 1851, editora: "Penguin" },
    "Morte e Vida Severina - João Cabral de Melo Neto": { autor: "João Cabral de Melo Neto", ano: 1956, editora: "Nova Fronteira" },
    "Noite na Taverna - Álvares de Azevedo": { autor: "Álvares de Azevedo", ano: 1855, editora: "Martins Fontes" },
    "O Alienista - Machado de Assis": { autor: "Machado de Assis", ano: 1882, editora: "Principis" },
    "O Apanhador no Campo de Centeio - J.D. Salinger": { autor: "J.D. Salinger", ano: 1951, editora: "Editora do Autor" },
    "O Auto da Compadecida - Ariano Suassuna": { autor: "Ariano Suassuna", ano: 1955, editora: "Nova Fronteira" },
    "O Código Da Vinci - Dan Brown": { autor: "Dan Brown", ano: 2003, editora: "Arqueiro" },
    "O Conde de Monte Cristo - Alexandre Dumas": { autor: "Alexandre Dumas", ano: 1844, editora: "Penguin" },
    "O Cortiço - Aluísio Azevedo": { autor: "Aluísio Azevedo", ano: 1890, editora: "Ática" },
    "O Diário de Anne Frank - Anne Frank": { autor: "Anne Frank", ano: 1947, editora: "Record" },
    "O Estrangeiro - Albert Camus": { autor: "Albert Camus", ano: 1942, editora: "Record" },
    "O Grande Gatsby - F. Scott Fitzgerald": { autor: "F. Scott Fitzgerald", ano: 1925, editora: "Penguin" },
    "O Guarani - José de Alencar": { autor: "José de Alencar", ano: 1857, editora: "Ática" },
    "O Hobbit - J.R.R. Tolkien": { autor: "J.R.R. Tolkien", ano: 1937, editora: "Martins Fontes" },
    "O Homem que Calculava - Malba Tahan": { autor: "Malba Tahan", ano: 1938, editora: "Record" },
    "O Iluminado - Stephen King": { autor: "Stephen King", ano: 1977, editora: "Suma" },
    "O Jogo do Anjo - Carlos Ruiz Zafón": { autor: "Carlos Ruiz Zafón", ano: 2008, editora: "Suma" },
    "O Lobo da Estepe - Hermann Hesse": { autor: "Hermann Hesse", ano: 1927, editora: "Record" },
    "O Morro dos Ventos Uivantes - Emily Brontë": { autor: "Emily Brontë", ano: 1847, editora: "Penguin" },
    "O Nome da Rosa - Umberto Eco": { autor: "Umberto Eco", ano: 1980, editora: "Record" },
    "O Pagador de Promessas - Dias Gomes": { autor: "Dias Gomes", ano: 1960, editora: "Record" },
    "O Pequeno Príncipe - Antoine de Saint-Exupéry": { autor: "Antoine de Saint-Exupéry", ano: 1943, editora: "Agir" },
    "O Perfume - Patrick Süskind": { autor: "Patrick Süskind", ano: 1985, editora: "Rocco" },
    "O Povo Brasileiro - Darcy Ribeiro": { autor: "Darcy Ribeiro", ano: 1995, editora: "Companhia das Letras" },
    "O Processo - Franz Kafka": { autor: "Franz Kafka", ano: 1925, editora: "Companhia das Letras" },
    "O Quinze - Rachel de Queiroz": { autor: "Rachel de Queiroz", ano: 1930, editora: "José Olympio" },
    "O Senhor dos Anéis - J.R.R. Tolkien": { autor: "J.R.R. Tolkien", ano: 1954, editora: "Martins Fontes" },
    "O Silêncio dos Inocentes - Thomas Harris": { autor: "Thomas Harris", ano: 1988, editora: "Record" },
    "O Sol é para Todos - Harper Lee": { autor: "Harper Lee", ano: 1960, editora: "José Olympio" },
    "O Símbolo Perdido - Dan Brown": { autor: "Dan Brown", ano: 2009, editora: "Arqueiro" },
    "O Tempo e o Vento - Érico Veríssimo": { autor: "Érico Veríssimo", ano: 1949, editora: "Companhia das Letras" },
    "Orgulho e Preconceito - Jane Austen": { autor: "Jane Austen", ano: 1813, editora: "Penguin" },
    "Os Miseráveis - Victor Hugo": { autor: "Victor Hugo", ano: 1862, editora: "Penguin" },
    "Os Sertões - Euclides da Cunha": { autor: "Euclides da Cunha", ano: 1902, editora: "Ubu" },
    "Poemas - Carlos Drummond de Andrade": { autor: "Carlos Drummond de Andrade", ano: 1942, editora: "Record" },
    "Pollyanna - Eleanor H. Porter": { autor: "Eleanor H. Porter", ano: 1913, editora: "Martin Claret" },
    "Psicose - Robert Bloch": { autor: "Robert Bloch", ano: 1959, editora: "Darkside" },
    "Quincas Borba - Machado de Assis": { autor: "Machado de Assis", ano: 1891, editora: "Principis" },
    "Raízes do Brasil - Sérgio Buarque de Holanda": { autor: "Sérgio Buarque de Holanda", ano: 1936, editora: "Companhia das Letras" },
    "Ratos e Homens - John Steinbeck": { autor: "John Steinbeck", ano: 1937, editora: "Record" },
    "Romeu e Julieta - William Shakespeare": { autor: "William Shakespeare", ano: 1597, editora: "Penguin" },
    "São Bernardo - Graciliano Ramos": { autor: "Graciliano Ramos", ano: 1934, editora: "Record" },
    "Senhora - José de Alencar": { autor: "José de Alencar", ano: 1875, editora: "Ática" },
    "Sidarta - Hermann Hesse": { autor: "Hermann Hesse", ano: 1922, editora: "Record" },
    "Ulisses - James Joyce": { autor: "James Joyce", ano: 1922, editora: "Penguin" },
    "Vidas Secas - Graciliano Ramos": { autor: "Graciliano Ramos", ano: 1938, editora: "Record" }
};

// ============ NOTIFICAÇÕES ============
function notificar(mensagem, tipo = 'sucesso') {
    const notif = document.getElementById('notificacao');
    notif.textContent = mensagem;
    notif.className = 'notificacao ' + (tipo === 'erro' ? 'erro' : '');
    notif.style.display = 'block';
    setTimeout(() => { notif.style.display = 'none'; }, 4000);
}

// ============ MÁSCARA DE CPF ============
function mascararCPF(input) {
    let cpf = input.value.replace(/\D/g, '');
    if (cpf.length > 11) cpf = cpf.substring(0, 11);
    let formatado = cpf;
    if (cpf.length > 3) formatado = cpf.substring(0, 3) + '.' + cpf.substring(3);
    if (cpf.length > 6) formatado = formatado.substring(0, 7) + '.' + cpf.substring(6);
    if (cpf.length > 9) formatado = formatado.substring(0, 11) + '-' + cpf.substring(9);
    input.value = formatado;
}

// ============ NAVEGAÇÃO ============
function mostrar(id) {
    document.querySelectorAll('.tela').forEach(tela => tela.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');
    document.getElementById('notificacao').style.display = 'none';

    if (id === 'inicio') limparFormularios();
    if (id === 'pedido') carregarSelectClientes();
    if (id === 'devolucao') {
        document.getElementById('nome-cliente-devolucao').value = '';
        document.getElementById('info-devolucao').style.display = 'none';
        document.getElementById('lista-clientes-devolucao').style.display = 'none';
        document.getElementById('opcoes-clientes').innerHTML = '';
    }
    if (id === 'historico') carregarHistorico();
}

function limparFormularios() {
    document.querySelectorAll('input:not([readonly]), select').forEach(el => {
        if (el.type !== 'submit' && el.type !== 'button') el.value = '';
    });
    document.getElementById('data-devolucao').value = '';
    document.getElementById('info-devolucao').style.display = 'none';
    document.getElementById('lista-livros').innerHTML = '';
    document.getElementById('lista-livros').style.display = 'none';
    document.getElementById('filtro-livro').value = '';
    document.getElementById('sem-clientes').style.display = 'none';
}

// ============ PESQUISA DE LIVROS ============
function filtrarLivros() {
    const filtro = document.getElementById('filtro-livro').value.trim().toLowerCase();
    const listaDiv = document.getElementById('lista-livros');
    listaDiv.innerHTML = '';
    if (filtro === '') {
        listaDiv.style.display = 'none';
        return;
    }
    function removerArtigos(titulo) {
        return titulo.replace(/^(O |A |Os |As |Um |Uma |The )/i, '').trim();
    }
    let resultados = livrosPopulares.filter(livro => {
        return removerArtigos(livro).toLowerCase().includes(filtro);
    });
    resultados.sort((a, b) => {
        const tituloA = removerArtigos(a).toLowerCase();
        const tituloB = removerArtigos(b).toLowerCase();
        const aComeca = tituloA.startsWith(filtro);
        const bComeca = tituloB.startsWith(filtro);
        if (aComeca && !bComeca) return -1;
        if (!aComeca && bComeca) return 1;
        return tituloA.localeCompare(tituloB);
    });
    if (resultados.length === 0) {
        listaDiv.innerHTML = '<div class="sem-resultados">Nenhum livro encontrado</div>';
        listaDiv.style.display = 'block';
        return;
    }
    resultados.forEach(livro => {
        const item = document.createElement('div');
        item.className = 'item-livro';
        const regex = new RegExp(`(${filtro})`, 'gi');
        item.innerHTML = livro.replace(regex, '<strong>$1</strong>');
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('livro').value = livro.split(' - ')[0];
            document.getElementById('filtro-livro').value = '';
            listaDiv.innerHTML = '';
            listaDiv.style.display = 'none';
            atualizarCapa(livro);
            atualizarInfoLivro(livro);
        });
        listaDiv.appendChild(item);
    });
    listaDiv.style.display = 'block';
}

document.addEventListener('click', function(event) {
    const listaDiv = document.getElementById('lista-livros');
    if (!event.target.closest('.busca-livros')) {
        listaDiv.style.display = 'none';
    }
});

// ============ FUNÇÕES DO BANCO ============
async function carregarSelectClientes(selectedId = null) {
    const select = document.getElementById('cliente-select');
    const clientes = await db.clientes.toArray();
    select.innerHTML = '<option value="">Selecione o cliente...</option>';
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = `${cliente.nome} (CPF: ${cliente.cpf})`;
        if (cliente.id == selectedId) option.selected = true;
        select.appendChild(option);
    });
    const semClientes = clientes.length === 0;
    document.getElementById('sem-clientes').style.display = semClientes ? 'block' : 'none';
    document.getElementById('btn-confirmar-aluguel').disabled = semClientes;
}

async function cadastrar() {
    const nome = document.getElementById('nome').value.trim();
    const cpfBruto = document.getElementById('cpf').value.replace(/\D/g, '');
    const nascimento = document.getElementById('nascimento').value;
    if (!nome || !cpfBruto || !nascimento) {
        notificar('Preencha todos os campos.', 'erro');
        return;
    }
    if (cpfBruto.length !== 11) {
        notificar('CPF inválido. Digite os 11 números.', 'erro');
        return;
    }
    const cpfFormatado = cpfBruto.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    const existente = await db.clientes.where({ cpf: cpfFormatado }).first();
    if (existente) {
        notificar('CPF já cadastrado.', 'erro');
        return;
    }
    const id = await db.clientes.put({ nome, cpf: cpfFormatado, nascimento });
    notificar(`Cliente ${nome} cadastrado com sucesso!`);
    document.getElementById('form-cadastro').reset();
    prepararPedido(id);
}

async function prepararPedido(clienteId = null) {
    const clientes = await db.clientes.toArray();
    if (clientes.length === 0 && !clienteId) {
        notificar('Nenhum cliente cadastrado. Cadastre um novo cliente primeiro.', 'erro');
        mostrar('aluguel-opcao');
        return;
    }
    await carregarSelectClientes(clienteId);
    mostrar('pedido');
}

function calcularDevolucao() {
    const dataLocacao = document.getElementById('data-locacao').value;
    const campoDevolucao = document.getElementById('data-devolucao');
    if (dataLocacao) {
        const data = new Date(dataLocacao + 'T00:00:00');
        data.setDate(data.getDate() + 7);
        campoDevolucao.value = data.toLocaleDateString('pt-BR');
    } else {
        campoDevolucao.value = '';
    }
}

async function confirmarAluguel() {
    const clienteId = parseInt(document.getElementById('cliente-select').value);
    const livroTitulo = document.getElementById('livro').value.trim();
    const dataLocacao = document.getElementById('data-locacao').value;
    const dataDevolucao = document.getElementById('data-devolucao').value;
    if (!clienteId || !livroTitulo || !dataLocacao) {
        notificar('Preencha todos os campos do pedido.', 'erro');
        return;
    }
    const cliente = await db.clientes.get(clienteId);
    if (!cliente) {
        notificar('Cliente não encontrado.', 'erro');
        return;
    }
    const aluguelAtivoCliente = await db.alugueis.where({ cliente_id: clienteId, status: 'ativo' }).first();
    if (aluguelAtivoCliente) {
        notificar(`O cliente ${cliente.nome} já possui um livro alugado. Devolva primeiro.`, 'erro');
        return;
    }
    const livroJaAlugado = await db.alugueis.where({ livro: livroTitulo, status: 'ativo' }).first();
    if (livroJaAlugado) {
        notificar(`O livro "${livroTitulo}" já está alugado no momento.`, 'erro');
        return;
    }
    await db.alugueis.put({
        cliente_id: clienteId,
        livro: livroTitulo,
        data_locacao: dataLocacao,
        data_devolucao_prevista: dataDevolucao,
        status: 'ativo'
    });
    notificar(`Aluguel registrado! "${livroTitulo}" para ${cliente.nome}. Devolução prevista: ${dataDevolucao}`);
    document.getElementById('form-pedido').reset();
    document.getElementById('data-devolucao').value = '';
    mostrar('inicio');
}

async function buscarCliente() {
    const nomeBusca = document.getElementById('nome-cliente-devolucao').value.trim().toLowerCase();
    if (nomeBusca === '') {
        notificar('Digite um nome para buscar.', 'erro');
        return;
    }
    const todosClientes = await db.clientes.toArray();
    const clientes = todosClientes.filter(c => c.nome.toLowerCase().includes(nomeBusca));
    if (clientes.length === 0) {
        notificar('Cliente não encontrado.', 'erro');
        document.getElementById('info-devolucao').style.display = 'none';
        document.getElementById('lista-clientes-devolucao').style.display = 'none';
        return;
    }
    if (clientes.length === 1) {
        await exibirInfoDevolucao(clientes[0]);
        document.getElementById('lista-clientes-devolucao').style.display = 'none';
    } else {
        document.getElementById('info-devolucao').style.display = 'none';
        const opcoesDiv = document.getElementById('opcoes-clientes');
        opcoesDiv.innerHTML = '';
        clientes.forEach(cliente => {
            const btn = document.createElement('button');
            btn.textContent = `${cliente.nome} (CPF: ${cliente.cpf})`;
            btn.style.marginBottom = '8px';
            btn.addEventListener('click', async () => {
                await exibirInfoDevolucao(cliente);
                document.getElementById('lista-clientes-devolucao').style.display = 'none';
            });
            opcoesDiv.appendChild(btn);
        });
        document.getElementById('lista-clientes-devolucao').style.display = 'block';
    }
}

async function exibirInfoDevolucao(cliente) {
    const aluguel = await db.alugueis.where({ cliente_id: cliente.id, status: 'ativo' }).first();
    const infoDiv = document.getElementById('info-devolucao');
    const livroSpan = document.getElementById('livro-alugado');
    if (aluguel) {
        livroSpan.textContent = `"${aluguel.livro}" (Cliente: ${cliente.nome})`;
        infoDiv.setAttribute('data-aluguel-id', aluguel.id);
    } else {
        livroSpan.textContent = `Nenhum livro alugado ativo para ${cliente.nome}.`;
        infoDiv.removeAttribute('data-aluguel-id');
    }
    infoDiv.style.display = 'block';
}

async function devolver() {
    const infoDiv = document.getElementById('info-devolucao');
    const aluguelId = parseInt(infoDiv.getAttribute('data-aluguel-id'));
    if (!aluguelId) {
        notificar('Nenhum empréstimo ativo para devolução.', 'erro');
        return;
    }
    const aluguel = await db.alugueis.get(aluguelId);
    if (!aluguel || aluguel.status !== 'ativo') {
        notificar('Empréstimo não encontrado ou já devolvido.', 'erro');
        return;
    }
    await db.alugueis.update(aluguelId, {
        status: 'devolvido',
        data_devolucao_real: new Date().toISOString().split('T')[0]
    });
    notificar(`Livro "${aluguel.livro}" devolvido com sucesso!`);
    document.getElementById('nome-cliente-devolucao').value = '';
    infoDiv.style.display = 'none';
    infoDiv.removeAttribute('data-aluguel-id');
    document.getElementById('lista-clientes-devolucao').style.display = 'none';
}

// ============ TELA DE HISTÓRICO ============
async function carregarHistorico() {
    const container = document.getElementById('tabela-historico');
    try {
        const [alugueis, clientes] = await Promise.all([
            db.alugueis.toArray(),
            db.clientes.toArray()
        ]);

        if (alugueis.length === 0) {
            container.innerHTML = '<p class="sem-dados">Nenhum aluguel registrado.</p>';
            return;
        }

        const mapaClientes = {};
        clientes.forEach(c => { mapaClientes[c.id] = c; });

        alugueis.sort((a, b) => new Date(b.data_locacao) - new Date(a.data_locacao));

        let tabela = `<table class="tabela-historico">
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Livro</th>
                    <th>Data Locação</th>
                    <th>Prev. Devolução</th>
                    <th>Status</th>
                    <th>Devolução Real</th>
                </tr>
            </thead>
            <tbody>`;

        alugueis.forEach(aluguel => {
            const cliente = mapaClientes[aluguel.cliente_id] || { nome: 'Cliente removido' };
            const dataLocacao = aluguel.data_locacao.split('-').reverse().join('/');
            const statusClass = aluguel.status === 'ativo' ? 'status-ativo' : 'status-devolvido';
            const statusTexto = aluguel.status === 'ativo' ? 'Ativo' : 'Devolvido';
            const devolucaoReal = aluguel.data_devolucao_real 
                ? aluguel.data_devolucao_real.split('-').reverse().join('/') 
                : '-';

            tabela += `<tr>
                <td>${cliente.nome}</td>
                <td>${aluguel.livro}</td>
                <td>${dataLocacao}</td>
                <td>${aluguel.data_devolucao_prevista}</td>
                <td class="${statusClass}">${statusTexto}</td>
                <td>${devolucaoReal}</td>
            </tr>`;
        });

        tabela += '</tbody></table>';
        container.innerHTML = tabela;

    } catch (erro) {
        console.error('Erro ao carregar histórico:', erro);
        container.innerHTML = '<p class="sem-dados">Erro ao carregar dados.</p>';
    }
}

// ============ EXIBIÇÃO DA CAPA (COM CAMINHO CORRIGIDO) ============
let timeoutCapa = null;

function atualizarCapa(titulo) {
    const img = document.getElementById('capa-livro');
    const placeholder = document.getElementById('placeholder-capa');
    
    if (!titulo) {
        img.style.display = 'none';
        placeholder.style.display = 'block';
        placeholder.textContent = '📚 Capa';
        return;
    }

    const caminho = `../src/${titulo}.jpg`;
    img.onload = () => {
        img.style.display = 'block';
        placeholder.style.display = 'none';
    };
    img.onerror = () => {
        img.style.display = 'none';
        placeholder.textContent = '📷 Capa não encontrada';
        placeholder.style.display = 'block';
    };
    img.src = caminho;
}

// ============ ATUALIZAR INFORMAÇÕES DO LIVRO ============
function atualizarInfoLivro(tituloCompleto) {
    const infoDiv = document.getElementById('info-livro');
    const autorSpan = document.getElementById('info-autor');
    const anoSpan = document.getElementById('info-ano');
    const editoraSpan = document.getElementById('info-editora');
    const placeholder = document.getElementById('info-placeholder');

    if (!tituloCompleto) {
        autorSpan.textContent = '—';
        anoSpan.textContent = '—';
        editoraSpan.textContent = '—';
        infoDiv.classList.remove('com-dados');
        placeholder.style.display = 'block';
        return;
    }

    const dados = livrosInfo[tituloCompleto];
    if (dados) {
        autorSpan.textContent = dados.autor;
        anoSpan.textContent = dados.ano;
        editoraSpan.textContent = dados.editora;
        infoDiv.classList.add('com-dados');
        placeholder.style.display = 'none';
    } else {
        autorSpan.textContent = 'Não disponível';
        anoSpan.textContent = 'Não disponível';
        editoraSpan.textContent = 'Não disponível';
        infoDiv.classList.add('com-dados');
        placeholder.style.display = 'none';
    }
}

// ============ EVENTO DE DIGITAÇÃO NO CAMPO "LIVRO" ============
document.getElementById('livro').addEventListener('input', function() {
    clearTimeout(timeoutCapa);
    const termo = this.value.trim();
    timeoutCapa = setTimeout(() => {
        const livroEncontrado = livrosPopulares.find(livro => 
            livro.toLowerCase().startsWith(termo.toLowerCase())
        );
        if (livroEncontrado) {
            atualizarCapa(livroEncontrado);
            atualizarInfoLivro(livroEncontrado);
        } else {
            atualizarCapa(null);
            atualizarInfoLivro(null);
        }
    }, 500);
});