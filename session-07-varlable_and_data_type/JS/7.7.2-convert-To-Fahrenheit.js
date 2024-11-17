document.getElementById("button").addEventListener('click', chuyendoi );
function chuyendoi() {
    let doC = parseFloat(document.getElementById("doC").value);
    let doF = (doC *9)/5 +32;
document.getElementById("result").innerHTML = `${doC} độ C =  ${doF} độ F`;
}
