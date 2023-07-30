fetch(
  'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    document.getElementById('author').innerHTML = `By: ${data.user.name}`
  })
  .catch((err) => {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`
  })

fetch('https://api.coingecko.com/api/v3/coins/bitcoin/')
  .then((res) => res.json())
  .then((data) => {
    document.getElementById('crypto-top').innerHTML = `
    <img src=${data.image.small} />
    <span>${data.name}</span>
    `
    document.getElementById('crypto').innerHTML += `
    <p>🎯: $${data.market_data.current_price.usd}</p>
    <p>👆: $${data.market_data.high_24h.usd}</p>
    <p>👇: $${data.market_data.low_24h.usd}</p>
    `
  })
  .catch((err) => console.error(err))

const getCurrentTime = () => {
  var date = new Date()
  document.getElementById('time').textContent = date.toLocaleTimeString(
    'en-us',
    {
      timeStyle: 'medium',
    }
  )
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error('Weather data is not available!')
      }
      return res.json()
    })
    .then((data) => {
      console.log(data)
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      document.getElementById('weather').innerHTML = `
      <img src=${iconUrl} />
      <p class='weather-temp'>${Math.round(data.main.temp)}°</p>
      <p class='weather-city'>${data.name}</p>
      `
    })
    .catch((err) => console.error(err))
})
