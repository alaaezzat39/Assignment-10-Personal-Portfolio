
const modeToggle = document.querySelector("#theme-toggle-button");
const rootElement = document.documentElement;


const openSidebarButton = document.querySelector("#settings-toggle");
const sidebar = document.querySelector("#settings-sidebar");


const closeSidebarButton = document.querySelector("#close-settings");


const fontOptions = document.querySelectorAll(".font-option");


const colorOptions = document.querySelector("#theme-colors-grid");


const resetBtn = document.querySelector("#reset-settings")



const sectionsElements = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-links a")


const carousel = document.querySelector("#testimonials-carousel");
const cards = document.querySelectorAll(".testimonial-card");
const next = document.querySelector("#next-testimonial");
const prev = document.querySelector("#prev-testimonial");
const dots = document.querySelectorAll(".carousel-indicator");




const navFilterContainer = document.querySelector("#portfolio-filters");
const portfolioCards = document.querySelectorAll(".portfolio-item")



function toggleTheme() {
    rootElement.classList.toggle("dark");
    localStorage.setItem("darkMode", rootElement.classList.contains("dark"));
}


function openSidebar() {
    sidebar.classList.remove("translate-x-full");
    openSidebarButton.style.setProperty("right", "20rem");
    sidebar.setAttribute("aria-hidden", "false");

}

function closeSidebar() {
    sidebar.classList.add("translate-x-full");
    openSidebarButton.style.setProperty("right", "0");
    sidebar.setAttribute("aria-hidden", "true");
}


function changeFont(e) {
    const dataOption = e.target.closest("button.font-option");
    if (dataOption) {

        const fontValue = dataOption.dataset.font;
        document.body.classList.remove(`font-alexandria`, `font-tajawal`, `font-cairo`);
        document.body.classList.add(`font-${fontValue}`);
        localStorage.setItem("font", fontValue);



  
        for (let i = 0; i < fontOptions.length; i++) {

            fontOptions[i].classList.remove("active", "border-primary", "bg-slate-50", "dark:bg-slate-800");
            fontOptions[i].classList.add("border-slate-200", "dark:border-slate-700");

            if (fontOptions[i] === document.querySelector(`button[data-font="${fontValue}"]`)) {
                fontOptions[i].classList.remove("border-slate-200", "dark:border-slate-700");
                fontOptions[i].classList.add("active", "border-primary", "bg-slate-50", "dark:bg-slate-800");
            }


        }
    }
}


function changeThemeColor(e) {

    const colorOption = e.target.closest("button");
    if (colorOption) {
        const primaryColor = colorOption.dataset.primary;
        const secondaryColor = colorOption.dataset.secondary;

        rootElement.style.setProperty("--color-primary", primaryColor);
        rootElement.style.setProperty("--color-secondary", secondaryColor);
        rootElement.style.setProperty("--color-accent", secondaryColor);
        localStorage.setItem("primaryColor", primaryColor);
localStorage.setItem("secondaryColor", secondaryColor);


    for (let i = 0; i < colorOptions.children.length; i++) {
            colorOptions.children[i].classList.remove("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");

            if (colorOptions.children[i] === colorOption) {

                colorOptions.children[i].classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
            }

        }
        
    }
    
   

}


function resetTheme(){
    localStorage.removeItem("darkMode");
localStorage.removeItem("font");
localStorage.removeItem("primaryColor");
localStorage.removeItem("secondaryColor");
   closeSidebarButton.click()
   fontOptions[0].click();
   colorOptions.children[0].click()
   
}




if (localStorage.getItem("darkMode") === "true") {
    rootElement.classList.add("dark");
}

const savedFont = localStorage.getItem("font");
if (savedFont) {
    document.body.classList.remove(
        "font-alexandria", "font-tajawal", "font-cairo"
    );
    document.body.classList.add(`font-${savedFont}`);
}

const savedPrimary = localStorage.getItem("primaryColor");
const savedSecondary = localStorage.getItem("secondaryColor");

if (savedPrimary && savedSecondary) {
    rootElement.style.setProperty("--color-primary", savedPrimary);
    rootElement.style.setProperty("--color-secondary", savedSecondary);
    rootElement.style.setProperty("--color-accent", savedSecondary);
}

