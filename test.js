const testObject = [
  {
    id: 1,
    name: "John"
  },
  {
    id: 2,
    name: "Max"
  },
  {
    id: 3,
    name: "James"
  }
]

const james = testObject.find(obj => obj.id === 3)

console.log(james)