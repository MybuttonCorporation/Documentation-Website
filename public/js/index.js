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
    <div id="${d.name}"></div>
    <div id="centered"><b>${d.title}</b></div>
    <div id="description">${d.desc}</div>
    <div id="spaced">${d.last_updated}</div>
</div>`
        });
        const docum = document.getElementById("document");
        docum.onclick = function() {
            let data1 = docum.innerHTML;
            let datas = data1.split('</div>');
            let dataimp = datas[0];
            let very = dataimp.split('<div id="')[1].split('"')[0];
            window.location.href = "http://docs.mybutton.org:8000/docs/"+very.replaceAll('.json', '');
        };
    });

}, 1);