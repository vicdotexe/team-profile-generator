const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const fs = require('fs');
const inquirer = require('inquirer');
const buildHtml = require('./src/htmlBuilder');

const team = [];

const queryLeader = async()=>{
    const {name, id, email, role} = await inquirer.prompt([
        {type:"input", name:"name", message:"Employee's Name:"},
        {type:"input", name:"id", message:"Employee's ID:"},
        {type:"input", name:"email", message:"Employee's Email:"},
        {type:"list", name:"role", message:"Emplyee's Role:", choices:["Manager", "Engineer", "Intern"]}
    ]);

    let obj = {};
    switch(role){
        case "Manager": 
        const {office} = await inquirer.prompt([{type:"input", name:"office", message:`${name}'s office number:`}]);
        console.log(office);
        obj = new Manager(name, id, email, office);
        break;
        case "Engineer": 
        const {github} = await inquirer.prompt([{type:"input", name:"github", message:`${name}'s github username:`}]);
        obj = new Engineer(name, id, email, github);
        break;
        case "Intern": 
        const {school} = await inquirer.prompt([{type:"input", name:"school", message:`${name}'s school:`}]);
        obj = new Intern(name, id, email, school);
        break;
    };
    team.push(obj);
    const {more} = await inquirer.prompt([{type:"confirm", name:"more", message:"Add another employee?",default:true}]);
    if (more){
        queryLeader();
    }else{
        fs.writeFile('./output/team-profiles.html', buildHtml(team), ()=>{});
    }
}

queryLeader();