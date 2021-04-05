/*
    Alan Beals 
    Assignment 3
    2021-04-05
*/

var errors = ''; // string
var emptyRegEx = /^$/; // regex checks if blank
var anythingRegEx = /^.+$/; //regex checks if there is anything
var positiveNumRegEx = /^[1-9][0-9]*$/; 
var FormId = ["firstName", "lastName", "address", "city", "province", "postcode", "phone", "email", "make", "model", "year"] // holds name of each id element except lists
var formDataArr = []; //holds the class data for each element


// displays data 
function DisplayData()
{
    var MyOutput = ""; //holds output for form
    var make = "", model = "", year = "";
    for(let i = 0; i < formDataArr.length; i++)
    {
        if(formDataArr[i].id == "make"){
            make = formDataArr[i].value;
        }else if(formDataArr[i].id == "model"){
            model = formDataArr[i].value;
        }else if(formDataArr[i].id == "year"){
            year = formDataArr[i].value;
        }
        MyOutput += `${formDataArr[i].getInfo()}<br>`;
    }

    localStorage.setItem(make + "," + model + "," + year, MyOutput);

    MyOutput += `<a href="http://localhost/A3/pages/index.html" class="button">Go Home</button>`;
   return MyOutput;
    
}

//validates input
function Validate()
{
    
    errors = ''; // holds error msgs 

    // creates class and validates for each of the elements
    for(let i = 0; i < FormId.length; i++)
    {
        if(document.getElementById(FormId[i]).className == "Text")// if its text sends text regex
        {
            formDataArr[i] = new FormData (FormId[i], anythingRegEx);
        }
        else // otherwise sends num regex
        {
            formDataArr[i] = new FormData (FormId[i], positiveNumRegEx);
        }
        
        // validates all elements an separatly the custom regex elements
        switch(document.getElementById(FormId[i]).id)
        {
            case "phone":
                formDataArr[i].CheckMyData(/^[\d]{3}\-[\d]{3}\-[\d]{4}$/, `phone number is required in form xxx-xxx-xxxx <br>`);
                
                break;
            case "postcode":
                formDataArr[i].CheckMyData(/^\w\d\w\s\d\w\d$/, `Post code must be in form xxx xxx`);
                
                break;
            default:
                formDataArr[i].Check();
                break;
        }
    }

    //if there are errors output otherwise shows the data
    if(errors)
    {
        document.getElementById("NewForm").innerHTML = errors;
    }
    else
    {
        document.getElementById("NewForm").innerHTML = DisplayData();
        myForm.remove();//gets rid of form
    }
    return false
}

class FormData // pattern for each data box
{ 
    constructor(id, regEX) // default constructor
    {
        //assigns info to class vars
        this.id = id;
        this.value = document.getElementById(id).value.trim(); // gets info based on id
        this.regEX = regEX;
        this.invalidmsg = `${id} is required <br/> `; // builds err msg
        
    }

    Check() // checks if data matches regex
    {
        if(!(this.regEX).test(this.value))
        {
            errors += this.invalidmsg;
            return false;
        }
        return true;
    }

    CheckMyData(regEX, invalidmsg)// method with a custom regex and msg
    {
        if(!regEX.test(this.value))
        {
            errors += invalidmsg;
            return false;
        }
        return true;
    }
    
    getInfo() // returns name and info for output
    {
        return `${this.id} = ${this.value}<br>`;
    }
}

function findCars(){
    var vals = Object.keys(localStorage);
    var output = "", temp = "";
    if(document.getElementById("model").value == null || document.getElementById("model").value == ""){
        for(var i = 0; i < vals.length; i++){
            temp = vals[i].split(",");
            output += 
            `
                <li><a href=http://www.jdpower.com/cars/${temp[0]}/${temp[1]}/${temp[2]}>${localStorage.getItem(vals[i])}</a></li>
            `;
        }
    }else{
        for(var i = 0; i < vals.length; i++){
            
            temp = vals[i].split(",");
            if(document.getElementById("model").value == temp[1]){
                output += 
                `
                    <li><a href=http://www.jdpower.com/cars/${temp[0]}/${temp[1]}/${temp[2]}>${localStorage.getItem(vals[i])}</a></li>
                `;
            }

        }
    }

    document.getElementById("list").innerHTML = output;
    return false;
}