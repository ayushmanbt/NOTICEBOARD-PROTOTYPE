ul = document.getElementById("main");
content_holder = document.getElementById("post");
author_holder = document.getElementById("author");

//dummy_fillup();

var db = firebase.firestore();
collection = db.collection("notices");

var notices = collection.onSnapshot(
    function(snap) {
        snap.docChanges().forEach(
            (change) => {
                if(change.type === "added"){
                    dat = change.doc.data()
                    content_creation(dat.content, dat.author, dat.date)
                }
            }
        )
    }
)




async function su(event) {
    event.preventDefault();
    content = content_holder.value;
    author = author_holder.value;
    date = new Date()
    await collection.add({
        content: content,
        author: author,
        date: date
    })
    content_holder.value = "";
    author_holder.value = "";
}

// async function dummy_fillup(){
//     const data = await fetch("posts.json").then((res) => {
//         return res.json();
//     });
//     ar = data["response"]
//     ar.forEach(e => {
//         content_creation(e.content, e.author, e.date);
//     });
// }

function content_creation(content, author, date){
    li = document.createElement("li");
    h1 = document.createElement("h1");
    p1 = document.createElement("p");
    p2 = document.createElement("p");
    p1.innerHTML = content
    p2.innerHTML = "- " + author
    h1.innerHTML = date.toString().slice(0,24);
    p1.setAttribute("class","suthor");
    p1.setAttribute("class","body");
    li.appendChild(h1);
    li.appendChild(p1);
    li.appendChild(p2);
    ul.appendChild(li);
}