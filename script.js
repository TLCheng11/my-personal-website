const myName = document.getElementById("myName");

myName.addEventListener("mouseover", function() {
    myName.style.color = "red";
    setTimeout(() => {
       myName.style.color = ""; 
    }, 1000);
});