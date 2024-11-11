import * as fs from 'fs';
import * as xml2js from 'xml2js';

interface Student {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    age: number;
    sex: string;
    emailAddress: string;
    gradeLevel: number;
    section: string;
}

// Function to parse and display the XML
const parseXmlFile = async (filePath: string) => {
    try {
        const xmlData = fs.readFileSync(filePath, 'utf-8');
        const parser = new xml2js.Parser();

        const result = await parser.parseStringPromise(xmlData);
        const students: Student[] = result.students.student.map((student: any) => ({
            id: student.$.id,
            firstName: student.firstName[0],
            lastName: student.lastName[0],
            middleName: student.middleName[0],
            age: parseInt(student.age[0]),
            sex: student.sex[0],
            emailAddress: student.emailAddress[0],
            gradeLevel: parseInt(student.gradeLevel[0]),
            section: student.section[0]
        }));

        // Display each student
        students.forEach((student) => {
            console.log(`ID: ${student.id}`);
            console.log(`Name: ${student.firstName} ${student.middleName} ${student.lastName}`);
            console.log(`Age: ${student.age}`);
            console.log(`Sex: ${student.sex}`);
            console.log(`Email: ${student.emailAddress}`);
            console.log(`Grade Level: ${student.gradeLevel}`);
            console.log(`Section: ${student.section}`);
            console.log('----------------------------------');
        });
    } catch (error) {
        console.error('Error reading or parsing the XML file:', error);
    }
};

// Call the function with the XML file path
parseXmlFile('students.xml');
