// Setting Box Toggle
let settingBox = document.querySelector(".setting-box")
let toggleSettings = document.querySelector(".toggle-settings")
let gear = document.querySelector(".fa-gear")

toggleSettings.onclick = function() {
  gear.classList.toggle("fa-spin")
  settingBox.classList.toggle("open")
}

///////////////////////////////////////////////////////////////////////////////

// Changing the --main-color
let colorLis = document.querySelectorAll(".colors-list li")

colorLis.forEach(li => {
  li.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color)
    
    // Set color to the root
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color)

    // Set color to the local storage
    window.localStorage.setItem("color", e.target.dataset.color)


    // Remove class active
    activeHandling(e)

  })
})

// Local Storage
window.onload = function() {
  if (window.localStorage.getItem("color")) {
    // Add color on load
    document.documentElement.style.setProperty("--main-color", window.localStorage.getItem("color"))

    // Remove active class
    document.querySelectorAll(".colors-list li").forEach((element) => {
      element.classList.remove("active")

      // Add class active to the selected color
      if (element.dataset.color === window.localStorage.getItem("color")) {
        element.classList.add("active")
      }
    })
  }
}

///////////////////////////////////////////////////////////////////////////////

// Changing the background image
let landingPage = document.querySelector(".landing-page")
let imgsArray = ["00.jpg", "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"]

let backgroundOption = true;
let backgoundInterval;

// Randomize Function
function randomize() {
  if (backgroundOption === true) {
    backgoundInterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * imgsArray.length)
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNum]}")`
    }, 1000)
  } else {
    clearInterval(backgoundInterval)
  }
}

// Yes-No removing and adding active class
let yesNoBtns = document.querySelectorAll(".yes-no span")

yesNoBtns.forEach((span) => {
  span.addEventListener("click", ele => {
    
    // remove all active
    activeHandling(ele)

    // Activate Yes & No
    if (ele.target.dataset.background === "yes") {
      backgroundOption = true;
      randomize();
      window.localStorage.setItem("background", true)
      
    } else if (ele.target.dataset.background === "no") {
      backgroundOption = false;
      randomize();
      window.localStorage.setItem("background", false)
    }

    // Delete border from img
    sixPics.forEach(pic => {
      pic.style.border = "none"
    })
  })
})

///////////////////////////////

// Change background setting on load
window.onload = function() {
  
    if (window.localStorage.getItem("background") === "true"){
      backgroundOption = true
      document.querySelector(".option-box .yes").classList.add("active")
      randomize();
      
    } else if (window.localStorage.getItem("background") === "false") {
      backgroundOption = false
      document.querySelector(".option-box .no").classList.add("active")
      randomize();
    } else {
      let imgSrc = window.localStorage.getItem("background")
      landingPage.style.backgroundImage = `url("${imgSrc}")`
      document.querySelector(`.pics img[src='${imgSrc}']`).style.border = "3px solid var(--main-color)"
    }
  }

///////////////////////////////

// Choose specific background
let sixPics = document.querySelectorAll(".pics img")

sixPics.forEach(function(pic) {
  pic.addEventListener("click", function(ele) {
    // Change background image
    landingPage.style.backgroundImage = `url("${ele.target.src}")`
    
    // Delete border from imgs
    ele.target.parentElement.querySelectorAll("img").forEach(ele => {
      ele.style.border = "none"
    })

    // Set border the targeted image
    ele.target.style.border = "3px solid var(--main-color)"

    // Stop the interval
    backgroundOption = false;
    randomize();

    // Remove the active class from yes-no elements
    yesNoBtns.forEach((e) => {
      e.classList.remove("active")
    })

    // Remove true & false from locale storage
    if (window.localStorage.getItem("background")) {
          window.localStorage.removeItem("background")
          window.localStorage.setItem("background", ele.target.src)
    }

    // Change the main color based on the chosen pic
    if (ele.target.getAttribute("src") === "http://127.0.0.1:5500/Project/imgs/00.jpg" || "http://127.0.0.1:5500/Project/imgs/01.jpg") {
      document.documentElement.style.setProperty("--main-color", "#9DB4FF")
      
    }  if (ele.target.getAttribute("src") === "http://127.0.0.1:5500/Project/imgs/02.jpg") {
      document.documentElement.style.setProperty("--main-color", "#673147")
      
    }  if (ele.target.getAttribute("src") === "http://127.0.0.1:5500/Project/imgs/03.jpg") {
      document.documentElement.style.setProperty("--main-color", "#2E8B57")

    } if (ele.target.getAttribute("src") === "http://127.0.0.1:5500/Project/imgs/04.jpg") {
      document.documentElement.style.setProperty("--main-color", "#f4a460")

    } if (ele.target.getAttribute("src") === "http://127.0.0.1:5500/Project/imgs/05.jpg") {
      document.documentElement.style.setProperty("--main-color", "#FF6347")

    } 
    
  })  
})

