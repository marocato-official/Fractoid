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
		f_displaymembers(db);
	}
};

function f_displaymembers(db) {
	
	const request_FracGlobals = db.transaction("FracGlobals","readonly").objectStore("FracGlobals").get("currSlot");
	request_FracGlobals.onerror = event => {
		
	};
	request_FracGlobals.onsuccess = event => {
		alert(event.target.result.value);
		console.log(event.target.result.value);
		
		const reslt = event.target.result.value;
		
		const request_DataSlots = db.transaction("DataSlots","readonly").objectStore("DataSlots").get(reslt);
		request_DataSlots.onerror = event => {
			console.log(event);
		};
		request_DataSlots.onsuccess = (event) => {
			/** Display all members, **/
			console.log("uea");
	
			var d_MemberDisplayList = document.getElementById("d_MemberDisplayList");
	
			var awawar = document.createElement("p");
			awawar.append(reslt);
	
			d_MemberDisplayList.append(awawar);
		};
	};
	
	
}