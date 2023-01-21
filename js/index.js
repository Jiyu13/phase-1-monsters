document.addEventListener("DOMContentLoaded", (event) => {
    const monsterContainer = event.target.querySelector("#monster-container")
    
    // create monster form
    const createDiv =  event.target.querySelector("#create-monster")
    const monsterForm = event.target.createElement("form")
    monsterForm.setAttribute("id", "monster-form")

    const name = event.target.createElement("input")
    name.setAttribute("id", "name")
    name.placeholder = "name..."

    const age = event.target.createElement("input")
    age.setAttribute("id", "age")
    age.placeholder = "age..."

    const description = event.target.createElement("input")
    description.setAttribute("id", "description")
    description.placeholder = "description..."

    const createBtn = event.target.createElement("button")
    createBtn.textContent = "Create"

    monsterForm.append(name, age, description, createBtn)
    createDiv.append(monsterForm)


    // fetch monsters
    function getMonsters() {
        return fetch("http://localhost:3000/monsters")
        .then(response => response.json())
    }


    getMonsters().then(monsters => {
        monsters.forEach(monster => renderMonster(monster))
    })

    // render each monster
    function renderMonster(monster) {
        const div = document.createElement("div")
        const name = document.createElement("h2")
        name.textContent = monster["name"]

        const age = document.createElement("h4")
        age.textContent = `Age: ${monster["age"]}`

        const description = document.createElement("p")
        description.textContent = `Bio: ${monster["description"]}`

        div.append(name, age, description)
        monsterContainer.appendChild(div)
    }


    // create new monster 
    createBtn.addEventListener("click", () => {
        monsterForm.addEventListener("submit", (event) => {
            event.preventDefault()
            postMonster(event.target)
            
        })
    })

    
    // post new Monster
    function postMonster(newMonster) {  
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "name": newMonster.name.value,
                "age": parseInt(newMonster.age.value),
                "description": newMonster.description.value
            })
        })
        .then(response => response.json())
        .then(newMonster => renderMonster(newMonster))
    }

    
})





