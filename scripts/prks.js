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

    // state dropdown 
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


    // park type dropdown
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

    // show all Btn
    const showAllBtn = document.getElementById('showAllBtn');
    showAllBtn.onclick = function () {
        clearTable();
        let objLen = parkObjs.parks.length;
        for (let i = 0; i < objLen; i++) {
            let selectedPrk = parkObjs.parks[i];
            insertRowInTable(tableBody, selectedPrk);
        }
    };

    // reset button
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.onclick = function () {
        //sets visible divs back to initial, drop down boxes and radio buttons to initial
        stateDiv.style.display = 'block';
        parkTypeDiv.style.display = 'none';
        inputStateDropdown.selectedIndex = 0;
        stateRadio.checked = true;
        //clears table contents, if any
        clearTable();
    };


    
} // end of window.onload function


function insertRowInTable(tableBody, selectedPrk) {
    let link = selectedPrk.Visit;

    let row = tableBody.insertRow(tableBody.rows.length);
    let cell1 = row.insertCell(0);
    cell1.innerHTML = selectedPrk.LocationName;
    let cell2 = row.insertCell(1);
    cell2.innerHTML = selectedPrk.Address + ", <br/>" + selectedPrk.City + ", " +  selectedPrk.State + ", " + selectedPrk.ZipCode;
    let cell3 = row.insertCell(2);
    cell3.innerHTML = "(" + selectedPrk.Latitude + "&#176;,  " + selectedPrk.Longitude + "&#176;)";
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

    // to populate park type dropdown
    const parkTypeLen = parkTypes.length;
    for (let i = 0; i < parkTypeLen; i++) {

        let opt = document.createElement("option");
        opt.value = parkTypes[i];
        opt.text = parkTypes[i];
        inputTypeDropdown.add(opt);
    }
}

function displaySearch(inputStateDropdown, inputTypeDropdown) {
    let stateRadio = document.getElementById("stateRadio");
    let typeRadio = document.getElementById("parkTypeRadio");

    //this function hides the park type filter options when location selected
    stateRadio.onclick = function () {
        clearTable();
        parkTypeDiv.style.display = 'none';
        stateDiv.style.display = 'block';
        inputStateDropdown.selectedIndex = 0;
    };
    //this function hides the state/location filter options when location selected
    typeRadio.onclick = function () {
        clearTable();
        stateDiv.style.display = 'none';
        parkTypeDiv.style.display = 'block';
        inputTypeDropdown.selectedIndex = 0;
    };
}

//clears results table if there are any rows
function clearTable() {
    let tableBody = document.getElementById("tblBody");
    while (tableBody.childNodes.length) {
        tableBody.removeChild(tableBody.childNodes[0]);
    }
}