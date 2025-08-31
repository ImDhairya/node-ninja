function  makeTea(typeOfTea) {

  return `Making ${typeOfTea}`
  
}

const teas = ['green tea', 'sheelong tea','fefe tea']


const newData = []



teas.forEach((tea) => {
const data =  makeTea(tea)
newData.push(data)
})

console.log(newData)


function makesTea(typeoftea) {

 }
function processTeaOrder(fn) {
return fn('earl grey')
}

processTeaOrder(makesTea)