const actor="anubhavjain.bsky.social"

function timeAgo(date){

const seconds=Math.floor((new Date()-date)/1000)

const intervals=[
["y",31536000],
["mo",2592000],
["d",86400],
["h",3600],
["m",60]
]

for(let [label,sec] of intervals){

const value=Math.floor(seconds/sec)

if(value>=1){
return value+label
}

}

return "now"
}

fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${actor}&limit=5`)
.then(res=>res.json())
.then(data=>{

let html=""

data.feed.forEach(item=>{

const post=item.post

const text=post.record.text
const avatar=post.author.avatar
const name=post.author.displayName
const handle=post.author.handle

const date=timeAgo(new Date(post.indexedAt))

const uri=post.uri.split("/")
const postID=uri[uri.length-1]

const link=`https://bsky.app/profile/${actor}/post/${postID}`

let cardHTML=""

if(post.embed && post.embed.external){

const ext=post.embed.external

cardHTML=`
<a href="${ext.uri}" target="_blank">

<div class="card">

${ext.thumb ? `<img src="${ext.thumb}">` : ""}

<div class="card-body">

<div class="card-title">${ext.title}</div>

<div class="card-desc">${ext.description || ""}</div>

<div class="card-domain">${new URL(ext.uri).hostname}</div>

</div>

</div>

</a>
`
}

let imageHTML=""

if(post.embed && post.embed.images){

post.embed.images.forEach(img=>{
imageHTML+=`<img src="${img.fullsize}">`
})

}

html+=`

<div class="post">

<a href="https://bsky.app/profile/${handle}" target="_blank">
<img class="avatar" src="${avatar}">
</a>

<div class="content">

<div class="header">

<span class="name">${name}</span>
<span class="handle">@${handle}</span>
<span class="time">· ${date}</span>

</div>

<div class="text">
<a href="${link}" target="_blank">${text}</a>
</div>

${cardHTML}

${imageHTML}

</div>

</div>
`

})

document.getElementById("feed").innerHTML=html

})