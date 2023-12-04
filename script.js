document.addEventListener('DOMContentLoaded', function () {
  let projectForm = document.getElementById('projectForm');
  let projectContainer = document.getElementById('projectContainer');

  restoreData();

  document
    .getElementById('addProjectBtn')
    .addEventListener('click', function () {
      let projectName = document.getElementById('projectName').value;
      let projectDescription =
        document.getElementById('projectDescription').value;
      let projectLink = document.getElementById('projectLink').value;

      let newCard = document.createElement('div');
      newCard.className = 'col-md-4 mb-4';
      newCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${projectName}</h5>
                        <p class="card-text">${projectDescription}</p>
                        <p class="card-text"><strong>Посилання:</strong> <a href="${projectLink}" target="_blank">${projectLink}</a></p>
                        <button type="button" class="btn btn-danger btn-sm" onclick="removeCard(this)">Видалити</button>
                    </div>
                </div>
            `;

      projectContainer.appendChild(newCard);

      saveData();

      $('#addProjectModal').modal('hide');

      projectForm.reset();
    });
});

function removeCard(button) {
  let card = button.closest('.col-md-4');
  card.remove();

  saveData();
}

function saveData() {
  let projectCards = document.querySelectorAll('#projectContainer .card');
  let projectsData = [];

  projectCards.forEach(function (card) {
    let projectName = card.querySelector('.card-title').innerText;
    let projectDescription = card.querySelector('.card-text').innerText;
    let projectLink = card.querySelector('.card-text a').getAttribute('href');

    projectsData.push({
      name: projectName,
      description: projectDescription,
      link: projectLink,
    });
  });

  localStorage.setItem('projects', JSON.stringify(projectsData));
}

function restoreData() {
  let projectsData = localStorage.getItem('projects');

  if (projectsData) {
    projectsData = JSON.parse(projectsData);

    projectsData.forEach(function (project) {
      let newCard = document.createElement('div');
      newCard.className = 'col-md-4 mb-4';
      newCard.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${project.name}</h5>
                            <p class="card-text">${project.description}</p>
                            <p class="card-text"><strong>Посилання:</strong> <a href="${project.link}" target="_blank">${project.link}</a></p>
                            <button type="button" class="btn btn-danger btn-sm" onclick="removeCard(this)">Видалити</button>
                        </div>
                    </div>
                `;

      document.getElementById('projectContainer').appendChild(newCard);
    });
  }
}
