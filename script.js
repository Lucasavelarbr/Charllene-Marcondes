const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list')
const overlay = document.getElementById("overlay")

const openMenu = () =>{
    navList.classList.add("active")
    menuToggle.classList.add("active")
    overlay.classList.add("active")
    menuToggle.setAttribute("aria-expanded", "true")
}

const closeMenu = () =>{
    navList.classList.remove("active")
    menuToggle.classList.remove("active")
    overlay.classList.remove("active")
    menuToggle.setAttribute("aria-expanded", "true")
}

// click do botão Menu

menuToggle.addEventListener("click", (e) =>{
    e.stopPropagation()

    const isOpen = navList.classList.contains("active")

    if(isOpen){
        closeMenu()
    }else{
        openMenu()
    }
}) 

// fechar com o ESC

document.addEventListener("keydown", (e) =>{
    if(e.key === "Escape"){
        closeMenu()
    }
})

// Clicar fora

document.addEventListener("click", (e) =>{
    const ClicknoMenu = navList.contains(e.targget)
    const ClicknoBotao = menuToggle.contains(e.targget)

    if(!ClicknoBotao && !ClicknoMenu){
        closeMenu()
    }
})

// clique nos links

document.querySelectorAll("a").forEach(link =>{
    link.addEventListener("click", () =>{
        closeMenu()
    })
})

// overlay

overlay.addEventListener("click", () =>{
    closeMenu()
})