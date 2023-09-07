const restTitle = document.createElement("h2")
restTitle.classList.add("section-title", "restaurant-title")
restTitle.textContent = localStorage.getItem('name')

const cardInfoTitle = document.createElement("div")
cardInfoTitle.classList.add("card-info")

const cardRating = document.createElement("div")
cardRating.classList.add("rating")
cardRating.textContent = localStorage.getItem("rating")

const cardPrice = document.createElement("div")
cardPrice.classList.add("price")
cardPrice.textContent = localStorage.getItem("price")

const cardCategory = document.createElement("div")
cardCategory.classList.add("category")
cardCategory.textContent = localStorage.getItem("category")

cardInfoTitle.append(cardRating, cardPrice, cardCategory)
document.querySelector(".section-heading").append(restTitle, cardInfoTitle)

cartArray = []

const addToCart = (cartItem) => {
    if(cartArray.some((item) => item.id === cartItem.id)) {
        cartArray.map((item) => {
            if(item.id === cartItem.id) {
                item.count++
            }
            return item
        })
    } else {
        cartArray.push(cartItem)
    }
    localStorage.setItem('cart', JSON.stringify(cartArray))            

}


fetch(`db/${localStorage.getItem('rest')}`)
    .then((response) => response.json())
    .then((data) => {

        for(let i = 0; i < data.length; i++) {
            const card = document.createElement("div")
            card.classList.add("card")

            const img = document.createElement("img")
            img.src = data[i].image
            img.alt = "image"
            img.classList.add("card-image")
            
            const cardText = document.createElement("div")
            cardText.classList.add("card-text")

            const cardHeading = document.createElement("div")
            cardHeading.classList.add("card-heading")

            const cardTitle = document.createElement("h3")
            cardTitle.classList.add("card-title", "card-title-reg")
            cardTitle.textContent = data[i].name

            const cardInfo = document.createElement("div")
            cardInfo.classList.add("card-info")

            const ingredients = document.createElement("div")
            ingredients.classList.add("ingredients")
            ingredients.textContent = data[i].description

            const cardButtons = document.createElement("div")
            cardButtons.classList.add("card-buttons")

            const primaryButton = document.createElement("button")
            primaryButton.classList.add("button", "button-primary", "button-add-cart")
            primaryButton.addEventListener("click", (e) => {
                if(localStorage.getItem('status') == 'true') {
                    const cardItem = {
                        name: cardTitle.textContent,
                        price: data[i].price,
                        id: data[i].id,
                        count: 1
                    }
                    addToCart(cardItem)    
            }   else {
                alert("Сначала войдите в аккаунт")
            }
        })  
            
            const btnCardText = document.createElement("span")
            btnCardText.classList.add("button-card-text")
            btnCardText.textContent = "В корзину"

            const btnCardSvg = document.createElement("span")
            btnCardSvg.classList.add("button-cart-svg")

            const cardPrice = document.createElement("strong")
            cardPrice.classList.add("card-price-bold")
            cardPrice.textContent = `${data[i].price} ₽`

            primaryButton.append(btnCardText, btnCardSvg)
            cardButtons.append(primaryButton, cardPrice)
            cardInfo.append(ingredients)
            cardHeading.append(cardTitle)
            cardText.append(cardHeading, cardInfo, cardButtons)
            card.append(img,cardText)
            document.querySelector(".cards-menu").append(card)
        }
})
