import { openDB } from 'idb';

import './sass/style.scss';
import renderView from './lib/renderView';

const nav = document.querySelector('header nav');


async function initDB() {
  await openDB('autobot_db', 1, {
    async upgrade(db) {
      if (!db.objectStoreNames.contains('autobots')) {
        await db.createObjectStore('autobots', {
          keyPath: 'id',
          autoIncrement: true
        });

        console.log('Autobot store created!');
      }
    }
  })

  console.log('Indexed DB connection established');
}


// Initial code
initDB();

renderView('home');

nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    e.preventDefault();

    const templateName = e.target.dataset.template;

    // Remove active class from all links
    for (const link of nav.children) {
      link.classList.remove('active');
    }

    // Add the active class to the link that was clicked
    e.target.classList.add('active');

    renderView(templateName);
  }
});

if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('Service Worker registered');
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

class Person {

}

const jd = new Person();