const backBtn = document.getElementById('back-btn')
const url = `${window.location.href}data/`
const updateUrl = `${window.location.href}update/`
const deleteUrl = `${window.location.href}delete/`
const updateForm = document.getElementById('update-form')
const deleteForm = document.getElementById('delete-form')
const spinnerBox = document.getElementById('spinner-box')
const editBtn = document.getElementById('edit-btn')
const deleteBtn = document.getElementById('delete-btn')
const postBox = document.getElementById('post-box')
const titleInput = document.getElementById('id_title')
const bodyInput = document.getElementById('id_body')

const csrfToken = document.getElementsByName('csrfmiddlewaretoken')

const alertBox = document.getElementById('alert-message')
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
            titleElement.setAttribute('id','title')

            const bodyElement = document.createElement('p')
            bodyElement.setAttribute('class','mt-1')
            bodyElement.setAttribute('id','body')

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


const updateData = () => {
        updateForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const title = document.getElementById('title')
        const body = document.getElementById('body')

        $.ajax({
            type: 'POST',
            url:updateUrl,
            data:{
                'csrfmiddlewaretoken':csrfToken[0].value,
                'title': titleInput.value,
                'body':bodyInput.value
            },
            success:(response)=>{
                handleAlert('success','Post has been updated !!')
                title.textContent = response.title
                body.textContent = response.body

            },
            error:(error)=>{
                console.log(error)

            }
        })

    })

}

updateData()


const deletePost = () =>{
    console.log(deleteUrl)
    deleteForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:deleteUrl,
            data: {
                'csrfmiddlewaretoken':csrfToken[0].value,
            },
            success:(response)=>{
                window.location.href = window.location.origin
                localStorage.setItem('title',titleInput.value)
            },
            error:(error)=>{
                console.log(error)
            }
        })
    })
}
deletePost()

