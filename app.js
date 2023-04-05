const URL = 'https://gist.githubusercontent.com/damian-git-99/5bc0fb1d4b3b8fd6bd3d55f486169232/raw/062ee66abfaa23fbdc3403f61ba8dec7f2a4acf9/images-data.json'

document.addEventListener('DOMContentLoaded', async () => {
  const observer = new IntersectionObserver(handleIntersect)
  observer.observe(document.querySelector('#loader'))
  await getData()
})

let cont = 0;
function handleIntersect(entries) {
  if (cont >= 5) {
    // simulate that there are no more images
    showNoMoreContent();
    return
  }
  if (entries[0].isIntersecting) {
    console.log('something is intersecting with the viewport')
    cont++;
    getData()
  }
}

async function getData() {
  setTimeout(async () => {
    let main = document.querySelector('#images')
    const response = await fetch(URL)
    const data = await response.json()
    data.items.forEach((item) => {
    let col = document.createElement('div')
    col.classList.add('col-md-3', 'mb-3', 'animate__animated', 'animate__fadeIn')

    let img = document.createElement('img')
    img.src = item.img
    img.alt = item.name

    col.appendChild(img)
    main.appendChild(col)
  })
  }, 800)
}

function showNoMoreContent() {
  let main = document.querySelector('#images')
  let col = document.createElement('div')
  col.classList.add('col')

  let alert = document.createElement('div')
  alert.classList.add('alert','alert-info', 'mb-3', 'animate__animated', 'animate__fadeIn')
  alert.innerText = 'No More Content...' 
  col.appendChild(alert)
  main.appendChild(col)

  // delete spinner
  let loader = document.querySelector('#loader')
  loader.remove()
}
