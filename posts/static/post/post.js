let hellWorld = document.getElementById('hello-ajax')
let postBox = document.getElementById('post-list')

$.ajax({
    type:'GET',
    url:'/hello-ajax/',
    success: function (response) {

        hellWorld.textContent = response.hello
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
        data.forEach(ele=>{
            postBox.innerHTML += `<h3>${ele.title}</h3><br>
                                    <p>posted by ${ele.author}</p>`
        })
        console.log(data)

    }
})