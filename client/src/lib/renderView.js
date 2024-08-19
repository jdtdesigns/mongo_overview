import { getAllAutobots } from './requests';

async function renderView(templateId) {
  const main = document.querySelector('#main-content');
  const template = document.querySelector('#' + templateId);

  main.innerHTML = template.innerHTML;

  if (templateId === 'autobot') {
    const autobotOutput = document.querySelector('#autobot-output');
    // The array of all autobot objects from the server
    const autobots = await getAllAutobots();

    if (!autobots.length) {
      autobotOutput.innerHTML = '<h4>No Autobots have been added.</h4>'
    }

    autobots.forEach(autobotObj => {
      autobotOutput.insertAdjacentHTML('beforeend', `
      <div class="autobot column align-center">
        <h4>${autobotObj.name}</h4>
        <p>Color: ${autobotObj.color}</p>
      </div>  
      `);
    });
  }
}

export default renderView;