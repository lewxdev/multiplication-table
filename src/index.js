function MultiplicationTable() {
    this.createTable()
}

MultiplicationTable.prototype.createTable = function () {
    this.element = document.querySelector("table")
    this.size = parseInt(document.querySelector("#size-option").value)
    this.divisorModifier = parseInt(document.querySelector("#div-option").value)
    this.element.innerHTML = ""

    for (let rowIndex = 0; rowIndex <= this.size + 1; rowIndex++) {
        let row = document.createElement("tr")

        for (let colIndex = 0; colIndex <= this.size + 1; colIndex++) {
            let cell = [rowIndex, colIndex].indexOf(0) !== -1 ? document.createElement("th") : document.createElement("td"),
                tooltip = document.createElement("span")
            tooltip.classList.add("tooltip")

            if (cell.tagName === "TH")
                if (rowIndex === 0)
                    if (colIndex === 0) cell.textContent = String.fromCharCode(215)
                    else cell.textContent = colIndex - 1
                else cell.textContent = rowIndex - 1

            if (cell.tagName === "TD") {
                let product = (rowIndex - 1) * (colIndex - 1)
                if (rowIndex === colIndex) cell.classList.add("square")
                if (product % this.divisorModifier === 0) cell.classList.toggle("divisorModifier")
                cell.textContent = product
                tooltip.textContent = String(rowIndex - 1) + " " + String.fromCharCode(215) + " " + String(colIndex - 1)
                cell.appendChild(tooltip)
            }
            row.appendChild(cell)
        }
        this.element.appendChild(row)
    }
}

window.onload = () => {
    new MultiplicationTable()
    for (let [index, inputSlider] of Array.from(document.querySelectorAll("input[type=range]")).entries()) {
        let tooltip = document.createElement("span")
        tooltip.classList.add("tooltip")
        tooltip.textContent = "10"
        inputSlider.insertAdjacentElement("afterend", tooltip)
    }
}

window.onresize = () => {
    const contentWidth = document.querySelector(".content-wrapper").offsetWidth,
        modalOverlay = document.querySelector(".modal-overlay")
    if (contentWidth > this.innerWidth) {
        modalOverlay.style.visibility = "visible"
        modalOverlay.style.height = document.body.clientHeight + "px"
    } else {
        modalOverlay.style.visibility = "hidden"
        modalOverlay.style.height = document.body.clientHeight + "px"
    }
}

document.querySelector("#size-option").onchange = () => {
    new MultiplicationTable()
    window.onresize()
}

document.querySelector("#size-option").oninput = function () {
    this.nextSibling.textContent = this.value
    const computedProgress = (parseInt(this.value) - 10) * 15.5 + 5
    this.style.cssText = "background:linear-gradient(90deg, #00000060 " + computedProgress + "%, #00000000 " + computedProgress + "%);"
}

document.querySelector("#div-option").oninput = function () {
    this.nextSibling.textContent = this.value
    const computedProgress = parseInt(this.value) * 4.75
    this.style.cssText = "background:linear-gradient(90deg, #00000060 " + computedProgress + "%, #00000000 " + computedProgress + "%);"
    new MultiplicationTable()
}