window.onload = () => {
	/** App Setup **/
	if (window.indexedDB) {
		/** IndexedDB is supported, proceed. **/
		alert("all good brotha");
		
		/** Access IndexedDB storage of "FractoidGlobals" **/
		var db;
		var request = window.indexedDB.open("Fractoid", 2);
		
		request.onerror = event => {
			/** FractoidGlobal, but request had erro? **/
			console.error("Database error: " + event.target.errorCode);
		};
		request.onupgradeneeded = event => {
			db = event.target.result;
			
			const objectStore = db.createObjectStore("DataSlots", {autoIncrement: true});
			objectStore.transaction.oncomplete = event => {
				
			}
			
			const objectStore2 = db.createObjectStore("FracGlobals", { keyPath: "name" });
			objectStore2.createIndex("name", "name", { unique: true });
			objectStore2.transaction.oncomplete = event => {
				util_MenuButtons(db);
			}
		};
		request.onsuccess = event => {
			db = event.target.result;
			util_MenuButtons(db);
		}
		
	}
	else {
		alert("Sorry! Your browser does not support IndexedDB");
	}

};

function util_MenuButtons(db) {
	/** Menu Buttons **/
	
	/** New Data Slot **/
	document.getElementById("b_CreateNewData").onclick = function() {
		
		const v_slotalias = (Math.random() + 1).toString(36).substring(4);
		
		const objectStore = db.transaction("FracGlobals", "readwrite").objectStore("FracGlobals");
		const request = objectStore.get("currSlot");
		request.onerror = (event) => {
			alert(event);
		}
		request.onsuccess = (event) => {
			const res = event.target.result;
			
			if (res === undefined) {
				alert("its undef,");
				const request_newCurrSlot = db.transaction("FracGlobals", "readwrite").objectStore("FracGlobals");
				request_newCurrSlot.add({
					"name": "currSlot",
					"value": v_slotalias
				});
			}
			else {
				alert(event.target.result);
				const data = event.target.result;
				data.value = v_slotalias;
				const requestUpdate = objectStore.put(data);
			}
			
			const objSto_DataSlots = db.transaction("DataSlots", "readwrite").objectStore("DataSlots");
			const req_DataSlots = objSto_DataSlots.add( {
				"slot": v_slotalias
			});
			
			req_DataSlots.onsuccess = (event) => {
				document.location.href = 'pages/menuMain.html';
			}
		}
		
	}
}

let installPrompt = null;
const installButton = document.querySelector("#install");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.removeAttribute("hidden");
});

installButton.addEventListener("click", async () => {
  if (!installPrompt) {
    return;
  }
  const result = await installPrompt.prompt();
  console.log(`Install prompt was: ${result.outcome}`);
  installPrompt = null;
  installButton.setAttribute("hidden", "");
});