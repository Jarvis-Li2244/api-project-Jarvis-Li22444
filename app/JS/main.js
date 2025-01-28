import "../style.css";

document.addEventListener('DOMContentLoaded', () => {
const DOMSelectors = {
    html: document.querySelector("html"),
    body: document.querySelector("body"),
    header: document.querySelector(".header"),
    box: document.querySelector(".box"),
}

const name_Input = document.getElementById("nameI")
const rank_Input = document.getElementById("numberI")
const type_Select = document.getElementById("typeS")
const aspect_Select = document.getElementById("aspectS")

async function FFXIV() {
    try {
        const promise = await fetch("https://ffxivcollect.com/api/spells")
        if (promise.status != 200) {
            throw new Error(promise)
        } else {
            const info = await promise.json();
            allInfo(
                info.results
                .filter(spell => rank_Input.value == "0" || spell.rank == rank_Input.value)
                .filter(spell => type_Select.value.toLowerCase() == "all types" || spell.type["name"].toLowerCase() == type_Select.value.toLowerCase())
                .filter(spell => aspect_Select.value.toLowerCase() == "all aspects" || spell.aspect["name"].toLowerCase().includes(aspect_Select.value.toLowerCase()))
                .filter(spell => name_Input.value == '' || spell.name.toLowerCase().includes(name_Input.value.toLowerCase()))
            , info.results)
        }
    } catch (error) {
        alert("No Page Found")
    }
}

function allInfo(array, info) {
    DOMSelectors.box.innerHTML = " "
    for(let i = 1; i <= info.length; i++) {
        for(let j = 0; j < array.length; j++) {
            if(array[j]["id"] == i) {
                addInfo(array[j]);
                break
            }
        }
    }
}

function addInfo(spell) {
    DOMSelectors.box.insertAdjacentHTML(
        "beforeend",
        `<div class="w-1/4 h-[33vw] m-4 px-2 flex flex-col justify-evenly items-center border border-gray-700 rounded-3xl bg-gray-800 text-center">
          <h2 class="text-[3vw] my-3 text-orange-600">${spell.name}</h2>
          <div class="w-3/5 h-1/3 border border-gray-700 rounded-2xl overflow-hidden">
            <img src="${spell.icon}" alt="Card Image 2" class="w-full h-full object-cover">
          </div>
          <h2 class="text-[1vw] mb-1 text-orange-600">Rank ${spell.rank}</h2>
          
          <h2 class="text-[1vw] text-orange-600">Type: ${spell.type["name"]}</h2>
          <h2 class="text-[1vw] text-orange-600">Aspect: ${spell.aspect["name"]}</h2>
          <h2 class="text-[2vw] my-4 text-orange-600">${spell.id}</h2>

          <button class="btn text-[1.25vw] mb-1 text-orange-600" onclick="my_modal_${spell.id}.showModal()">Learn More</button>
          <dialog id="my_modal_${spell.id}" class="modal w-[30vw] h-[10vw] items-center border rounded-lg text-center align-items">
            <div class="modal-box">
                <h2 class="text-[3vw] my-4 text-sky-500">${spell.id}</h2>
              <p class="p-4">${spell.tooltip}</p>
              <div class="modal-action">
                <form method="dialog">
                  <button class="btn p-2">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>`
    )
};


rank_Input.addEventListener("input", function(event) {
    FFXIV()
})
type_Select.addEventListener("change", function(event) {
    FFXIV()
})
aspect_Select.addEventListener("change", function(event) {
    FFXIV()
})
name_Input.addEventListener("input", function(event) {
    FFXIV()
})

FFXIV()

});