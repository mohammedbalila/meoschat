function openSideBar() {
    let x = document.querySelector(".side-bar")
    x.style.display == 'none'
    document.querySelector(".side-bar").style.display = 'block';
    document.querySelector(".side-bar").style.width = '200px';
    document.querySelector(".side-bar").style.transition = 'all .5s ease-out';
    document.querySelector(".mario-chat").style.marginLeft = '200px'
    document.querySelector(".mario-chat").style.transition = 'all .5s ease-out';
}
function closeSideBar() {
    document.querySelector(".side-bar").style.display = 'none';
    document.querySelector(".side-bar").style.width = '0';
    document.querySelector(".mario-chat").style.marginLeft = 'auto'
}

function nightMode()
{

    document.body.style.backgroundColor = '#111111'
    document.getElementById('btn').style.backgroundColor = '#111111'
    document.getElementById('btn').setAttribute('class','btn-dark')
    document.getElementById('top').style.backgroundColor = '#ffffff'
    document.getElementById('icon').style.color = '#111111'
    document.getElementById('msg').style.backgroundColor = '#111111'
    document.getElementById('msg').style.color = '#ffffff'
    document.getElementById("message").style.backgroundColor = 'grey'
}
function lightMode()
{
    document.body.style.backgroundColor = '#ffffff'
    document.getElementById('btn').style.backgroundColor = '#575ed8'
    document.getElementById('btn').removeAttribute('class')
    document.getElementById('top').style.backgroundColor = '#111111'
    document.getElementById('icon').style.color = '#ffffff'
    document.getElementById('msg').style.backgroundColor = '#111111'
    document.getElementById('msg').style.color = '#111111'
    document.getElementById("message").style.backgroundColor = '#ffffff'

}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}