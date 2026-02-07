const classificationList = document.querySelector("#classificationList")
const inventoryDisplay = document.querySelector("#inventoryDisplay")

if (classificationList) {
  classificationList.addEventListener("change", async function () {
    const classificationId = classificationList.value
    if (classificationId === "") return

    const response = await fetch(`/inv/getInventory/${classificationId}`)
    const inventory = await response.json()

    let table = `
      <table>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
    `

    inventory.forEach(vehicle => {
      table += `
        <tr>
          <td>${vehicle.inv_make} ${vehicle.inv_model}</td>
          <td>
            <a href="/inv/edit/${vehicle.inv_id}">Modify</a>
          </td>
        </tr>
      `
    })

    table += "</tbody></table>"
    inventoryDisplay.innerHTML = table
  })
}