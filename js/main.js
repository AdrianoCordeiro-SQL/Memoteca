import ui from "./ui.js"
import api from "./api.js"


document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos()

    const formularioPensamento = document.getElementById("pensamento-form")
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario)

    const botaoCancelar = document.getElementById("botao-cancelar")
    botaoCancelar.addEventListener("click", limparFormulario)
})

function limparFormulario() {
    document.getElementById("pensamento-id").value = ""
    document.getElementById("pensamento-conteudo").value = ""
    document.getElementById("pensamento-autoria").value = ""
}


async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    const id = document.getElementById("pensamento-id").value
    const conteudo = document.getElementById("pensamento-conteudo").value
    const autoria = document.getElementById("pensamento-autoria").value

    try {
        if (id) {
            await api.editarPensamento({id, conteudo, autoria})
        } else {
            await api.salvarPensamentos({conteudo, autoria})
        }
        limparFormulario()
        ui.renderizarPensamentos()
    } catch {
        alert("Erro ao salvar pensamento")
    }
}