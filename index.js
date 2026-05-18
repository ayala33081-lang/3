const Employee = require("./classEmployee.js"); 
const fs = require('node:fs'); 
const fsPromises = require('node:fs/promises'); 

const emp1 = new Employee(1, "Moshe", 10000);
const emp2 = new Employee(2, "Yossi", 20000);
const emp3 = new Employee(3, "Dina", 30000);

fs.mkdirSync('./employees_data');

fs.writeFileSync(`./employees_data/${emp1.empName}.txt`, JSON.stringify(emp1));

fs.writeFile(`./employees_data/${emp2.empName}.txt`, JSON.stringify(emp2), (err) => {
    if (err) {
        console.log('שגיאה בשמירת emp2:', err.message);
    } 
    else {
        console.log('emp2 נשמר בהצלחה עם Callback!');
    }
});

fsPromises.writeFile(`./employees_data/${emp3.empName}.txt`, JSON.stringify(emp3))
    .then(() => {
        console.log('emp3 נשמר בהצלחה  !');
    })
    .catch((err) => {
        console.log('שגיאה בשמירת emp3:', err.message);
    });

fsPromises.appendFile(`./employees_data/${emp2.empName}.txt`, '\nEvaluation: 95') 
    .then(() => {
        console.log('emp2 עודכן בהצלחה  !');
    })
    .catch((err) => {
        console.log('שגיאה בעדכון emp2:', err.message);
    });


fsPromises.readdir('./employees_data')
    .then((files) => {
        console.log(files); 
        
        if (files.length === 3) {
            console.log('מצוין! יש בדיוק 3 קבצים בתיקייה.');
        } else {
            console.log(`אין 3 קבצים בדיוק בתיקיה`);
        }
    })
    .catch((err) => {
        console.log('שגיאה בקריאת התיקייה:', err.message);
    });