// this is just a utility script to add multiple card-templates from a seperate file to my index-template
// so that i can edit/style a single template affecting multiple cards on the screen
fetch("./card-template.html").then((response)=>{
    console.log(response);
    return response.text();
}).then((text)=>{
    console.log(text);
    document.querySelector("main").innerHTML = text + text + text + text + text + text;
})