window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("tela");
    const ctx = canvas.getContext("2d");
    let coloreattuale = "black";
    let disegno = false;
    let isGomma = false;
    const gomma = document.getElementById('gomma');
    const bottoniColori = document.querySelectorAll("button.color-button");

    canvas.addEventListener("touchmove", function (e) {
        disegno = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }, false);
    
    function aggiornaAltezzaCanvas () {
        const testoDiv = document.querySelector('.controltext');
        const canvas = document.getElementById('tela');
        const altezzaFinestra = window.innerHeight;
        const altezzatesto = testoDiv.offsetHeight;
        const nuovaAltezza = altezzaFinestra - altezzatesto;
        canvas.height = nuovaAltezza;
    }
    
    canvas.width = window.innerWidth;

    
    window.addEventListener('load', aggiornaAltezzaCanvas);
    window.addEventListener('resize', aggiornaAltezzaCanvas);
    

    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    canvas.addEventListener("mousedown", (e) => {
        disegno = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener("mousemove", (e) => {
        if (disegno) {
            ctx.strokeStyle = coloreattuale;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    });

    ["mouseup", "mouseleave"].forEach(event => {
        canvas.addEventListener(event, () => {
            disegno = false;
            ctx.beginPath();
        });
    });

    const mappaColori = {
        rosso: "red",
        nero: "black",
        giallo: "yellow",
        verde: "forestgreen",
        blu: "#afeeee",
        arancione: "orangered",
        marrone: "saddlebrown",
        viola: "blueviolet",
        rosa: "deeppink"
    };

    bottoniColori.forEach((button) => {
        button.addEventListener("click", () => {
            isGomma = false;
            ctx.lineWidth = 5;
            ctx.globalCompositeOperation = "source-over";
            coloreattuale = mappaColori[button.id];

            bottoniColori.forEach(btn => btn.classList.remove("attivo"));
            button.classList.add("attivo");

            gomma.classList.remove("attivo");
        });
    });

    document.getElementById("cancella").addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    gomma.addEventListener("click", () => {
        isGomma = !isGomma;
        if (isGomma) {
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineWidth = 20;
            gomma.classList.add("attivo");

            bottoniColori.forEach(btn => btn.classList.remove("attivo"));
        } else {
            ctx.globalCompositeOperation = "source-over";
            ctx.lineWidth = 5;
            coloreattuale = "black";
            gomma.classList.remove("attivo");
        }
    });

    document.getElementById("salva").addEventListener("click", () => {
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        const nomeFile = prompt("Come vuoi nominare il disegno?");
        if (nomeFile) {
            link.download = nomeFile + ".png";
            link.click();
        }
    });
});

    