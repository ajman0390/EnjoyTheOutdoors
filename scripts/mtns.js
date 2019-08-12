"use strict";

window.onload = function () {
    let table = document.getElementById("mtnSearchTable");

    let objs;
    $.getJSON("data/mountains.json",
        function (data) {
            objs = data;

            // Create Input Mountain Dropdown list
            let selection = document.getElementById("inputMtSelect");
            const len = objs.mountains.length;
            for (let i = 0; i < len; i++) {
                let opt = document.createElement("option");
                opt.value = i;
                opt.text = objs.mountains[i].name;
                selection.add(opt);
            }

            /*
            * This funciton shows all Mtn results in the Form TableBody
            */
            const showAllBtn = document.getElementById('showAllBtn');
            showAllBtn.onclick = function () {
                clearTable();
                selection.selectedIndex = 0;
                for (let i = 0; i < len; i++) {
                    let objMtn = objs.mountains[i];
                    insertRowIntoTable(table, objMtn);
                }
            };

            // Reset Btn
            document.getElementById("resetBtn").onclick = function () {
                // clears table
                clearTable();
            }


            // onchange to Mtn selection dropdown to display table, if selected mtn is on initial state, no changes to table display
            selection.onchange = function () {
                clearTable();
                if (selection.value === "zero") {
                    return;
                } else {
                    let selectedMt = objs.mountains[(selection.selectedIndex - 1)];
                    insertRowIntoTable(table, selectedMt);
                }
            }

        }
    )

}

/*
* This funciton creates and inputs mtn data into the Form Table
*
* @input tableBody (Form TableBody) - The Table from Form
* @input selectedMt (MountainObject) - The selected Mountain Object from mountains.data
*/
function insertRowIntoTable(table, selectedMt) {
    let mtName = selectedMt.name;
    let mtDesc = selectedMt.desc;
    let mtElevation = selectedMt.elevation;
    let mtEffort = selectedMt.effort;
    let mtImg = selectedMt.img;

    //clearTable();
    let row = table.insertRow(table.rows.length);

    let cell1 = row.insertCell(0);
    cell1.innerHTML = "<b>Name</b>";
    let cell2 = row.insertCell(1);
    cell2.innerHTML = mtName;

    let row2 = table.insertRow(table.rows.length);
    let cell3 = row2.insertCell(0);
    cell3.innerHTML = "<b>Desc</b>";
    let cell4 = row2.insertCell(1);
    cell4.innerHTML = mtDesc;

    let row3 = table.insertRow(table.rows.length);
    let cell5 = row3.insertCell(0);
    cell5.innerHTML = "<b>Elevation</b>";
    let cell6 = row3.insertCell(1);
    cell6.innerHTML = mtElevation.toLocaleString() + " ft";

    let row4 = table.insertRow(table.rows.length);
    let cell7 = row4.insertCell(0);
    cell7.innerHTML = "<b>Effort</b>";
    let cell8 = row4.insertCell(1);
    cell8.innerHTML = mtEffort;

    let row5 = table.insertRow(table.rows.length);
    let cell9 = row5.insertCell(0);
    cell9.innerHTML = "<b>Coordinates</b>";
    let cell10 = row5.insertCell(1);
    cell10.innerHTML = "( Latitude: " + selectedMt.coords.lat + "&#176;,   Longitude: " + selectedMt.coords.lng + "&#176; )";

    let row6 = table.insertRow(table.rows.length);
    let cell11 = row6.insertCell(0);
    cell11.innerHTML = "<b>Image</b>";
    let imgSrc = document.createElement("img");
    imgSrc.src = "img/" + mtImg;
    let cell12 = row6.insertCell(1);
    cell12.appendChild(imgSrc);
}

/*
* This funciton clears results table if there are any rows in the Form TableBody
*/
function clearTable() {
    let tableBody = document.getElementById("mtnSearchTable");
    while (tableBody.childNodes.length) {
        tableBody.removeChild(tableBody.childNodes[0]);
    }
}
