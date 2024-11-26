import "./style.css";

const DOMSelectors = {
    html: document.querySelector("html"),
    body: document.querySelector("body"),
    header: document.querySelector(".header"),
    container: document.querySelector(".container"),
    all: document.querySelector("#all"),
    tbody: document.querySelector("tbody")
}

async function FFXI() {
    try {
        const promise = await fetch("https://xivapi.com/item?columns=ID,Name,Description,LevelItem,ClassJobCategory.Name")
        if (promise.status != 200) {
            throw new Error(promise)
        } else {
            const info = await promise.json();
            allInfo(info.Results)
        }
    } catch (error) {
        alert("No Page Found")
    }
}

function allInfo(array) {
    array.forEach(item => {if(item.Name == "" || item.Description == "") {
    } else {
         addInfo(item);
    }
}
)
}

function addInfo(stuff) {
    DOMSelectors.tbody.insertAdjacentHTML(
        "beforeend",
        `<tr>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200>${stuff.ID}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">${stuff.Name}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">${stuff.Description}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">${stuff.LevelItem}</td>
        </tr>`
    )
};

DOMSelectors.all.addEventListener("click", function(event) {
    FFXI();
    }
) 

async function FFXI2() {
    try {
        const promise = await fetch("https://www.freetogame.com/api/games")
        if (promise.status != 200) {
            throw new Error(promise)
        } else {
            const info = await promise.json();
            console.log(info)
        }
    } catch (error) {
        alert("No Page Found")
    }
}

const promise = await fetch("https://www.freetogame.com/api/games")
const info = await promise.json();
console.log(info)