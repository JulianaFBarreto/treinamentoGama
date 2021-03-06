function validaLogin(){

    let userTxt = localStorage.getItem("userLogged");

    if(!userTxt){
        window.location = "index.html";
    }

    let jsonUser = JSON.parse(userTxt);

    document.getElementById("user").innerHTML = `${jsonUser.nome} ( ${jsonUser.racf} )` ;
    document.getElementById("imgUser").innerHTML = `<img src ="${jsonUser.linkFoto}">`;
    
    obterAgencias();
}

function logout(){
    localStorage.removeItem("userLogged");
    window.location = "index.html";
}

function obterAgencias(){
    fetch("http://localhost:8080/agencias")
    .then(res => res.json())
    .then(result => preencheAgencias(result));
}

function preencheAgencias(resposta){
    let agencias = '';

    for (let index = 0; index < resposta.length; index++) {
        agencias = agencias + `<option value = ${resposta[index].id}> ${resposta[index].nome} </option>`;
    }

    document.getElementById("sel_agencias").innerHTML = agencias;
}

function buscar(){
    let agencia = document.getElementById("sel_agencias");
    let agenciaId = agencia[agencia.selectedIndex].value; //obtem id da agencia selecionada 

    fetch("http://localhost:8080/agencia/"+agenciaId)
    .then(res => res.json())
    .then(result => preencheResposta(result));
}

function preencheResposta(resposta){
    let agendas = '<table class = "table"> <tr> <th>cliente</th> <th>data</th> <th>hora</th> </tr>';

    for (let index = 0; index < resposta.agendamentos.length; index++) {
        agendas = agendas + `<tr> <td> ${resposta.agendamentos[index].nome} </td> 
                                  <td> ${resposta.agendamentos[index].dataAgendamento} </td>
                                  <td> ${resposta.agendamentos[index].horaAgendamento} </td> </tr>`;
    }

    agendas = agendas + '</table>';

    document.getElementById("tableResposta").innerHTML = agendas;
}

