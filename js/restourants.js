export function renderRests() {
  const renderDB = fetch("./db/db.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.db.partners.length; i ++) {

          let link = document.createElement("a")
          link.classList.add("card", "card-restaurant");
          link.href = "restaurant.html";
          link.dataset.products = `${data.db.partners[i].products}`

          let iconPizza = document.createElement("img")
          iconPizza.classList.add("card-image");
          iconPizza.src = data.db.partners[i].image
          iconPizza.alt = "image"
          
          let divCardText = document.createElement("div")
          divCardText.classList.add("card-text")

          let divCardHeading = document.createElement("div")
          divCardHeading.classList.add("card-heading")

          let cardTitle = document.createElement("h3")
          cardTitle.classList.add("card-title")
          cardTitle.textContent = data.db.partners[i].name

          let cardTeg = document.createElement("span")
          cardTeg.classList.add("card-tag", "tag")
          cardTeg.textContent = `${data.db.partners[i].time_of_delivery} мин`

          let cardInfo = document.createElement("div")
          cardInfo.classList.add("card-info")

          let rating = document.createElement("div")
          rating.classList.add("rating")
          rating.textContent = data.db.partners[i].stars

          let price = document.createElement("div")
          price.classList.add("price")
          price.textContent = `От ${data.db.partners[i].price} ₽`


          let category = document.createElement("div")
          category.classList.add("category")
          category.textContent = data.db.partners[i].kitchen


          cardInfo.append(rating, price, category)

          divCardHeading.append(cardTitle, cardTeg)

          divCardText.append(divCardHeading, cardInfo)

          link.append(iconPizza, divCardText)

          link.addEventListener('click', (e) => {
            e.preventDefault()
            localStorage.setItem('rest', link.dataset.products)
            localStorage.setItem('name', cardTitle.textContent)
            localStorage.setItem('rating', rating.textContent)
            localStorage.setItem('price', price.textContent)
            localStorage.setItem('category', category.textContent)

            window.location.href = '/restaurant.html'
          })


          document.querySelector(".cards-restaurants").append(link);
      }
  });
}

renderRests()
    

