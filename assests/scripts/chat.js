let btn = document.getElementById("btn");
let hold = document.getElementById("output");
let _msg = document.getElementById("message");
let feedback = document.getElementById("fb");

let sock = io();
let username = document.getElementById('usrsNum').innerHTML

sock.emit('user', username.trim())

sock.on('user', (user) => {
    let div = document.createElement("div");
    let span = document.createElement("span");
    span.textContent = `${user} is connected!`
    div.appendChild(span)
    div.setAttribute("class", "bg-success connect");
    hold.appendChild(div)
})

btn.addEventListener('click', function () {
    let msg = document.getElementById("message").value;
    let usr = document.getElementById("usrsNum").innerHTML
    let dateObj = new Date()
    let date = {day:dateObj.getDate(),hour:dateObj.getHours(),min:dateObj.getMinutes()}
    feedback.innerHTML = ""
    _msg.value = ""
    if (msg.length == 0) {
        return false
    } else {
        sock.emit('message', { message: msg.trim(), user: usr.trim(),date:date});
    }

});

sock.on("message", (data) => {
    feedback.innerHTML = ""
    let messageData = JSON.parse(data)
    console.log(messageData)
    let div = document.createElement("div");
    let p = document.createElement("p");
    let name = document.createElement("p");
    let date = document.createElement("span")
    date.setAttribute('id','date-span')
    date.innerHTML = `${messageData.date.hour}:${messageData.date.min}`
    name.innerHTML = messageData.user;
    name.style.color = 'black'
    p.innerHTML = messageData.message;
    div.appendChild(name);
    div.appendChild(p);
    div.setAttribute("class", "message");
    p.setAttribute('class','h5')
    name.setAttribute('class','h5')
    hold.appendChild(div)
});



_msg.addEventListener("keyup", () => {
    let usr = document.getElementById("usrsNum").innerHTML
    sock.emit("typing", usr);
});

sock.on("typing", (data) => {
    console.log(data)
    feedback.innerHTML = `${data} is typing...`
});


// sock.on('old is gold',(docs)=>{
//     console.log(docs)
//     for (let doc of docs) {
//     loadMessage(doc)
//             .then((div)=>{
//         hold.appendChild(div)
//     })
//     }
// })
// function loadMessage(data)
// {
//         return new Promise((res,rej)=>{
//         let div = document.createElement("div");
//         let p = document.createElement("p");
//         let span = document.createElement("span");
//         let name = document.createElement("strong");
//         name.innerHTML = data.auther
//         p.innerHTML = data.body
//         span.innerHTML = data. = {day:dateObj.getDate(),hour:dateObj.getHours(),min:dateObj.getMinutes()}
//         div.appendChild(name);
//         div.appendChild(p);
//         div.setAttribute("class","container bg-info message");
//         div.setAttribute('id','msg')
//         res(div)
//         rej(null)
//     })
// }