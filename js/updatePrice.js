export function updatePrice() {
    const price = document.querySelector(".modal-pricetag")
    price.textContent = "0"
    const foodPrices = document.querySelectorAll(".food-price")
    for (let i = 0; i < foodPrices.length; i++) {
        price.textContent = +price.textContent.replace(/[^+\d]/g, '') + (+foodPrices[i].textContent.replace(/[^+\d]/g, ''))
    }
    price.textContent = price.textContent + " ₽"
}