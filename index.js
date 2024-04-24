const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem("items")) || [];

function handleSubmit(e){
    e.preventDefault()
    const text = (this.querySelector(`[name=item]`)).value
    const item = {
        text,
        done: false
    }

    items.push(item)
    populateList(items, itemsList)
    localStorage.setItem("items", JSON.stringify(items))
    this.reset()
}


function populateList(plates = [], platesList){
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-item=${i} id="item${i}" ${plate.done ? "checked" : ""}>
                <label for="item${i}">${plate.text}</label>
            </li>
         `
    }).join("")
}

function toggleDone(e){
    if(!e.target.matches("input")) return
    const el = e.target
    const index = el.dataset.index
    items[index].done = !items[index].done
    localStorage.setItem("items", JSON.stringify(items))
    populateList(items, itemsList)
}

populateList(items, itemsList)

addItems.addEventListener("submit", handleSubmit)
itemsList.addEventListener("click", toggleDone)

//create functions for removing all checked, check all and clear list