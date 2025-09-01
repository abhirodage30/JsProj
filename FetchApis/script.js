fetch("https://jsonplaceholder.typicode.com/todos")
.then(res =>{
    if (!res.ok) {
        throw new Error("404 Not Responding!!!")
        
    }
    return res.json()
})
.then(data => data.forEach(element => {
    console.log(element.title)
}))
.catch(error => console.log(error))