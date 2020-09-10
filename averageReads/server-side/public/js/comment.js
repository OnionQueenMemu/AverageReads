//submit for comments

const bookId = document.querySelector('.bookId').innerHTML
const submit = document.getElementById('submitButton')
const userId = localStorage.getItem('AVG_READS_CURRENT_USER_ID')

submit.addEventListener('click', async() => {
    const message = document.getElementById('userComment').value
    console.log(message)
    body = { message }
    const response = await fetch(`http://localhost:8080/comment/${userId}/${bookId}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json'
        },
    })
    const review = await response.json()
    const date = review.comment.createdAt.slice(0, 4)
    const reviewHtml = `
    <strong class="pr-2"> ${review.user.username} </strong>
    <small class="pr-2"> ${review.user.email}</small>
    <small> ${date}</small>
    <br>
    <p class="pb-3"> ${review.comment.message}</p>
    `
    console.log(reviewHtml)
    const container = document.getElementById('review');
    container.innerHTML += reviewHtml

});