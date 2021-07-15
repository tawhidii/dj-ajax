
let postBox = document.getElementById('post-list')
let spinnerBox = document.getElementById('spinner-box')
let loadBtn = document.getElementById('load-btn')
let loadMoreEnd = document.getElementById('end-load')


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
            postBox.innerHTML += `<div class="card mb-2">
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
                                                <a href="#" class="btn btn-primary">${ ele.liked ? `Unlike(${ele.count})`:`Like(${ele.count})`}</a>
                                            </div>
                                            </div>
                                        </div>
                                   </div>`
                        })
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
getData()