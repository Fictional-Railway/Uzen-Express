// JSに関しては知識があまりないのでAIを使用しているところがございます。予めご了承ください。

document.addEventListener('DOMContentLoaded', function() {

    const navLinks = document.querySelectorAll('.nav-list a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const modal = document.getElementById("modal");
    const imgTrigger = document.querySelector(".map-container img");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const span = document.getElementsByClassName("close")[0];

    if(imgTrigger) {
        imgTrigger.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src; 
            captionText.innerHTML = "拡大表示中";
            captionText.style.color = "#fff";
            captionText.style.textAlign = "center";
        }
    }

    span.onclick = function() { 
        modal.style.display = "none";
    }

    modal.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});