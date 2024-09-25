import { openDB } from 'idb';

const DB_NAME = 'Plastic';
const STORE_NAME = 'plastic';

// Open or create the IndexedDB database
export async function initDB() {
    return await openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                store.createIndex('date', 'date');
            }
        },
    });
}

// Function to add data to the IndexedDB
export async function addDataToDB(data) {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.add(data);
    await tx.done;
    console.log('Data added to IndexedDB', data);
}

// Function to get all data from IndexedDB
export async function getAllDataFromDB() {
    const db = await initDB();
    return await db.getAll(STORE_NAME);
}

// Function to get data with date selection
export async function getDataWithinDateRange(startDate, endDate) {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME);
    const results = [];
    // console.log(startDate.getTime())

    for await (const cursor of tx.store) {
        const recordDate = cursor.value.date;
        // Check if the record's date (timestamp) is within the specified range
        if (recordDate >= startDate.getTime() && recordDate <= endDate.getTime()) {
            results.push(cursor.value);
        }
    }
    return results;  // Return the filtered results
}


// Function to delete db
export function deleteDB() {
    const deleteRequest = indexedDB.deleteDatabase(DB_NAME);

    deleteRequest.onsuccess = () => {
        console.log(`Database ${DB_NAME} deleted successfully.`);
    };

    deleteRequest.onerror = () => {
        console.error(`Failed to delete the database ${DB_NAME}.`);
    };

    deleteRequest.onblocked = () => {
        console.warn(`Deletion of ${DB_NAME} was blocked.`);
    };
}

// Function to delete all data
export async function deleteAllData() {
    const db = await initDB(); // Initialize your IndexedDB
    const tx = db.transaction(STORE_NAME, 'readwrite'); // Open a read-write transaction
    const store = tx.objectStore(STORE_NAME); // Access the object store

    // Clear all data from the object store
    const clearRequest = store.clear();

    clearRequest.onsuccess = () => {
        console.log('All data deleted successfully.');
    };

    clearRequest.onerror = (event) => {
        console.error('Error deleting data:', event.target.error);
    };

    // Wait for the transaction to complete
    await tx.done;
}

