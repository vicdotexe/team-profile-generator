const Engineer = require('../lib/Engineer');
const Manager = require('../lib/Manager');
const Intern = require('../lib/Intern');

const buildHtml = (team)=>{
    const fs = require('fs');
    const cardTemp = fs.readFileSync("./src/card-template.html", "utf-8");
    const temp = fs.readFileSync("./src/index-template.html", "utf-8");

    const generateUnique = (employee) =>{
        if (employee instanceof Manager){
            //console.log(employee.getOfficeNumber());
            return `Office number: ${employee.getOfficeNumber()}`;}
        if (employee instanceof Engineer){
            return `GitHub: <a href="https://www.github.com/${employee.getGithub()}">${employee.getGithub()}</a>`;}
        if (employee instanceof Intern){
            return `School: ${employee.getSchool()}`;}
    };

    const makeCard = (employee) =>{
        return cardTemp.replace(/name/g, employee.getName())
        .replace(/role/g, employee.getRole())
        .replace(/id/g, employee.getId())
        .replace(/email/g, employee.getEmail())
        .replace(/unique/g, generateUnique(employee));
    };

    let cards = "";
    team.forEach((employee)=>{cards += makeCard(employee)});

    return temp.replace(`<script src="./cardInject.js"></script>`, cards);
}

module.exports = buildHtml;