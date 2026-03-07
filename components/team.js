fetch("components/team.json")
.then(res => res.json())
.then(data => {

const pi = data[0]
const others = data.slice(1)

function makeButtons(member){

let buttons=""

if(member.website){
buttons+=`<li><a href="${member.website}"><i class="fa fa-user"></i></a></li>`
}

if(member.github){
buttons+=`<li><a href="${member.github}"><i class="fa fa-github-alt"></i></a></li>`
}

if(member.linkedin){
buttons+=`<li><a href="${member.linkedin}"><i class="fa fa-linkedin"></i></a></li>`
}

if(member.scholar){
buttons+=`<li><a href="${member.scholar}"><i class="fa fa-graduation-cap"></i></a></li>`
}

if(member.youtube){
buttons+=`<li><a href="${member.youtube}" target="_blank"><i class="fa fa-youtube-play"></i></a></li>`
}

return buttons
}


let piHTML = `
<div class="team-card team-pi-card">

<img src="media/${pi.photo}" class="team-photo team-photo-pi">

<h4>${pi.name}</h4>

<p class="text-muted">${pi.title}</p>

<ul class="list-inline social-buttons">
${makeButtons(pi)}
</ul>

</div>
`

document.getElementById("team-pi").innerHTML = piHTML


let html=""

others.forEach(member=>{

html+=`
<div class="team-card">

<img src="media/${member.photo}" class="team-photo">

<h4>${member.name}</h4>

<p class="text-muted">${member.title}</p>

<ul class="list-inline social-buttons">
${makeButtons(member)}
</ul>

</div>
`

})

document.getElementById("team-container").innerHTML = html

})