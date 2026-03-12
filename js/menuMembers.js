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
	
	/** Menu Buttons **/
	const b_CreateNewMember = document.getElementById("b_CreateNewMember");
	b_CreateNewMember.onclick = function() {
		document.location.href = 'createMember.html';
	}
};

function f_displaymembers(db) {
	
	const request_FracGlobals = db.transaction("FracGlobals","readonly").objectStore("FracGlobals").get("currSlot");
	request_FracGlobals.onerror = event => {
		
	};
	request_FracGlobals.onsuccess = event => {
		//alert(event.target.result.value);
		console.log(event.target.result.value);
		
		const reslt = event.target.result.value;
		
		const request_DataSlots = db.transaction("DataSlots","readonly").objectStore("DataSlots").get(reslt);
		request_DataSlots.onerror = event => {
			console.log(event);
		};
		request_DataSlots.onsuccess = (event2) => {
			/** Display all members, **/
			const v_MemberList = event2.target.result.members;
	
			var d_MemberDisplayList = document.getElementById("d_MemberDisplayList");
	
			if (v_MemberList.length > 0) {
				var n_memberblock = document.createElement("div");
				console.log(n_memberblock.classList);
			}
			else {
				var n_theresnothinghere = document.createElement("span");
				n_theresnothinghere.classList.add("whitetext");
				n_theresnothinghere.append("No member data.");
				
				d_MemberDisplayList.append(n_theresnothinghere);
			}

		};
	};
	
	
}