const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.querySelector(".sidebar");


menuBtn.addEventListener("click", function () {

    sidebar.classList.toggle("open");

});