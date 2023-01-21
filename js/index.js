document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.querySelector("#monster-container")

    // fetch monsters
    function getMonsters() {
        return fetch("http://localhost:3000/monsters")
        .then(response => response.json())
    }


    getMonsters().then(monsters => {
        // console.log(monsters)
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

    
})





