import "./style.css";

const DOMSelectors = {
    html: document.querySelector("html"),
    body: document.querySelector("body"),
    header: document.querySelector(".header"),
    container: document.querySelector(".container"),
    all: document.querySelector("#all")
}

async function FFXI() {
    try {
        const promise = await fetch("https://xivapi.com/item?columns=ID,Name,Description,LevelItem,ClassJobCategory.Name")
        if (promise.status != 200) {
            throw new Error(promise)
        } else {
            const info = await promise.json();
            console.log(info.Results)
        }
    } catch (error) {
        alert("No Page Found")
    }
}

function allInfo(array) {
    array.forEach(item => addInfo(item))
}

function addInfo(stuff) {
    DOMSelectors.container.insertAdjacentHTML(
        "beforeend",
        `<div>${stuff.ClassJobCategory}
        ${stuff.Description}
        ${stuff.ID}
        ${stuff.LevelItem}
        ${stuff.Name}</div>`
    )
};

DOMSelectors.all.addEventListener("click", function(event) {
    FFXI();
    }
) 




function allButtons() {
    let all = document.querySelector(".all")
    let id = document.querySelector(".id")
    let rarity = document.querySelector(".rarity")
    let rank = document.querySelector(".rank")
    let price = document.querySelector(".price")


    all.addEventListener("click", function() {
        resetContainer();
        resetHeader();
        allCards(Worlds);
        }
    ) 

    id.addEventListener("click", function() {
        addForm("Enter an ID Range:", "number");
        let form = document.querySelector("form") 
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            let input1 = document.querySelector(".input1").value
            let input2 = document.querySelector(".input2").value
            resetContainer();
            resetHeader();
            Worlds
                .filter(world => world.id >= input1 && world.id <= input2)
                .forEach(world => addCards(world))
            }
        )
        }   
    )       

    rarity.addEventListener("click", function() {
        addForm("Enter a Rarity:", "text");
        let form = document.querySelector("form") 
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            let input1 = document.querySelector(".input1").value
            resetContainer();
            resetHeader();
            Worlds
                .forEach(world => {if (world.rarity.includes(input1)) {
                    addCards(world)
                }
                }
                )
            }
        )
        }
    )       

    rank.addEventListener("click", function() {
        addForm("Enter a Rank Range:", "number");
        let form = document.querySelector("form") 
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            let input1 = document.querySelector(".input1").value
            let input2 = document.querySelector(".input2").value
            resetContainer();
            resetHeader();
            Worlds
                .filter(world => world.rank >= input1 && world.rank <= input2)
                .forEach(world => addCards(world))
            }
        )
        }
    )       

    price.addEventListener("click", function() {
        addForm("Enter a Price Range:", "number");
        let form = document.querySelector("form") 
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            let input1 = document.querySelector(".input1").value
            let input2 = document.querySelector(".input2").value
            resetContainer();
            resetHeader();
            Worlds
                .filter(world => world.price >= input1 && world.price <= input2)
                .forEach(world => addCards(world))
            }
        )
        }
    )       
}

function allCards(array) {
    array.forEach(world => addCards(world))
}

function addCards(world) {
    DOMSelectors.container.insertAdjacentHTML(
        "beforeend",
        `<div class="world">
            <h2>World #${world.id}</h2>
            <div class="imageholder">
                <img src="${world.image}" alt="${world.altText}" class="image">
            </div>
            <h3>${world.rarity}</h3>
            <h4>Rank: ${world.rank}/10000</h4>
            <h4>${world.price} ETH</h4>
        </div>`
    )
};

function resetContainer() {
    DOMSelectors.container.innerHTML = '<div class="header-place">'
    allButtons();
}

function resetHeader() {
    DOMSelectors.header.innerHTML = 
        `<h1>Hytopia Marketplace</h1>
        <div class="header-button">
            <button class="all">All</button>
            <button class="id">Sort by ID</button>
            <button class="rarity">Sort by Rarity</button>
            <button class="rank">Sort by Rank</button>
            <button class="price">Sort by Price</button>
        </div>`
    allButtons();
}

function addForm(reqLabel, formType) {
    resetHeader();
    if (formType == "text") {
        DOMSelectors.header.insertAdjacentHTML("beforeend", `
            <h3 class="requirement">${reqLabel}</h3>
        <form action="">
            <input class="input1" type="text" placeholder="Enter Rarity...">
            <button>Submit</button>  
        </form>
        </div>`);
    } else {
        DOMSelectors.header.insertAdjacentHTML("beforeend", `
            <h3 class="requirement">${reqLabel}</h3>
        <form action="">
            <input class="input1" type="number" placeholder="Minimum...">
            <input class="input2" type="number" placeholder="Maximum...">
            <button>Submit</button>  
        </form>
        </div>`);
    }
}
