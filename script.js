// Seleção das tags input e button
var input = document.querySelector('input')
var button = document.querySelector('.btn_input')

button.onclick = buscarCEP

function buscarCEP() {
    // Capturar conteúdo do input
    let cep = input.value
   
    let listaTag = []
    verificarCEP(cep, listaTag)

}

function verificarCEP (cep, listaTag) {
    let url = `https://viacep.com.br/ws/${cep}/json/`

    fetch(url)
        .then(response => {
            return response.json()
        })
        .then (response => {
            let tags = ['tr', 'td', 'td', 'td','td','td','td','td']

            listaTag = criarTags(tags, listaTag)
            
            preencherTds(listaTag, response)

            inserirNaTela(listaTag)

        })
}

function criarTags(tags, listaTag) {
    // Para cada elemento da lista
    tags.forEach(textoTag => {
        // Criar tags
        let tag = document.createElement(textoTag)
        // Guardar na lista
        listaTag.push(tag)
    });

    return listaTag
}

function preencherTds(listaTag, response) {
    listaTag[1].textContent = response.cep
    listaTag[2].textContent = response.logradouro
    listaTag[3].textContent = response.complemento
    listaTag[4].textContent = response.bairro
    listaTag[5].textContent = response.localidade
    listaTag[6].textContent = response.uf
    listaTag[7].textContent = response.ddd
}

function inserirNaTela(listaTag) {
    // Selecionar o tbody
    let body = document.querySelector('.corpoTabela')

    body.appendChild(listaTag[0])

    for (let contador = 1; contador < listaTag.length; contador++) {
        listaTag[0].appendChild(listaTag[contador])
        
    }
}