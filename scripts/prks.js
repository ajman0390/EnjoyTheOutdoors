"use strict";

window.onload = function () {
    const stateRadio = document.getElementById("stateRadio");
    const tableBody = document.getElementById("tblBody");
    
    const inputStateDropdown = document.getElementById("inputState");
    const inputTypeDropdown = document.getElementById("inputParkTypeSelect");

    createTypeDropdown(inputTypeDropdown);
    displaySearch(inputStateDropdown, inputTypeDropdown);

    let parkObjs;
    $.getJSON("data/nationalparks.json",
        function (data) {
            parkObjs = data;
        });

    // parkState Dropdown 
    inputStateDropdown.onchange = function () {
        clearTable();

        let selectedParkState = inputStateDropdown.options[inputStateDropdown.selectedIndex].innerHTML;

        const stateLen = parkObjs.parks.length;
        for (let i = 0; i < stateLen; i++) {
            let selectedPrk = parkObjs.parks[i];
            if (selectedParkState == selectedPrk.State) {
                insertRowInTable(tableBody, selectedPrk);
            }
        }
    };


    // parkType Dropdown
    inputTypeDropdown.onchange = function () {
        clearTable();
        const typeLen = parkObjs.parks.length;
        for (let i = 0; i < typeLen; i++) {
            let selectedPrk = parkObjs.parks[i];
            let str = selectedPrk.LocationName;
            let searchResult = str.toLowerCase().indexOf(inputTypeDropdown.value.toLowerCase())

            if (searchResult >= 0) {
                insertRowInTable(tableBody, selectedPrk);
            }
        };
    }

    // Show All Btn
    const showAllBtn = document.getElementById('showAllBtn');
    showAllBtn.onclick = function () {
        clearTable();
        inputStateDropdown.selectedIndex = 0;
        inputTypeDropdown.selectedIndex = 0;
        let objLen = parkObjs.parks.length;
        for (let i = 0; i < objLen; i++) {
            let selectedPrk = parkObjs.parks[i];
            insertRowInTable(tableBody, selectedPrk);
        }
    };

    // Reset Btn
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.onclick = function () {
        // resets back to initial
        stateDiv.style.display = 'block';
        parkTypeDiv.style.display = 'none';
        inputStateDropdown.selectedIndex = 0;
        stateRadio.checked = true;
        // clears table
        clearTable();
    };
    
} // end of window.onload function

/*
* This funciton creates and inputs a row into the Form TableBody
*
* @input tableBody (Form TableBody) - The TableBody from Form
* @input selectedPrk (ParkObject) - The selected Park Object 
*/
function insertRowInTable(tableBody, selectedPrk) {
    let link = selectedPrk.Visit;

    let row = tableBody.insertRow(tableBody.rows.length);
    let cell1 = row.insertCell(0);
    cell1.innerHTML = selectedPrk.LocationName;
    let cell2 = row.insertCell(1);
    cell2.innerHTML = selectedPrk.Address + ", <br/>" + selectedPrk.City + ", " +  selectedPrk.State + ", " + selectedPrk.ZipCode;
    let cell3 = row.insertCell(2);
    cell3.innerHTML = "( " + selectedPrk.Latitude + "&#176;,  " + selectedPrk.Longitude + "&#176; )";
    let cell4 = row.insertCell(3);
    if (link != undefined) {
        let linkField = document.createElement("a");
        linkField.href = link;
        linkField.innerHTML = link;
        linkField.target = "_blank";
        cell4.appendChild(linkField);
    } else {
        cell4.innerHTML = "&nbsp;";
    }
}

/*
* This funciton creates the Form Input ParkType Dropdown list
*
* @input inputTypeDropdown (Form Dropdown) - The ParkType Search Dropdown list from Input Form
*/
function createTypeDropdown(inputTypeDropdown) {
    let parkTypes = [
        "National Park",
        "National Monument",
        "Recreation Area",
        "Scenic Trail",
        "Battlefield",
        "Historic",
        "Memorial",
        "Preserve",
        "Island",
        "River",
        "Seashore",
        "Trail",
        "Parkway"
    ];

    // to populate parkType dropdown list
    const parkTypeLen = parkTypes.length;
    for (let i = 0; i < parkTypeLen; i++) {

        let opt = document.createElement("option");
        opt.value = parkTypes[i];
        opt.text = parkTypes[i];
        inputTypeDropdown.add(opt);
    }
}

/*
* This changes the display of the search options based on search radios from Form
*
* @input inputStateDropdown (Form Dropdown) - The ParkState Search Dropdown list from Form
* @input inputTypeDropdown (Form Dropdown) - The ParkType Search Dropdown list from Form
*/
function displaySearch(inputStateDropdown, inputTypeDropdown) {
    let stateRadio = document.getElementById("stateRadio");
    let typeRadio = document.getElementById("parkTypeRadio");

    // this function hides the type search dropdown when search by state search radio is selected
    stateRadio.onclick = function () {
        clearTable();
        parkTypeDiv.style.display = 'none';
        stateDiv.style.display = 'block';
        inputStateDropdown.selectedIndex = 0;
    };
    // this function hides the state search dropdown when search by type search radio is selected
    typeRadio.onclick = function () {
        clearTable();
        stateDiv.style.display = 'none';
        parkTypeDiv.style.display = 'block';
        inputTypeDropdown.selectedIndex = 0;
    };
}

/*
* This clears results table in Form
*/
function clearTable() {
    let tableBody = document.getElementById("tblBody");
    while (tableBody.childNodes.length) {
        tableBody.removeChild(tableBody.childNodes[0]);
    }
}