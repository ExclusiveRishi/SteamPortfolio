$(function() {



    $.getJSON("data.json", data => {
        $(".name").html(`<h2> ${data["name"]} </h2>`);
        $(".location").html(`<p> ${data["location"]} </p>`);
        $(".description").html(`<p> ${data["description"]} </p>`);
        $(".contact-btn").click(function() {
            document.location.href = data["contact"]
        });

        if (data.hasOwnProperty('Github')) {

            $.get(`https://api.github.com/users/${data["Github"]}`, function(data) {
                $(".frame").html(`<img src=${data["avatar_url"]}>`)
            })

            $.getJSON(`https://api.github.com/users/${data["Github"]}/repos`)
            .done(data=>{
                const repo_icon = `<span><svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" class="octicon octicon-repo mr-2 color-text-secondary">
                <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
            </svg></span>`

                $.each(data, (index, value) => {

                    if (value["fork"]) {
                        return;
                    }

                    $("#showcase")
                    .append(
                        `<div class="card">
                            <h3>${repo_icon}<a href='${value['html_url']}'> ${value['name']} </a></h3>
                            <p> ${value['description'] || "No description provided"} </p>
                        </div>`
                        );
                })
            });
            
        } else {

            if (data.hasOwnProperty("profile")) {
                $(".frame").html(`<img src='${data["profile"]}'>`)
            }
        }
    });

    

    
})