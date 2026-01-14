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

const track = document.getElementById("carrocel-track"); // Verifique se no HTML é caroucel ou carousel
const slides = Array.from(track.children); // Mudado para plural 'slides'
const dotsContainer = document.querySelector(".carrocel-dots"); // Corrigido 'dotsContianer'
const prev = document.querySelector(".carrocel-control.prev");
const next = document.querySelector(".carrocel-control.next");

let index = 1;

// 2. Clones
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
track.append(firstClone);
track.prepend(lastClone);

const allSlides = Array.from(track.children);
const getWidth = () => track.parentElement.offsetWidth;

// Posicionamento inicial
track.style.transform = `translateX(-${getWidth()}px)`;

// 3. Criar bullets (Corrigido para usar dotsContainer)
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", `Ir para card ${i + 1}`);
  if (i === 0) dot.setAttribute("aria-current", "true");

  dot.addEventListener("click", () => {
    index = i + 1;
    move();
  });

  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

function updateA11y() {
  allSlides.forEach(s => s.setAttribute("aria-hidden", "true"));

  let real = index - 1;
  if (real === slides.length) real = 0;
  if (real < 0) real = slides.length - 1;

  // Proteção para garantir que o índice existe antes de acessar
  if (slides[real]) slides[real].setAttribute("aria-hidden", "false");
  
  dots.forEach(dot => dot.removeAttribute("aria-current"));
  if (dots[real]) dots[real].setAttribute("aria-current", "true");
}

function move() {
  track.style.transition = "0.5s";
  track.style.transform = `translateX(-${getWidth() * index}px)`;
  updateA11y();
}

// Setas
prev.addEventListener("click", () => {
  index--;
  move();
});

next.addEventListener("click", () => {
  index++;
  move();
});

// Teclado
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") { index++; move(); }
  if (e.key === "ArrowLeft") { index--; move(); }
});

// Loop infinito
track.addEventListener("transitionend", () => {
  if (index === allSlides.length - 1) {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(-${getWidth()}px)`;
  }

  if (index === 0) {
    track.style.transition = "none";
    index = allSlides.length - 2;
    track.style.transform = `translateX(-${getWidth() * index}px)`;
  }
});