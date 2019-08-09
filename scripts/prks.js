"use strict";

window.onload = function () {
    document.getElementById("stateCheck").onchange = choseSelect;
    document.getElementById("parkTypeCheck").onchange = choseSelect;

    const inputStateField = document.getElementById("inputState");
    let table = document.getElementById("parkTable");

    selectType();


    let objs;
    $.getJSON("data/nationalparks.json",
        function (data) {
            objs = data;

            inputStateField.onchange = function () {
                let selectedParkState = inputStateField.options[inputStateField.selectedIndex].innerHTML;
                console.log(selectedParkState);

                while (table.childNodes.length) {
                    table.innerHTML = "";
                };

                let tblHead = table.createTHead();
                let thRow = tblHead.insertRow(table.rows.length);

                let thCell0 = thRow.insertCell(0);
                let thCell1 = thRow.insertCell(1);
                let thCell2 = thRow.insertCell(2);
                let thCell3 = thRow.insertCell(3);

                thCell0.innerHTML = "<b>Name</b>";
                thCell1.innerHTML = "<b>Location</b>";
                thCell2.innerHTML = "<b>Address</b>";
                thCell3.innerHTML = "<b>Link</b>";

                //tblHead.appendChild(thRow);
                //table.appendChild(tblHead);

                const len = objs.parks.length;
                for (let i = 0; i < len; i++) {
                    if (selectedParkState == objs.parks[i].State) {
                        let selectedPrk = objs.parks[(i)];
                        let parkName = selectedPrk.LocationName;
                        let parkAddress = selectedPrk.Address;
                        let parkcity = selectedPrk.City;
                        let parkState = selectedPrk.State;
                        let parkZip = selectedPrk.ZipCode;
                        let parkLocation = selectedPrk.Location
                        let parkVisit = selectedPrk.Visit

                        // const len = objs.parks.length;
                        //for (let i = 0; i < len; i++) {

                        //}
                        let row = table.insertRow(table.rows.length);

                        let cell1 = row.insertCell(0);
                        cell1.innerHTML = parkName;

                        let cell2 = row.insertCell(1);
                        cell2.innerHTML = parkLocation.coordinates[0] + " " + parkLocation.coordinates[1];


                        let cell3 = row.insertCell(2);
                        cell3.innerHTML = parkAddress + " " + parkcity + "<br />" + parkState + " " + parkZip;
                        let cell4 = row.insertCell(3);

                        //console.log(parkVisit);
                        if ( parkVisit != undefined ) {
                            let prkVist = document.createElement("a");
                            prkVist.href = parkVisit;
                            prkVist.innerHTML = parkVisit;
                            prkVist.target = "_blank";
                            cell4.appendChild(prkVist);
                        } else {
                            cell4.innerHTML = "&nbsp";
                        }
                        
                    }
                }
                document.getElementById("resetBtn").onclick = function () {
                    table.innerHTML = "";
                }


            }
        })
}

function selectType() {
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

    let selectedParkType = document.getElementById("inputParkTypeSelect");
    const len = parkTypes.length;
    for (let i = 0; i < len; i++) {

        let opt = document.createElement("option");
        opt.value = i;
        opt.text = parkTypes[i];
        selectedParkType.add(opt);
    }
}

function choseSelect() {
    let stateChecked = Number(document.getElementById("stateCheck").checked);
    let typeChecked = Number(document.getElementById("parkTypeCheck").checked);

    if (stateChecked) {
        let stateDiv = document.getElementById("stateDiv");
        stateDiv.style.display = "block";

    } if (typeChecked) {
        let typeDiv = document.getElementById("parkTypeDiv");
        typeDiv.style.display = "block";
    } else {
        document.getElementsByClassName("inputDiv").style.display = "none";
    }
}

// function createTable(table, objs) {
//     let table = document.getElementById("parkTable");
//     let tblHead = table.createTHead();
//     let thRow = tblHead.insertRow(table.rows.length);

//     let thCell0 = thRow.insertCell(0);
//     let thCell1 = thRow.insertCell(1);
//     let thCell2 = thRow.insertCell(2);
//     let thCell3 = thRow.insertCell(3);

//     thCell0.innerHTML = "<b>Name</b>";
//     thCell1.innerHTML = "<b>Address</b>";
//     thCell2.innerHTML = "<b>Name</b>";


//     let tblBody = document.createElement("tbody");
//     let tblTH = document.createElement("th");
//     let tblHeadRow = tblHead.insertRow();


//     let cell1 = row.insertCell(0); tblTH
//     cell1.innerHTML = "<b>name</b>";

//     for (let i = 0; i < len; i++) {
//         let th = document.createElement("th");
//         let text = document.createTextNode("tbody");
//         let data = Object.keys(objs[0]);

//     }
// }
