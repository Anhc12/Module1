document.getElementById("circum").addEventListener("click", tinhchuvi );
function tinhchuvi(){
    let r = parseFloat(document.getElementById("radius").value);
    const pi =3.14159;
    let circum = r*2*pi;
    document.getElementById("result").innerHTML = `Chu vi hình tròn là : ${circum.toFixed(5)}`;
}