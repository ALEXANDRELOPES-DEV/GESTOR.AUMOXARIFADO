const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNomeMoto = document.querySelector('#m-numero-moto'); // Nº da moto
const sNomeCondutor = document.querySelector('#m-nome-condutor'); // Nome do condutor
const sStatusMoto = document.querySelector('#m-status-moto'); // Status da moto
const sDataProblema = document.querySelector('#m-data-problema'); // Data do problema
const sKmInicial = document.querySelector('#m-km-inicial'); // KM/Inicial
const sKmProximaTroca = document.querySelector('#m-km-proxima-troca'); // KM/Próxima Troca
const sBateria = document.querySelector('#m-bateria'); // Bateria
const sGarantia = document.querySelector('#m-garantia'); // Garantia
const btnSalvar = document.querySelector('#btnSalvar');

let itens;
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    sNomeMoto.value = itens[index].numeroMoto;
    sNomeCondutor.value = itens[index].nomeCondutor;
    sStatusMoto.value = itens[index].statusMoto;
    sDataProblema.value = itens[index].dataProblema.split('/').reverse().join('-'); // Converte para AAAA-MM-DD
    sKmInicial.value = itens[index].kmInicial;
    sKmProximaTroca.value = itens[index].kmProximaTroca;
    sBateria.value = itens[index].bateria;
    sGarantia.value = itens[index].garantia;
    id = index;
  } else {
    sNomeMoto.value = '';
    sNomeCondutor.value = '';
    sStatusMoto.value = '';
    sDataProblema.value = '';
    sKmInicial.value = '';
    sKmProximaTroca.value = '';
    sBateria.value = '';
    sGarantia.value = '';
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

function formatDate(date) {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

function insertItem(item, index) {
  let tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${item.numeroMoto}</td>
    <td>${item.nomeCondutor}</td>
    <td>${item.statusMoto}</td>
    <td>${item.dataProblema}</td>
    <td>${item.kmInicial}</td>
    <td>${item.kmProximaTroca}</td>
    <td>${item.bateria}</td>
    <td>${item.garantia}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

btnSalvar.onclick = e => {
  if (sNomeMoto.value == '' || sNomeCondutor.value == '' || sStatusMoto.value == '' || sDataProblema.value == '' || sKmInicial.value == '' || sKmProximaTroca.value == '' || sBateria.value == '' || sGarantia.value == '') {
    return;
  }

  e.preventDefault();

  const dataProblema = sDataProblema.value.split('-').reverse().join('/');

  if (id !== undefined) {
    itens[id].numeroMoto = sNomeMoto.value;
    itens[id].nomeCondutor = sNomeCondutor.value;
    itens[id].statusMoto = sStatusMoto.value;
    itens[id].dataProblema = dataProblema;
    itens[id].kmInicial = sKmInicial.value;
    itens[id].kmProximaTroca = sKmProximaTroca.value;
    itens[id].bateria = sBateria.value;
    itens[id].garantia = sGarantia.value;
  } else {
    itens.push({
      'numeroMoto': sNomeMoto.value,
      'nomeCondutor': sNomeCondutor.value,
      'statusMoto': sStatusMoto.value,
      'dataProblema': dataProblema,
      'kmInicial': sKmInicial.value,
      'kmProximaTroca': sKmProximaTroca.value,
      'bateria': sBateria.value,
      'garantia': sGarantia.value
    });
  }

  setItensBD();

  modal.classList.remove('active');
  loadItens();
  id = undefined;
};

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = '';
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

loadItens();
