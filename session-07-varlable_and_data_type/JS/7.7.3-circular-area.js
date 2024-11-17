document.getElementById("area").addEventListener("click", circularArea);
function circularArea() {
    let r = parseFloat(document.getElementById("radius").value);
    const pi = 3.14159;
    let area = r*r*pi;
    document.getElementById("result").innerHTML = `Diện tích hình tròn là : ${area.toFixed(5)}`;
}