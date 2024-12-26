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
function usernameValidate() {
    if(/^[a-z0-9_\.]{6,}$/.test(username.value)){
        username.style.border="solid 1px green";
    }else{
        username.style.border="solid 1px red";
    }
}
function emailValidate() { 
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
        email.style.border="solid 1px green";
    }
    else{
        email.style.border="solid 1px red";
    }
}
function subjectValidate() {
    if(/^[a-zA-Z0-9_\. ]{1,}$/.test(subject.value)){
        subject.style.border="solid 1px green";
    }else{
        subject.style.border="solid 1px red";
    }
}
function msgValidate() {
    if(/^[a-zA-Z0-9_\. /()]{1,}$/.test(text.value)){
        text.style.border="solid 1px green";
    }else{
        text.style.border="solid 1px red";
    }
}
function fieldValidate(field,regex) {
    field.addEventListener('keyup',item=>{
        regex.test(field.value) 
        ? field.style.border="solid 1px green"
        : field.style.border="solid 1px red";
    });
}
/* End functions */
/* Start Overlay Effect And Show Boxs*/
const links=getElement(".links");
const overlayEffect=getElement(".overlay-effect");
const box=getAllElement(".box");
links.addEventListener('click', link =>{
    const arrayLinks=["about-link active","resume-link","portofolio-link","contact-link"];
    const arraySelectors=["about","resume","portofolio","contact"];
    let i=arrayLinks.indexOf(link.target.className);
    if(i!==-1){
        overlayEffect.style.animation="openOverlayAnimee 1s 1";
        getElement(`.${arraySelectors[i]}`).classList.add("active");
        document.body.style.overflowY="auto";
    }
});
box.forEach(b=>{
    b.addEventListener('click',item=>{
        if(item.target.className==="close-icon"){
            overlayEffect.style.animation="closeOverlayAnimee 1s 1";
            b.classList.remove("active");
            document.body.style.overflow="hidden";
        }
    });
});
/* End Overlay Effect And Show Boxs*/
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
const logoLink=getElement(".logo-link img");
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
if(localStorage.getItem("logoLink")){
    logoLink.src=localStorage.getItem("logoLink");
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
    logoLink.src=`img/img-core/icons/icon_${option.target.dataset.logo}.png`;
    // stock changing in localstorage
    localStorage.setItem(
        "color",
        option.target.dataset.color
    );
    console.log(logoLink);
    localStorage.setItem(
        "logo",
        `img/img-core/logo_${option.target.dataset.logo}.png`
    );
    localStorage.setItem(
        "shortcut",
        `img/img-core/icons/icon_${option.target.dataset.logo}.png`
    );
    localStorage.setItem(
        "logoLink",
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
    eo.target.style.animation="moveDownOver 13s 1";
    setTimeout(() => {
        eo.target.style.backgroundPosition="bottom";
    }, 4000);
});
popupImg.addEventListener("mouseout",eo=>{
    eo.target.style.animation="moveDownOut 5s 1";
    setTimeout(() => {
        eo.target.style.backgroundPosition="top";
    }, 2000);
});
/* End Move Work Image */ 
/* Start work filter */
let workFilter = getAllElement(".pagination li");
const existingWorks= works.querySelectorAll(".work");
workFilter.forEach(filter => {
    filter.addEventListener("click", () =>{
        workFilter.forEach(item => {
            item.classList.remove("active");
        });
        filter.classList.add("active");
        const category = filter.dataset.category;
        console.log(existingWorks);
        existingWorks.forEach(work => {
            if(category=="all")
                work.style.display="block";
            else if(work.dataset.work != category)
                work.style.display="none"; 
            else
                work.style.display="block";

        });
    });
});
console.log(workFilter);
/* /End work filter */
/* Start Contact*/
const nvMsg=getElement(".nvMessage a");
const formContact=getElement("form");
nvMsg.addEventListener('click',btn=>{
    btn.preventDefault();
    btn.target.parentElement.classList.remove("active");
    formContact.classList.add("active");
});
/* End Contact*/
/* Start Form Validate */

const sendMsg=getElement(".sendMessage");
let username=getElement("#name");
let email=getElement("#email");
let subject=getElement("#subject");
let text=getElement("#text");
let err=getElement(".errors");
const fieldsArray=[username,email,subject,text];
const regexArray=[
    /^[a-z0-9_\.]{6,}$/,
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    /^[a-zA-Z0-9_\. ]{1,}$/,
    /^[a-zA-Z0-9_\. /()]{1,}$/
];
// for (const index in fieldsArray) {
//     if (fieldsArray.hasOwnProperty.call(fieldsArray, index)) {
//         fieldValidate(fieldsArray[index],regexArray[index]);
//     }
// }

formContact.addEventListener('submit', eo => {
    let messages=[];
    if(username.value==='' || email.value==='' || subject.value==='' || text.value===''){
        messages.push("All fields is required.");
    }else{
        for (const i in fieldsArray) {
            fieldsArray[i].style.border="1px solid green";
        }
        if(/^[a-z0-9_\.]{6,}$/.test(username.value)==false){
            username.style.border="1px solid red";
            messages.push(username);
        }
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)==false){
            email.style.border="1px solid red";
            messages.push(email);
        }
        if(/^[a-zA-Z0-9_\. ]{1,}$/.test(subject.value)==false){
            subject.style.border="1px solid red";
            messages.push(subject);
        }
        if(/^[a-zA-Z0-9_\. /()]{1,}$/.test(text.value)==false){
            text.style.border="1px solid red";
            messages.push(text);
        }
    }
    if(messages.length>0){
        eo.preventDefault();
    }else{
        formAjax(username.value,email.value,subject.value,text.value);
    }
});
/* End Form Validate */
// /* Start Ajax in form */
// function formAjax(un,e,s,m) {
//     // Creating the XMLHttpRequest object
//     var request = new XMLHttpRequest();
//     const urlData=`name=${un}&email=${e}&subject=${s}&message`;
//     // Instantiating the request object
//     request.open("POST", "message.php?fname=John&lname=Clark");

//     // Defining event listener for readystatechange event
//     request.onreadystatechange = function() {
//         // Check if the request is compete and was successful
//         if(this.readyState === 4 && this.status === 200) {
//             // Inserting the response from server into an HTML element
//             document.getElementById("result").innerHTML = this.responseText;
//         }
//     };

//     // Sending the request to the server
//     request.send();
// }
/* End Ajax in form */
