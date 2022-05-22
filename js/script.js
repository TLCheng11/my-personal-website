const myName = document.getElementById("myName");

myName.addEventListener("mouseover", function() {
    myName.style.color = "red";
    setTimeout(() => {
       myName.style.color = ""; 
    }, 1000);
});

// to assign info click behavior

const divCount = document.querySelectorAll("#detail div").length;
let infoList = [];
let detailList = [];
for (let i = 1; i <= divCount; i++) {
    let info = `info_${i}`;
    let detail = `detail_${i}`;
    infoList.push(document.getElementById(info));
    detailList.push(document.getElementById(detail));
}

function reset() {
    for (let i = 0; i < divCount; i++) {
        detailList[i].transition = "height 0s, width 0s";
        detailList[i].style.width = "0";
        detailList[i].style.height = "0";
        detailList[i].style.opacity = "0";
    }
    let content = document.getElementsByClassName("hide");
    for (let i = 0; i < content.length; i++) {
        content[i].style.transition = "opacity 0s";
        content[i].style.opacity = "0";
    }
}

for (let i = 0; i < divCount; i++) {
    infoList[i].addEventListener("click", function() {
        reset();
        setTimeout(function() {
            let detail = `#detail_${i + 1} .hide`;
            let content = document.querySelectorAll(detail)
            detailList[i].style.transition = "height 3s, width 3s";
            detailList[i].style.width = "100%";
            detailList[i].style.height = "550px";
            detailList[i].style.opacity = "1";
            setTimeout(function() {
                for (let x = 0; x <= content.length - 1; x++) {
                    setTimeout(function() {
                        content[x].style.transition = "opacity 3s";
                        content[x].style.opacity = "1";
                    }, 1000 * x);
                }
            }, 2000);
        }, 500);
    });
}
    