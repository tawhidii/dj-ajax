let hellWorld = document.getElementById('hello-ajax')
let postBox = document.getElementById('post-list')
let spinnerBox = document.getElementById('spinner-box')

$.ajax({
    type:'GET',
    url:'/hello-ajax/',
    success: function (response) {

        // hellWorld.textContent = response.hello
    },
    error: function (error){
        console.log('Errr',error)
    }
})


$.ajax({
    type: 'GET',
    url: '/post-data/',
    success:function (response){
        const data = response.data
        console.log(data)
        spinnerBox.classList.add('not-visible')
        setTimeout(()=>{
            data.forEach(ele=>{
            postBox.innerHTML += `<div class="card mb-2">
                                      <div class="card-body">
                                        <h5 class="card-title">${ele.title}</h5>
                                        <p class="card-text">${ele.body}</p>          
                                      </div>
                                       <div class="card-footer">
                                            
                                            <div class="row">
                                            <div class="col-1">
                                                <a href="#" class="btn btn-primary">Details</a>
                                            </div>
                                            <div class="col-1">
                                                <a href="#" class="btn btn-primary">Like</a>
                                            </div>
                                            </div>
                                        </div>
                                   </div>`
                        })
        },500)
    }
})