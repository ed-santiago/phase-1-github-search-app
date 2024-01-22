const form = document.querySelector("#github-form")
const UserSearchEndpoint = "https://api.github.com/search/users?q="
const githubContainer = document.querySelector("#github-container")
const ulUsersList = document.querySelector("#user-list")
const repoList = document.querySelector("#repos-list")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  
  const searchField = search.value

  fetch(`${UserSearchEndpoint}${searchField}`)
  .then(res => res.json())
  .then(data => renderUsers(data.items))
})

function renderUsers(data) {
  ulUsersList.innerHTML = '';
  data.forEach(renderUser)
}

function renderUser(user) {
  const li = document.createElement("li")
  li.innerHTML = `
    <h2>${user.login}</h2>
    <p><a href=${user.html_url}>Link to profile</a></p>
  `
  const img = document.createElement("img")
  img.src = `${user.avatar_url}`
  img.classList.add = "gitUser"
  li.append(img)

  ulUsersList.append(li)

  img.addEventListener("click", () => {
    repoList.innerHTML = ''
    fetch(`https://api.github.com/users/${user.login}/repos`)
    .then(res => res.json())
    .then(data => {
      data.forEach((element) => {
        const li = document.createElement("li")
        li.innerHTML = `
          <p><a href=${element.html_url}>${element.html_url}</a></p>
        `
        repoList.append(li)
      })
    })
  })
}

/*const imgs = document.querySelectorAll("img")
imgs.forEach((element) => {
  element.addEventListener("click", () => {
    console.log("hello")
  })
})*/