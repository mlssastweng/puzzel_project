
var rows = 5;
var col = 3;

var currTile;
var otherTile;

var skor = 0;
window.onload = function(){
    for(let i = 0;i<rows ;i++)
    {
        for(let j = 0; j < col ; j++)
        {
            let tile = document.createElement("img");
            tile.src = "img/white.jpg";
            tile.addEventListener("dragstart",dragStart);
            tile.addEventListener("dragover",dragOver);
            tile.addEventListener("dragenter",dragEnter);
            tile.addEventListener("dragleave",dragLeave);
            tile.addEventListener("drop",dragDrop);
            tile.addEventListener("dragend",dragEnd);
            document.getElementById("tablo").append(tile);
        }
    }
    let resim_tablosu = [];
  
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < col; j++) {
            resim_tablosu.push(i * col + j + 1);
        }
    }
    resim_tablosu.reverse();//resimleri karıştırma

    for(let i = 0;i< resim_tablosu.length;i++)
    {
        let j = Math.floor(Math.random()* resim_tablosu.length);
        //swap
        let temp = resim_tablosu[i];
        resim_tablosu[i] =resim_tablosu[j];
        resim_tablosu[j] = temp;
    }
    for(let i=0 ;i<resim_tablosu.length;i++)
    {
        let tile = document.createElement("img");
        tile.src = "./img/" + resim_tablosu[i] + ".jpg";

        tile.addEventListener("dragstart",dragStart);
        tile.addEventListener("dragover",dragOver);
        tile.addEventListener("dragenter",dragEnter);
        tile.addEventListener("dragleave",dragLeave);
        tile.addEventListener("drop",dragDrop);
        tile.addEventListener("dragend",dragEnd);
  
        document.getElementById("resim_tablosu").append(tile);
    }
ü
    
}
// Drag olaylarını işleyen fonksiyonlar
function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    currTile = event.target;
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
    event.target.classList.add("hovered");
}

function dragLeave(event) {
    event.target.classList.remove("hovered");
}

function dragDrop(event) {
    event.preventDefault();
    otherTile = event.target;
    swapTiles();
}

function dragEnd() {
    let tiles = document.querySelectorAll("#resim_tablosu img");
    tiles.forEach((tile) => {
        tile.classList.remove("hovered");
    });
    
}
// Parçaların yerlerini değiştiren fonksiyon
var dogruParca = 0;
function swapTiles() {
    const tempSrc = currTile.src;
    const tempAlt = currTile.alt;

    currTile.src = otherTile.src;
    currTile.alt = otherTile.alt;
    currTile.classList.remove("hovered");

    otherTile.src = tempSrc;
    otherTile.alt = tempAlt;
    otherTile.classList.remove("hovered");

    incrementScore(); // Skor değerini artır



    if (dogruParca === rows * col) {
        if (checkCompleted()) {
            console.log("Tamamlama kontrolü yapılıyor...");
            alert("Tebrikler! Bulmaca tamamlandı.");
        }
    }
}

function incrementScore() {
    skor++; // Skor değerini bir artır
    document.getElementById("skor").textContent = skor; // Skor değerini güncelle
}