//////////////////////////////////////////////////////////////////////////////

// PopUp Gallery
let galleryImgs = document.querySelectorAll(".gallery-images img")
galleryImgs.forEach(img => {
  img.addEventListener("click", ele => {
    // console.log(ele.target.src)

    let overlay = document.createElement("div")
    overlay.className = "popup-overlay"
    document.body.appendChild(overlay)

    let popupBox = document.createElement("div")
    popupBox.className = "popup-box"

    let popupImg = document.createElement("img")
    popupImg.src = ele.target.src

    let imgHeading = document.createElement("h3")
    imgHeading.className = "imgHeading"
    let imgHedingText = document.createTextNode(ele.target.alt)
    imgHeading.append(imgHedingText)

    let closeBtnContainer = document.createElement("div")
    closeBtnContainer.classList = "close-container"
    let closeBtn = document.createElement("div")
    closeBtn.className = "close-btn"
    let closeBtnText = document.createTextNode("X")
    closeBtn.append(closeBtnText)
    closeBtnContainer.appendChild(closeBtn)

    popupBox.appendChild(imgHeading)
    popupBox.appendChild(closeBtnContainer)
    popupBox.appendChild(popupImg)
    document.body.appendChild(popupBox)


    closeBtnContainer.addEventListener("click", e =>{
      overlay.remove()
      popupBox.remove()
    })

    overlay.addEventListener("click", e =>{
      e.target.remove()
      popupBox.remove()
    })
  })
})

//////////////////////////////////////////////////////////////////////////////

// Navigation
let links = document.querySelectorAll(".header-area .links a")
let bullets = document.querySelectorAll(".bullets div")

function scrollToSection(elements) {
  elements.forEach(element => {
  element.addEventListener("click", (ele) => {
    ele.preventDefault()
    document.querySelector(ele.target.dataset.section).scrollIntoView(
      {behavior: "smooth", block: "center"})
    })
  })
}
scrollToSection(links)
scrollToSection(bullets)
//////////////////////////////////////////////////////////////////////////////

// Active Handling Function
function activeHandling(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach(
    ele => {ele.classList.remove("active")})

    // Add it to the target
    ev.target.classList.add("active")
}

//////////////////////////////////////////////////////////////////////////////

// Show or Hide Bullets

let bulletsContainer = document.querySelector(".bullets")
let showHide = document.querySelectorAll(".show-hide span")

showHide.forEach(btn => {
  btn.addEventListener("click", ele => {
    activeHandling(ele)

    if (btn.dataset.bullet === "show") {
      bulletsContainer.style.display = "flex"
    } else if (btn.dataset.bullet === "hide") {
      bulletsContainer.style.display = "none"
    }
  })
  
})

//////////////////////////////////////////////////////////////////////////////

// Reseting all settings
let resetBtn = document.querySelector(".option-box .reset")
resetBtn.addEventListener("click", ele => {
  
  document.documentElement.style.setProperty("--main-color", "#9DB4FF")
  
  if (window.localStorage.getItem("background")) {
    window.localStorage.setItem("background", "true")
    document.querySelector(".yes-no .yes").className = 'active'
    document.querySelector(".yes-no .no").classList.remove('active')
  }
  window.location.reload()
})

//////////////////////////////////////////////////////////////////////////////

