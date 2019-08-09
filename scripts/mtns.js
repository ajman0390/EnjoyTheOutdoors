"use strict";

window.onload = function () {
    //document.getElementById("inputFoodSelect").onchange = getMts;

    let objs;
    $.getJSON("data/mountains.json",
        function (data) {
            objs = data;

            let selection = document.getElementById("inputMtSelect");
            const len = objs.mountains.length;
            for (let i = 0; i < len; i++) {

                let opt = document.createElement("option");
                opt.value = i;
                opt.text = objs.mountains[i].name;
                selection.add(opt);
            }

            // const addBtn = document.getElementById("addBtn");
            // addBtn.onclick 
            selection.onchange = function () {
                let selectedMt = objs.mountains[(selection.selectedIndex - 1)];
                let mtName = selectedMt.name;
                let mtDesc = selectedMt.desc;
                let mtElevation = selectedMt.elevation;
                let mtEffort = selectedMt.effort;
                let mtImg = selectedMt.img;
                let table = document.getElementById("mtnTours");

                while (table.childNodes.length) {
                    table.innerHTML = "";
                };

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
                cell6.innerHTML = mtElevation + " ft";

                let row4 = table.insertRow(table.rows.length);
                let cell7 = row4.insertCell(0);
                cell7.innerHTML = "<b>Effort</b>";
                let cell8 = row4.insertCell(1);
                cell8.innerHTML = mtEffort;

                let row5 = table.insertRow(table.rows.length);
                let cell9 = row5.insertCell(0);
                cell9.innerHTML = "<b>Coordinates</b>";
                let cell10 = row5.insertCell(1);
                cell10.innerHTML = "Latitude: " + selectedMt.coords.lat + ",   Longitude: " + selectedMt.coords.lng;

                let row6 = table.insertRow(table.rows.length);
                let cell11 = row6.insertCell(0);
                cell11.innerHTML = "<b>Image</b>";
                let imgSrc = document.createElement("img");
		        imgSrc.src = "img/" + mtImg;
                let cell12 = row6.insertCell(1);
                cell12.appendChild(imgSrc);

                // selection.onchange = function () {
                //     table.innerHTML = "";
                // }
                document.getElementById("resetBtn").onclick = function () {
                    table.innerHTML = "";
                }
            }
        }
    )

}