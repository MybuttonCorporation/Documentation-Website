const test = document.getElementById("_title");

test.onclick = function() {
    const location = window.location.origin;
    
    window.location.href = location;
};

const container = document.getElementById("container");
setTimeout(() => { test.innerText = "Mybutton Documentation Server" }, 2000);

setTimeout(() => {
    let datas = new Map();
    fetch(location.protocol + '//' + location.hostname+':'+location.port+'/documentation/list').then(async data=>{
        let docs = await data.json();
        docs.docs.forEach(j => {
            datas.set(j.title, j);
        });
        datas.forEach(d=>{
            container.innerHTML += `
<div id="document">
    <div id="centered"><b>${d.title}</b></div>
    <div id="description">${d.desc}</div>
    <div id="spaced">${d.last_updated}</div>
</div>`
        })
    });
}, 1);