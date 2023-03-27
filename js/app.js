let arrow = document.getElementById('backUp');

window.onscroll = function() {showBtn()};

function showBtn() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    arrow.style.display = "block";
  } else {
    arrow.style.display = "none";
  }
}

const goToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
};

arrow.addEventListener("click", goToTop);