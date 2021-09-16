const backBtn = document.getElementById('back-btn')
const url = `${window.location.href}data/`
const spinnerBox = document.getElementById('spinner-box')
const editBtn = document.getElementById('edit-btn')
const deleteBtn = document.getElementById('delete-btn')

backBtn.addEventListener('click',()=>{
    history.back()
})

// get post details via ajax request
const postDetailsData = () => {
    $.ajax({
        type:'GET',
        url:url,
        success:(response)=>{
            console.log(response)
            spinnerBox.classList.add('not-visible')
            const data = response.data
            if(data.logged_in !== data.author){
                 console.log('Different')
            }else {
                editBtn.classList.remove('not-visible')
                deleteBtn.classList.remove('not-visible')
            }
        },
        error:(error)=>{
            console.log(error)
        }
    })
}
postDetailsData()