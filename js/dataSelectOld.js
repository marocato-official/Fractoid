window.onload = () => {
	/** Load the Database **/
	var db;
	var request = window.indexedDB.open("Fractoid", 2);
	
	request.onerror = event => {
		/** FractoidGlobal, but request had erro? **/
		console.error("Database error: " + event.target.errorCode);
	};
	request.onsuccess = event => {
		db = event.target.result;
		f_listslots(db);
	}
	
};

function f_listslots(db) {
	const request_DataSlotsAll = db.transaction("DataSlots","readonly").objectStore("DataSlots").getAll();
	request_DataSlotsAll.onerror = event => {
		
	};
	request_DataSlotsAll.onsuccess = event => {
		const reslt = event.target.result;
		
		console.log(reslt);
		
	}
}