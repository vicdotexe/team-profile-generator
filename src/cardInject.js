fetch("./card-template.html").then((response)=>{
    console.log(response);
    return response.text();
}).then((text)=>{
    console.log(text);
    document.querySelector("main").innerHTML = text + text + text + text + text + text;
})