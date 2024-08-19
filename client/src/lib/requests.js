import { openDB } from 'idb';

export async function getAllAutobots() {
  if (!navigator.onLine) {
    const db = await openDB('autobot_db', 1);
    const tx = db.transaction('autobots', 'readonly');
    const store = tx.store;

    const autobots = await store.getAll();
    console.log('indexeddb autobots', autobots);
    return autobots;
  } else {
    const res = await fetch('/api/autobots');
    const data = await res.json();

    const db = await openDB('autobot_db', 1);
    const tx = db.transaction('autobots', 'readwrite');
    const store = tx.store;

    // Clear all autobots from the store
    await store.clear();

    for (const autobotObj of data) {
      await store.add(autobotObj);
    }

    await tx.done;
    console.log('Autobots added to indexedDB');
    db.close();

    return data;
  }
}