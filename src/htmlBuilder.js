const Engineer = require('../lib/Engineer');
const Manager = require('../lib/Manager');
const Intern = require('../lib/Intern');

const buildHtml = (team)=>{
    const fs = require('fs');
    const cardTemp = fs.readFileSync("./src/card-template.html", "utf-8"); //grab the html from the card-template
    const temp = fs.readFileSync("./src/index-template.html", "utf-8"); //grab the html from profile-template

    /** Generates the unique html that is dependant on the role of the employee */
    const generateUnique = (employee) =>{
        if (employee instanceof Manager){
            return `Office number: ${employee.getOfficeNumber()}`;}
        if (employee instanceof Engineer){
            return `GitHub: <a href="https://www.github.com/${employee.getGithub()}" target="_blank">${employee.getGithub()}</a>`;}
        if (employee instanceof Intern){
            return `School: ${employee.getSchool()}`;}
    };

    /** Make a copy of the card-template html and replace all the temporary values with employee data */
    const makeCard = (employee) =>{
        return cardTemp.replace(/v~name/g, employee.getName())
        .replace(/v~role/g, employee.getRole())
        .replace(/v~id/g, employee.getId())
        .replace(/v~email/g, employee.getEmail())
        .replace(/v~unique/g, generateUnique(employee));
    };

    // loop through the team and add all the card html together
    let cards = "";
    team.forEach((employee)=>{cards += makeCard(employee)});

    // return a copy of the index-template, replacing the temporary development script
    // with all the generated card html from all the employees
    return temp.replace(`<script src="./cardInject.js"></script>`, cards);
}

module.exports = buildHtml;