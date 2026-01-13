const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list')

menuToggle.addEventListener("click", (e) =>{
    e.stopPropagation()
    navList.classList.toggle("active")
    menuToggle.classList.toggle("active")

    const isOpen = navList.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
})

// Fecha o menu ao clicar fora
document.addEventListener("click", (e) =>{
    const ClickFora = navList.contains(e.target)
    const ClickBotao = menuToggle.contains(e.target)

    if (!ClickBotao && !ClickFora) {
        navList.classList.remove("active")
    }
})

//  Fecha o menu ao apertar o Esc
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape"){
        navList.classList.remove("active")
    }
})

// Fecha ao clicar nos links do Menu

navList.querySelectorAll("a").forEach(link =>{
    link.addEventListener("click", () =>{
        navList.classList.remove("active")
    })
})
