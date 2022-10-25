const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const fs = require('fs');
const inquirer = require('inquirer');
const buildHtml = require('./src/htmlBuilder');

const team = [];

const managerQs = [
    {type:"input", name:"name", message:"Manager's Name:"},
    {type:"input", name:"id", message:"Manager's ID:"},
    {type:"input", name:"email", message:"Manager's Email:"}
]

const employeeQs = [
    {type:"input", name:"name", message:"Employee's Name:"},
    {type:"input", name:"id", message:"Employee's ID:"},
    {type:"input", name:"email", message:"Employee's Email:"},
    {type:"list", name:"role", message:"Emplyee's Role:", choices:["Engineer", "Intern"]}
]

const queryLeader = async()=>{
    //ask the basic questions
    const {name, id, email, role} = await inquirer.prompt(team.length == 0 ? managerQs : employeeQs);

    let obj = {};
    
    //ask a unique question and instantiate employee, depending on the role assigned, defaulting to manager if role was undefined
    if (!role){
        const {office} = await inquirer.prompt([{type:"input", name:"office", message:`${name}'s office number:`}]);
        obj = new Manager(name, id, email, office);
    }else if (role == "Engineer"){
        const {github} = await inquirer.prompt([{type:"input", name:"github", message:`${name}'s github username:`}]);
        obj = new Engineer(name, id, email, github);
    }else if (role == "Intern"){
        const {school} = await inquirer.prompt([{type:"input", name:"school", message:`${name}'s school:`}]);
        obj = new Intern(name, id, email, school);
    }

    team.push(obj); // add employee to the team

    // ask if they want to add another
    const {more} = await inquirer.prompt([{type:"confirm", name:"more", message:"Add another employee?",default:true}]);

    //repeat if they do, otherwise write the html
    if (more){
        queryLeader();
    }else{
        fs.writeFile('./output/team.html', buildHtml(team), ()=>{});
    }
}

//start asking
queryLeader();