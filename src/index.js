
    if (localStorage.getItem("token") !== null) {
    var postDiv = document.getElementById('posts');

    let data = "";

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {

            let response = JSON.parse(this.responseText)

            response.forEach((post) => {
                postDiv.innerHTML += `
                    <div class="card logged-out" >
                        <div class="card-header"> ${post.title} </div>
                            <div class="card-body">
                            <p class="card-text">${post.content} </p>
                        </div>
                    </div>
                    <br>
                `;
            });
        }
    });

    xhr.open("GET", "http://localhost:3000/posts");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));

    xhr.send(data);

    document.querySelectorAll('.logged-out').forEach((el) => {
        el.classList.add('d-none');
    });
    document.querySelectorAll('.logged-in').forEach((el) => {
        el.classList.remove('d-none');
    });
    //vérifie que l'utilisateur est admin pour display la crétion de post
    if (localStorage.getItem('admin')) {
        document.querySelectorAll('.createLink').forEach((el) => {
            el.classList.remove('d-none');
        });
    }
}
// permet de se login
$(".login").submit(function (e) {
    e.preventDefault();

    $.post("http://localhost:3000/user/login", $(".login").serialize())
        .done(function (data) {
            localStorage.setItem("token", data.token);
            // si l'utilisateur est admin stock l'information dans le localstorage
            if ($(".login").serializeArray()[2]) {
                localStorage.setItem("admin", "true");
            }
            window.location.href="http://localhost:8080/"
            
        })
        .fail(function (data) {
            console.log(data.responseJSON.message);
            console.log(data.token)
        });
});

// permet de se register
$(".register").submit(function (e) {
    e.preventDefault();
    
    $.post("http://localhost:3000/user/register", $(".register").serialize())
        .done(function (data) {
            localStorage.setItem("token", data.token);
            // si l'utilisateur est admin stock l'information dans le localstorage
            if ($(".register").serializeArray()[2]) {
                localStorage.setItem("admin", "true");
            }
            window.location.href="http://localhost:8080/"
        })
        .fail(function (data) {
            console.log(data.responseJSON.message);
            console.log(data.token)
        });
});

// permet de logout et de revenir à la page d'inscription/connexion
function logout() {
    console.log("test")
    window.localStorage.clear();
    window.location.href="http://localhost:8080/"
}

// appel la fonction de logout quand le bouton est cliqué
$(".logout").click(function() {
    logout();
});


//permet de créer un post, envoie les données du post et le token
$(".createPost").submit(function (e) {
    e.preventDefault();

    $.ajax({
        url: 'http://localhost:3000/posts',
        type: 'post',
        data: $(".createPost").serialize(),
        
        headers: {
            "Authorization": localStorage.getItem('token')
        }
    });
});
