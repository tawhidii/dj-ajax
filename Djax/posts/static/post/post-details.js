const backBtn = document.getElementById('back-btn')
const url = `${window.location.href}data/`
const spinnerBox = document.getElementById('spinner-box')
const editBtn = document.getElementById('edit-btn')
const deleteBtn = document.getElementById('delete-btn')
const postBox = document.getElementById('post-box')
const titleInput = document.getElementById('id_title')
const bodyInput = document.getElementById('id_body')
backBtn.addEventListener('click',()=>{
    history.back()
})

// get post details via ajax request
const postDetailsData = () => {
    $.ajax({
        type:'GET',
        url:url,
        success:(response)=>{
            // console.log(response)
            spinnerBox.classList.add('not-visible')
            const data = response.data
            if(data.logged_in !== data.author){
                 console.log('Different')
            }else {
                editBtn.classList.remove('not-visible')
                deleteBtn.classList.remove('not-visible')
            }
            const titleElement = document.createElement('h3')
            titleElement.setAttribute('class','mt-3')
            const bodyElement = document.createElement('p')
            bodyElement.setAttribute('class','mt-1')
            titleElement.textContent = response.data.title
            bodyElement.textContent = response.data.body
            postBox.appendChild(titleElement)
            postBox.appendChild(bodyElement)
            titleInput.value = data.title
            bodyInput.value = data.body
        },
        error:(error)=>{
            console.log(error)
        }
    })

}
postDetailsData()
