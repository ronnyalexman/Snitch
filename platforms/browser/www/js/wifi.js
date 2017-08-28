/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(cargarJSON);

function cargarJSON() {
    var url2 = "http://ynnor.ddns.net:9090/Snitch/wifi";
    var url3 = "http://localhost:8080/Snitch/wifi";

    $.ajax({
        type: "GET",
        Accept: "application/json",
        dataType: "json",
        url: url2,
        timeout: 30000,
        error: function (result) {
            alert("Data not found " + JSON.stringify(result));
        },
        success: function (data) {
            console.log(JSON.stringify(data));
            $("#router > tbody > tr:first").append(titulo(data["summary"]["routername"]));
            $("#router").append(trAndtd(data["summary"]["router"]));
            $("#router").append(trAndtd("Addresses: " + data["summary"]["addresses"]));

            $("#server > tbody > tr:first").append(titulo(data["summary"]["server"]));
            $("#server").append(trAndtd(data["summary"]["ipserver"]));
            $("#server").append(trAndtd("Seconds: " + data["summary"]["seconds"]));

            $.each(data["devices"], function () {
                var tr = document.createElement("tr");
                tr.appendChild(tdMethod("name", this["name"]));
                tr.appendChild(tdMethod("ip", this["ip"]));
                tr.appendChild(tdMethod("mac", this["mac"]));
                tr.appendChild(tdMethod("manufacturer", this["manufacturer"]));
                tr.appendChild(tdMethod("latency", this["latency"]));
                $("#devices").append(tr);


            });
        }
    });
}

function tdMethod(k, v) {
    var td = document.createElement("td"); //1 por cada campo del elemento

    //head
    var spanHead = document.createElement("span"); //span head
    spanHead.append(k);
    spanHead.setAttribute("class", "rwd-tables thead");
    td.appendChild(spanHead);

    //body
    var spanBody = document.createElement("span"); //span body
    spanBody.append(v);
    spanBody.setAttribute("class", "rwd-tables tbody");
    td.appendChild(spanBody);
    return td;
}
function trAndtd(contenido) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var h5 = document.createElement("h5");
    h5.append(contenido);
    td.appendChild(h5);
    tr.appendChild(td);
    return tr;
}

function titulo(contenido) {
    var td = document.createElement("td");
    var h4 = document.createElement("h4");
    h4.append(contenido);
    td.appendChild(h4);
    return td;
}
