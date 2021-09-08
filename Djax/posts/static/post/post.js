
let postBox = document.getElementById('post-list')
let spinnerBox = document.getElementById('spinner-box')
let loadBtn = document.getElementById('load-btn')
let loadMoreEnd = document.getElementById('end-load')
// Post Form Ajax
const postForm = document.getElementById('post-form')
const title = document.getElementById('id_title')
const body = document.getElementById('id_body')
const csrfToken = document.getElementsByName('csrfmiddlewaretoken')
console.log('csrfToken',csrfToken[0].value)
const alertBox = document.getElementById('alert-message')





const getCookie =  name => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const likeUnlikePost = () =>{
    const likeUnLikeForm = document.getElementsByClassName('like-unlike-form')
    const likeUnlike = [...likeUnLikeForm]
    // console.log(likeUnlike)
    likeUnlike.forEach(form=>form.addEventListener('submit',event=>{
        event.preventDefault()
        const clickedId = event.target.getAttribute('data-form-id')
        // console.log(clickedId)
        const clickedBtn = document.getElementById(`like-unlike-${clickedId}`)
        // console.log(clickedBtn)
        $.ajax({
            type: 'POST',
            url: "/like-unlike/",
            data:{
                'csrfmiddlewaretoken': csrftoken,
                'pk':clickedId,
            },
            success:function (response){
                // console.log(response)
                clickedBtn.textContent = response.liked ? `Unlike(${response.count})`: `Like(${response.count})`
            },
            error:function (error){
                console.log(error)
            }
        })
    }))

}


let visible = 3

const getData = () => {
    $.ajax({
    type: 'GET',
    url: `/post-data/${visible}`,
    success:function (response){
        const data = response.data
        spinnerBox.classList.add('not-visible')
        setTimeout(()=>{
            data.forEach(ele=>{
            postBox.innerHTML +=
        `<div class="card mb-2">
                              <div class="card-body">
                                <h5 class="card-title">${ele?.title}</h5>
                                <p class="card-text">${ele?.body}</p>          
                              </div>
                               <div class="card-footer">
                                    
                                    <div class="row">
                                    <div class="col-1">
                                        <a href="#" class="btn btn-primary">Details</a>
                                    </div>
                                    <div class="col-1">
                                        <form class="like-unlike-form" data-form-id="${ele.id}">
                       
                                            <button href="#" class="btn btn-primary" id="like-unlike-${ele.id}">${ ele.liked ? `Unlike(${ele.count})`:`Like(${ele.count})`}</button>
                                        </form>
                                    </div>
                                    </div>
                                </div>
                           </div>`
                        })

            likeUnlikePost()
        },500)
        if(response.size===0){
            loadMoreEnd.textContent = 'No post yet posted'
        }else if( response.size <= visible){
            loadBtn.classList.add('not-visible')
            loadMoreEnd.textContent = 'No more posts to load'
        }
    }
})
}

loadBtn.addEventListener('click',function (){
    spinnerBox.classList.remove('not-visible')
    visible +=3
    getData()
})

postForm.addEventListener('submit',e=>{
    e.preventDefault()
    $.ajax({
        type:'POST',
        url:'',
        data: {
            'csrfmiddlewaretoken':csrfToken[0].value,
            'title': title.value,
            'body':body.value
        },
        success:function (response){
            console.log('Response',response)
            postBox.insertAdjacentHTML('afterbegin',`<div class="card mb-2">
                      <div class="card-body">
                        <h5 class="card-title">${response?.title}</h5>
                        <p class="card-text">${response?.body}</p>          
                      </div>
                       <div class="card-footer">
                            
                            <div class="row">
                            <div class="col-1">
                                <a href="#" class="btn btn-primary">Details</a>
                            </div>
                            <div class="col-1">
                                <form class="like-unlike-form" data-form-id="${response.id}">
               
                                    <button href="#" class="btn btn-primary" id="like-unlike-${response.id}">Like(0)</button>
                                </form>
                            </div>
                            </div>
                        </div>
                   </div>`)
            likeUnlikePost()
            $('#addPostModal').modal('hide')
            handleAlert('success','Post has created !!')



        },
        error:function (error){
            console.log(error)
            handleAlert('danger','Ops..Something went wrong !!')
        }
        
    })
})

getData()