function scrollSpy(){
   const scrollPosition = window.scrollY;//0
   
   let currentSectionId ="";
  
   for(let i = 0 ; i < sectionsElements.length ; i ++){
    let sectionTop = sectionsElements[i].offsetTop; 
    let sectionHeight =sectionsElements[i].offsetHeight;

    let sectionBottom = sectionTop + sectionHeight;

    if(scrollPosition >= sectionTop && scrollPosition < sectionBottom ){
        currentSectionId = sectionsElements[i].getAttribute("id"); 

    }
   }
   
   
   
   for(let i = 0 ; i< navLinks.length ; i++){
    navLinks[i].classList.remove("active");
    if(`#${currentSectionId}` == navLinks[i].getAttribute("href")){
        navLinks[i].classList.add("active");
    }
   
   }

 
   
    
}

//filter cards
function filterPortfolio(e){
    const clickedFilter = e.target.closest("button");

    if(clickedFilter){

        const clickedValue = clickedFilter.dataset.filter;

        for(let i = 0 ; i< portfolioCards.length ;i++){

            let cardCategory = portfolioCards[i].dataset.category;
            console.log(cardCategory);
            console.log(clickedValue);

            portfolioCards[i].style.opacity = 0;
            portfolioCards[i].style.transform = "scale(0)";

            if(cardCategory === clickedValue || clickedValue == "all" ){
                portfolioCards[i].classList.remove("hidden")
                setTimeout(function(){
                    portfolioCards[i].style.opacity = 1;
                portfolioCards[i].style.transform = "scale(1)";

                },50)
                

            }
            else{

                portfolioCards[i].classList.add("hidden")
            
            }

        }


        
        for(let i = 0 ; i<navFilterContainer.children.length ; i++){
            navFilterContainer.children[i].classList.remove("hover:shadow-lg", "hover:shadow-primary/50", "active", "bg-linear-to-r", "from-primary" ,"to-secondary" ,"text-white", "shadow-lg", "shadow-primary/50" )
            navFilterContainer.children[i].classList.add( "border","border-slate-300" ,"dark:border-slate-700" , "dark:bg-slate-800")


            if(navFilterContainer.children[i] ==clickedFilter ){
                navFilterContainer.children[i].classList.add("hover:shadow-lg", "hover:shadow-primary/50", "active", "bg-linear-to-r", "from-primary" ,"to-secondary" ,"text-white", "shadow-lg", "shadow-primary/50")
                navFilterContainer.children[i].classList.remove( "border","border-slate-300" ,"dark:border-slate-700" ,"dark:bg-slate-800")
            }
        }

    }


    

}


scrollSpy();


if (modeToggle)
    modeToggle.addEventListener("click", toggleTheme);
if (openSidebarButton)
    openSidebarButton.addEventListener("click", openSidebar);
if (closeSidebarButton)
    closeSidebarButton.addEventListener("click", closeSidebar);

if (fontOptions)
    for (let i = 0; i < fontOptions.length; i++) {
        fontOptions[i].addEventListener("click", function (e) {
            changeFont(e);
        });
    }

if (colorOptions)
    colorOptions.addEventListener("click", function (e) {
        changeThemeColor(e);
    })

if(resetBtn)
    resetBtn.addEventListener("click", resetTheme)
if(navFilterContainer)
    navFilterContainer.addEventListener("click" , (e)=> filterPortfolio(e))



window.addEventListener("scroll", scrollSpy)




let index = 0;

function showTestimonials() {
    const cardWidth = cards[0].offsetWidth;
    const visible = window.innerWidth >= 1024 ? 3 :
                    window.innerWidth >= 640 ? 2 : 1;

    const max = Math.max(0, cards.length - visible);
    index = Math.min(index, max);

    carousel.style.transform = `translateX(${index * cardWidth}px)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle("bg-accent", i === index);
        dot.classList.toggle("bg-slate-400", i !== index);
    });
}

next.addEventListener("click", () => {
    const visible = window.innerWidth >= 1024 ? 3 :
                    window.innerWidth >= 640 ? 2 : 1;
    const max = Math.max(0, cards.length - visible);
    index = index >= max ? 0 : index + 1;
    showTestimonials();
});

prev.addEventListener("click", () => {
    const visible = window.innerWidth >= 1024 ? 3 :
                    window.innerWidth >= 640 ? 2 : 1;
    const max = Math.max(0, cards.length - visible);
    index = index <= 0 ? max : index - 1;
    showTestimonials();
});

dots.forEach((dot) => {
    dot.addEventListener("click", () => {
        index = Number(dot.dataset.index);
        showTestimonials();
    });
});

window.addEventListener("resize", showTestimonials);
showTestimonials();