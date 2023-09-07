import { updatePrice } from "./updatePrice.js";

document.querySelector(".button-cart").addEventListener("click", () => {
    const localStr = JSON.parse(localStorage.getItem('cart'))
    document.querySelector(".modal-cart").style.display = "block";

    document.querySelector(".modal-body").remove()
    const modalBody = document.createElement("div")
    modalBody.classList.add("modal-body")

    for(let i = 0; i < localStr.length; i++) {
        const foodRow = document.createElement("div")
        foodRow.classList.add("food-row")

        const foodName = document.createElement("span")
        foodName.classList.add("food-name")
        foodName.textContent = localStr[i].name
        
        const foodPrice = document.createElement("strong")
        foodPrice.classList.add("food-price")
        foodPrice.textContent = localStr[i].price * localStr[i].count + "₽"

        const foodCounter = document.createElement("div")
        foodCounter.classList.add("food-counter")
        
        const btnMinus = document.createElement("button")
        btnMinus.classList.add("counter-button")
        btnMinus.textContent = "-"

        btnMinus.addEventListener("click", (e) => {
          let priceForOne = 0
          let flag = 0
          const cart = JSON.parse(localStorage.getItem('cart'))
          const parentDiv = e.target.parentElement
          const counter = parentDiv.querySelector(".counter")
          if (counter.textContent == 1 || counter.textContent == 0) {
            e.target.parentElement.parentElement.remove()
            flag++
          }

          counter.textContent = +counter.textContent - 1
          for(let i = 0; i < cart.length; i++) {
            if (parentDiv.parentElement.querySelector(".food-name").textContent == cart[i].name) {
              flag == 0 ? cart[i].count-- : cart.splice(i, 1)
              flag == 0 ? priceForOne = cart[i].price : null
            } 
          }
          flag == 0 ? foodPrice.textContent = +foodPrice.textContent.replace(/[^+\d]/g, '') - priceForOne + " ₽" : null
          localStorage.setItem('cart', JSON.stringify(cart))

          updatePrice()
        })

        const counter = document.createElement("span")
        counter.classList.add("counter")
        counter.textContent = localStr[i].count

        const btnPlus = document.createElement("button")
        btnPlus.classList.add("counter-button")
        btnPlus.textContent = "+"

        btnPlus.addEventListener("click", (e) => {
            let priceForOne = 0
            const cart = JSON.parse(localStorage.getItem('cart'))
            const parentDiv = e.target.parentElement
            const counter = parentDiv.querySelector(".counter")
            counter.textContent = +counter.textContent + 1
            for(let i = 0; i < cart.length; i++) {
              if (parentDiv.parentElement.querySelector(".food-name").textContent == cart[i].name) {
                cart[i].count++
                priceForOne = cart[i].price
              }
            }
          foodPrice.textContent = +foodPrice.textContent.replace(/[^+\d]/g, '') + priceForOne + " ₽"
          localStorage.setItem('cart', JSON.stringify(cart))
          
          updatePrice()
        })

        foodCounter.append(btnMinus, counter, btnPlus)
        foodRow.append(foodName, foodPrice, foodCounter)
        modalBody.append(foodRow)

        document.querySelector(".modal-dialog").insertBefore(modalBody, document.querySelector(".modal-footer"))
        updatePrice()
    }
    
  });
 
document.querySelector(".clear-cart").addEventListener("click", () => {
  let conf = confirm("Очистить корзину?")
  if(conf) {
    document.querySelector(".modal-body").remove()
    localStorage.removeItem('cart')
    document.querySelector(".modal-pricetag").textContent = "0 ₽"
  }
})

document.getElementById("btnPlaceAnOrder").addEventListener("click", () => {
  let conf = confirm("Оформить заказ?")
  if(conf) {
  localStorage.removeItem('cart')
  document.querySelector(".modal-pricetag").textContent = "0 ₽"
  document.querySelector(".modal-body").remove() 
  alert("Спасибо за заказ")
  }
})

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".modal-cart").style.display = "none";
})

