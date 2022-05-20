const myName = document.getElementById("myName");

myName.addEventListener("mouseover", function() {
    myName.style.color = "red";
    setTimeout(() => {
       myName.style.color = ""; 
    }, 1000);
});

// to assign info on click behavior

const info1 = document.getElementById("info_1");
const detail1 = document.getElementById("detail_1");
const content = document.getElementsByClassName("hide")
info1.addEventListener("click", function() {
    detail1.style.width = "100%";
    detail1.style.opacity = "1";
    setTimeout(function() {
        for (let x = 0; x <= content.length - 1; x++) {
            setTimeout(function() {
                content[x].style.opacity = "1";
            }, 1000 * x);
        }
    }, 2000);
});