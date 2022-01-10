//let data = require("./index");
let pdf = require("pdfkit")
let fs = require("fs");
async function print(data,stcall,stend){ 
const doc = new pdf({bufferPages:true});

// Saving the pdf file in root directory.
doc.pipe(fs.createWriteStream('ala.pdf'));

// Adding functionality
doc.fontSize(20).text(' Approval of leave application ', 50, 60);
doc.fontSize(14).text('Subject:',50,150)
doc.fontSize(12).text(" Approval of leave application ",100,150)
.fontSize(13).fillColor("red").text(data.dataofstart,442,245) 
.fontSize(13).fillColor("red").text(data.dateofEnd,55,260) 
doc.fontSize(13).fillColor("black").text(`Dear ${data.name.toUpperCase()} 
 

We have received your request to be exempt from our classes from [                   ] to [                   ].This notification serves as confirmation that your request for time off has been approved.Please know that you will be missed in your absence, but we wish you the best for your time off. 
Should you have any questions or concerns regarding this matter, please feel free to contact us directly through email: query@acsind.tech .Otherwise, I thank you for being a valued student of  Team [${data.teampin}]. We will look forward to seeing you again when you return. 
`,50,200)
doc.fontSize(15).text("Reason for Leave",50,400)
doc.fontSize(13).text(data.reason,50,450)
doc
.image("arun.jpg",400,500,{fit:[100,100],align:"left",valign:"center"})
.fontSize(15).text("Thank you!",410,630)
doc
.image("acs.jpg",50,500,{fit:[150,150],align:"center",valign:"center"})
.fontSize(15).text("Signature of Training Head",50,650)
.fontSize(13).fillColor("green").text("This form will be submitted to the respected officer and it will be inspected manually.if there is any policy voilatation found severe action will be taken ",50,680)
// Adding image in the pdf. 
 
//   doc.image('download3.jpg', {
//     fit: [300, 300],
//     align: 'center',
//     valign: 'center'
//   }); 

//   doc
//   .addPage()
//   .fontSize(15)
//   .text('Generating PDF with the help of pdfkit', 100, 100);
 

 
// Apply some transforms and render an SVG path with the 
// 'even-odd' fill rule
// doc
//   .scale(0.6)
//   .translate(470, -380)
//   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
//   .fill('red', 'even-odd')
//   .restore();
 
// Add some text with annotations
// doc
//   .addPage()
//   .fillColor('blue')
//   .text('The link for GeeksforGeeks website', 100, 100)
  
//   .link(100, 100, 160, 27, 'https://www.geeksforgeeks.org/');
 
// Finalize PDF file
doc.end()
doc.on("data",stcall)
doc.on("end",stend)
var st =doc
return st
//return doc
}
module.exports.print=print