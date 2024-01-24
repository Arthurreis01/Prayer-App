function setupDrag(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function handleDrop(event) {
  event.preventDefault();

  var data = event.dataTransfer.getData("text/plain");
  var draggedElement = document.getElementById(data);
  var targetColumn = event.currentTarget;

  if (targetColumn.classList.contains("column")) {
    var targetElement = event.target;
    var isSpacer = targetElement.classList.contains("spacer");

    if (!isSpacer) {
      var position = event.clientY - targetColumn.getBoundingClientRect().top;
      var relativePosition = position / targetColumn.clientHeight;

      if (relativePosition <= 0.5) {
        targetColumn.insertBefore(draggedElement, targetElement);
      } else {
        targetColumn.insertBefore(draggedElement, targetElement.nextSibling);
      }
    }
  }
}

function addNewTask(columnId) {
  var column = document.getElementById(columnId);
  var newTaskName = prompt("Insira seu novo pedido de Oração");

  if (newTaskName) {
    var newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.draggable = true;
    newTask.id = "task" + Date.now();

    // Adiciona o título principal editável
    var titleElement = document.createElement("h3");
    titleElement.contentEditable = true;
    titleElement.textContent = newTaskName;
    newTask.appendChild(titleElement);

    // Adiciona espaço para notas
    var notesContainer = document.createElement("div");
    notesContainer.classList.add("notes");
    notesContainer.contentEditable = true;
    notesContainer.placeholder = "Inserir notas sobre este quadro...";
    newTask.appendChild(notesContainer);

    // Adiciona aba para comentários
    var commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments");
    commentsContainer.contentEditable = true;
    commentsContainer.placeholder = "Adicionar comentários...";
    newTask.appendChild(commentsContainer);

    // Adiciona o botão de lixeira diretamente no HTML
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = '🗑️';
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function () {
      column.removeChild(newTask);
    });
    newTask.appendChild(deleteButton);

    // Adiciona o novo card como o primeiro filho da coluna
    column.insertBefore(newTask, column.lastElementChild);

    // Configura o evento de arrastar para o novo card
    newTask.addEventListener("dragstart", setupDrag);
  }
}


var columns = document.querySelectorAll(".column");
columns.forEach(function (column) {
  column.addEventListener("dragover", function (event) {
    event.preventDefault();
  });
  column.addEventListener("drop", handleDrop);
});
