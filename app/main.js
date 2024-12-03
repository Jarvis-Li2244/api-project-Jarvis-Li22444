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
        const promise = await fetch("https://ffxivcollect.com/api/spells")
        if (promise.status != 200) {
            throw new Error(promise)
        } else {
            const info = await promise.json();
            console.log(info.results[1]["aspect"]["name"]);
            
            allInfo(info.results)
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
        `<div class="w-1/4 h-[33vw] m-4 px-2 flex flex-col justify-evenly items-center border border-gray-700 rounded-3xl bg-gray-800 text-center">
          <h2 class="text-[3vw] my-3 text-orange-600">${stuff.name}</h2>
          <div class="w-3/5 h-1/3 border border-gray-700 rounded-2xl overflow-hidden">
            <img src="${stuff.icon}" alt="Card Image 2" class="w-full h-full object-cover">
          </div>
          <h2 class="text-[1vw] mb-1 text-orange-600">Rank ${stuff.rank}</h2>
          <p class="m-2 text-[0.75vw]">${stuff.tooltip}</p>
          <h2 class="text-[1vw] text-orange-600">Type: ${stuff.type["name"]}</h2>
          <h2 class="text-[1vw] text-orange-600">Aspect: ${stuff.aspect["name"]}</h2>
          <h2 class="text-[2vw] my-4 text-orange-600">${stuff.id}</h2>
        </div>`
    )
};

DOMSelectors.all.addEventListener("click", function(event) {
    FFXI();
    }
) 
