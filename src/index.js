function MultiplicationTable() {
    this.createTable()
}

MultiplicationTable.prototype.createTable = function () {
    const table = document.querySelector("table")
    this.size = parseInt(document.querySelector("#size-option").value)
    table.innerHTML = ""

    for (let rowIndex = 0; rowIndex <= this.size + 1; rowIndex++) {
        let row = document.createElement("tr")

        for (let colIndex = 0; colIndex <= this.size + 1; colIndex++) {
            let cell = rowIndex === 0 || colIndex === 0 ?
                document.createElement("th") :
                document.createElement("td"),
                tooltip = document.createElement("span")
            tooltip.classList.add("tooltip")

            if (cell.tagName === "TH")
                if (rowIndex === 0)
                    if (colIndex === 0) cell.textContent = String.fromCharCode(215)
                    else cell.textContent = colIndex - 1
                else cell.textContent = rowIndex - 1

            if (cell.tagName === "TD") {
                if (rowIndex === colIndex) cell.classList.add("square")
                cell.textContent = (rowIndex - 1) * (colIndex - 1)
                tooltip.textContent = String(rowIndex - 1) + " " + String.fromCharCode(215) + " " + String(colIndex - 1)
                cell.appendChild(tooltip)
            }
            row.appendChild(cell)
        }
        table.appendChild(row)
    }
}

new MultiplicationTable()

document.querySelector("#size-option").addEventListener("change", function () {
    new MultiplicationTable()
})