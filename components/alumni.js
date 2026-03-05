fetch("components/alumni.json")
.then(res => res.json())
.then(data => {

function makeButtons(person){

let buttons=""

if(person.website){
buttons+=`<li><a href="${person.website}"><i class="fa fa-user"></i></a></li>`
}

if(person.github){
buttons+=`<li><a href="${person.github}"><i class="fa fa-github-alt"></i></a></li>`
}

if(person.linkedin){
buttons+=`<li><a href="${person.linkedin}"><i class="fa fa-linkedin"></i></a></li>`
}

if(person.scholar){
buttons+=`<li><a href="${person.scholar}"><i class="fa fa-graduation-cap"></i></a></li>`
}

return buttons
}

let html=""

data.forEach(person=>{

html+=`
<div class="team-card">

<img src="media/${person.photo}" class="alumni-photo">

<h4>${person.name}</h4>

<p class="text-muted">${person.title}</p>

<ul class="list-inline social-buttons">
${makeButtons(person)}
</ul>

</div>
`

})

document.getElementById("alumni-container").innerHTML = html

})