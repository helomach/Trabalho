const frm = document.querySelector("form")      // obtém elementos da página
const dvQuadro = document.querySelector("#divQuadro")

frm.addEventListener("submit", (e) => {
  e.preventDefault()                            // evita envio do form

  const tarefa = frm.inTarefa.value             // obtém o conteúdo digitado

  const h5 = document.createElement("h5")       // cria o elemento HTML h5
  const texto = document.createTextNode(tarefa) // cria um texto
  h5.appendChild(texto)                         // define que texto será filho de h5
  dvQuadro.appendChild(h5)                      // e que h5 será filho de divQuadro

  frm.inTarefa.value = ""                       // limpa o campo de edição
  frm.inTarefa.focus()                          // joga o cursor neste campo
})

// Seleciona as tarefas
frm.btSelecionar.addEventListener("click", () => { 
  const tarefas = document.querySelectorAll("h5")  

  // Verifica se possuem tarefas a serem selecionadas
  if (tarefas.length == 0) {
    alert("Não há tarefas para selecionar")       
    return                                        
  }

  // Variável auxiliar
  let aux = -1                   

 // Verifica se a tarefa está selecionada, e caso estiver, deseleciona a tarefa
  for (let i = 0; i < tarefas.length; i++) {
    
    if (tarefas[i].className == "tarefa-selecionada") { // Seleciona a tarefa
      tarefas[i].className = "tarefa-normal"      
      aux = i                                     
      break                                       
    }
  }

  
  if (aux == tarefas.length - 1) {
    aux = -1
  }

  tarefas[aux + 1].className = "tarefa-selecionada" 
})

// Função para retirar a tarefa seleciona
frm.btRetirar.addEventListener("click", () => { 
  const tarefas = document.querySelectorAll("h5") 

  let aux = -1               

  
  tarefas.forEach((tarefa, i) => {
    if (tarefa.className == "tarefa-selecionada") {  
      aux = i
      console.log(i)                                   
    }
  })

  if (aux == -1) {             
    alert("Selecione uma tarefa para removê-la...")
    return
  }

  if (confirm(`Confirma Exclusão de "${tarefas[aux].innerText}"?`)) {
    dvQuadro.removeChild(tarefas[aux])        
  }
})

//Função para gravar a lista de tarefas
frm.btGravar.addEventListener("click", () => { 
  const tarefas = document.querySelectorAll("h5")  

  //Verifica se há tarefas para serem salvas
  if (tarefas.length == 0) {
    alert("Não há tarefas para serem salvas")      
    return                                         
  }

  let dados = ""                            
  tarefas.forEach(tarefa => { 
    dados += tarefa.innerText + ";"         
  })

  
  localStorage.setItem("tarefasDia", dados.slice(0, -1))

  
  if (localStorage.getItem("tarefasDia")) {
    alert("Ok! Tarefas Salvas")
  }
})

window.addEventListener("load", () => { 
  
  if (localStorage.getItem("tarefasDia")) {
    
    const dados = localStorage.getItem("tarefasDia").split(";")

    // percorre os dados armazenados em localStorage
    dados.forEach(dado => {
      const h5 = document.createElement("h5")      
      const texto = document.createTextNode(dado)  
      h5.appendChild(texto)                      
      dvQuadro.appendChild(h5)                   
    })
  }
})
