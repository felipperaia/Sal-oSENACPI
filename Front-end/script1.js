function changeView(view) {
  const table = document.querySelector('.agenda-container table');
  if (view === 'day') {
    table.classList.add('day-view');
    table.classList.remove('week-view', 'month-view');
  } else if (view === 'week') {
    table.classList.add('week-view');
    table.classList.remove('day-view', 'month-view');
  } else {
    table.classList.add('month-view');
    table.classList.remove('day-view', 'week-view');
  }
}
// alterar tabela quando selecionar dia

document.querySelectorAll('.event').forEach(event => {
  event.addEventListener('click', function () {
    const modal = document.getElementById('eventModal');
    const eventTitle = this.getAttribute('data-title'); 
    const eventDate = this.getAttribute('data-date');   
    const eventLocation = this.getAttribute('data-location'); 
    const eventPhotos = this.querySelector('.photos').innerHTML; 

    // Preenchendo os campos do modal
    document.getElementById('eventTitle').innerText = eventTitle;
    document.getElementById('eventDetails').innerText = "Detalhes do evento: " + eventTitle;
    document.getElementById('eventDate').innerText = eventDate;
    document.getElementById('eventLocation').innerText = eventLocation;
    document.getElementById('eventPhotos').innerHTML = eventPhotos;

    modal.style.display = 'block';
  });
});

// Fechar o modal 
document.querySelector('.close').addEventListener('click', function () {
  document.getElementById('eventModal').style.display = 'none';
});


window.onclick = function (event) {
  const modal = document.getElementById('eventModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Variável para armazenar a célula clicada
let currentCell = null;

// Lógica para abrir o modal ao clicar em uma célula vazia
document.querySelectorAll('.agenda-container table td').forEach(cell => {
  cell.addEventListener('click', function () {
    if (this.innerHTML.trim() === '') { // Verifica se a célula está vazia
      currentCell = this; // Armazena a célula atual
      document.getElementById('addEventModal').style.display = 'block';
    }
  });
});

// Fechar o modal ao clicar no botão de fechar
document.getElementById('closeAddEvent').addEventListener('click', function () {
  document.getElementById('addEventModal').style.display = 'none';
});

// Salvar o evento na célula clicada
function saveEvent() {
  const eventName = document.getElementById('eventInput').value;
  const eventTime = document.getElementById('eventTime').value;
  const eventDay = document.getElementById('eventDay').value;

  if (eventName && currentCell) { // Se houver um evento e uma célula selecionada
    currentCell.innerHTML = `<div class="event">${eventName}</div>`;
    closeAddEventModal(); // Fecha o modal
  }
}

// Fechar o modal e limpar os inputs
function closeAddEventModal() {
  document.getElementById('addEventModal').style.display = 'none';
  document.getElementById('eventInput').value = '';
  document.getElementById('eventTime').value = '';
  document.getElementById('eventDay').value = '';
  currentCell = null;
}

// Fechar o modal clicando fora dele
window.onclick = function (event) {
  const modal = document.getElementById('addEventModal');
  if (event.target === modal) {
    closeAddEventModal();
  }
};
