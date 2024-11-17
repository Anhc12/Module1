let physics = parseInt(prompt("Nhập điểm Vật lý :"));
let chemistry = parseInt(prompt("Nhập điểm Hóa :"));
let biology = parseInt(prompt("Nhập điểm Sinh học :"));
let average = (physics + chemistry + biology) / 3;
let sum = physics + chemistry + biology;
document.write(`The Average is : ${average.toFixed(2)} and Overall Score ís ${sum}`);
