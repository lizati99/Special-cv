/* Start functions */
function getElement(nameClass) {
    return document.querySelector(`${nameClass}`);
}
function getAllElement(nameClass) {
    return document.querySelectorAll(`${nameClass}`);
}
function setProp(key,value) {
    document.documentElement.style.setProperty(
        `${key}`,
        value
        );
}
/* End functions */
/* Start Overlay Effect */
const links=getElement(".links");
const overlayEffect=getElement(".overlay-effect");
const box=getAllElement(".box");
links.addEventListener('click',link=>{
    const arrayLinks=["about-link active","resume-link","portofolio-link","contact-link"];
    const arraySelectors=["about","resume","portofolio","contact"];
    let i=arrayLinks.indexOf(link.target.className);
    if(i!==-1){
        overlayEffect.style.animation="openOverlayAnimee 1s 1";
        getElement(`.${arraySelectors[i]}`).classList.add("active");
    }
});
box.forEach(b=>{
    b.addEventListener('click',item=>{
        if(item.target.className==="close-icon"){
            overlayEffect.style.animation="closeOverlayAnimee 1s 1";
            b.classList.remove("active");
        }
    });
});
/* End Overlay Effect */
/* Start toggle menu */
const toggleMenu=getElement(".toggle-menu");
const closeMenu=getElement(".close-link");
const overlay=getElement(".overlay");
toggleMenu.addEventListener('click',item=>{
    links.classList.add("active");
    overlay.classList.add("active");
    toggleMenu.style.zIndex=-1;
});
links.addEventListener('click',item=>{
    if(item.target.className=="close-link" || item.target.className=="fa-solid fa-angle-left"){
        links.classList.remove("active");
        overlay.classList.remove("active");
        toggleMenu.style.zIndex=1;
    }
});
overlay.addEventListener('click',item=>{
    links.classList.remove("active");
    overlay.classList.remove("active");
    toggleMenu.style.zIndex=1;
});
/* End toggle menu */
/* Start skill progress */
const spanPc=getAllElement(".range span");
spanPc.forEach(span=>{
    span.style.width=`${span.dataset.progress}`;
});
/* End skill progress */
/* Start Settings */
const toggle=getElement(".toggle-settings .fa-gear");
const settings=getElement(".settings");
const logoIcon=getElement(".logo img");
const colorList=getAllElement(".settings li");
const shortcut=getElement("[rel=icon]");
if(localStorage.getItem("color")){
    setProp(
        "--color-secondary",
        localStorage.getItem("color")
    );
}
if(localStorage.getItem("logo")){
    logoIcon.src=localStorage.getItem("logo");
}
if(localStorage.getItem("shortcut")){
    shortcut.href=localStorage.getItem("shortcut");
}
toggle.addEventListener('click',tog=>{
    settings.classList.toggle("active");
});
colorList.forEach(color=>{
    color.style.backgroundColor=color.dataset.color;
});
settings.addEventListener('click',option=>{
    //change logo
    logoIcon.src=`img/img-core/logo_${option.target.dataset.logo}.png`; 
    //change root variable
    setProp(
        "--color-secondary",
        option.target.dataset.color
    );
    //change shortcut
    shortcut.href=`img/img-core/icons/icon_${option.target.dataset.logo}.png`;
    // stock changing in localstorage
    localStorage.setItem(
        "color",
        option.target.dataset.color);
    localStorage.setItem(
        "logo",
        `img/img-core/logo_${option.target.dataset.logo}.png`
    );
    localStorage.setItem(
        "shortcut",
        `img/img-core/icons/icon_${option.target.dataset.logo}.png`
    );
});
/* End Settings */
/* Start Move Work Image */ 
const works=getElement(".works");
const popupImg=getElement(".popup-img");
const popup=popupImg.parentElement.parentElement;
works.addEventListener('click',work=>{
    if(work.target.className==="work-pic"){
        popup.classList.add("active");
        popupImg.style.backgroundImage=`url(${work.target.getAttribute("src")})`;
    }
});
//close popup
popup.addEventListener('click',item=>{
    if(item.target.className!=="popup" && item.target.className!=="popup-img" && item.target.className!=="popup-title"){
        popup.classList.remove("active");
    }
});
//move down image
popupImg.addEventListener("mouseover",eo=>{
    eo.target.style.animation="moveDownOver 6s 1";
    setTimeout(() => {
        eo.target.style.backgroundPosition="bottom";
    }, 4000);
});
popupImg.addEventListener("mouseout",eo=>{
    eo.target.style.animation="moveDownOut 3s 1";
    setTimeout(() => {
        eo.target.style.backgroundPosition="top";
    }, 2000);
});
/* End Move Work Image */ 
/* Start Contact*/
const nvMsg=getElement(".nvMessage a");
const formContact=getElement("form");
nvMsg.addEventListener('click',btn=>{
    btn.target.parentElement.classList.remove("active");
    formContact.classList.add("active");

});
/* End Contact*/
