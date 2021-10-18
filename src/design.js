const { Button } = require("bootstrap");

module.exports={
    navBar:()=>{
        const nav=document.createElement('nav');
        nav.className="navbar navbar-expand-lg navbar-dark bg-primary";
        const divC=document.createElement('div');
        divC.className="container-fluid";
        const a=document.createElement('a');
        a.className="navbar-brand";
        const btn=document.createElement('button');
        btn.className="navbar-toggler";
        btn.setAttribute("data-bs-toggle","collapse");
        btn.setAttribute("data-bs-target","#navbarNav");
        btn.setAttribute("aria-controls","navbarNav");
        btn.setAttribute("aria-expanded","false");
        btn.setAttribute("aria-label","Toggle navigation");
        const span=document.createElement('span');
        span.className="navbar-toggler-icon";
        btn.appendChild(span);
        const img=document.createElement('img');
        img.className="d-inline-block align-text-top";
        //img.alt="logo";
        img.width="45";
        img.height="45";
        img.src="http://www-cdr.stanford.edu/~petrie/blank.gif";
        img.className="imgLogo";
        a.appendChild(img);
        divC.appendChild(a);
        divC.appendChild(btn);
        const divA=document.createElement('div');
        divA.className="collapse navbar-collapse";
        divA.id="navbarNav";
        const ul=document.createElement('ul');
        ul.className="navbar-nav";

        const li1=document.createElement('li');
        li1.className="nav-item";
        const a1=document.createElement('a');
        a1.className="nav-link active";
        a1.innerHTML="Home";
        a1.setAttribute("aria-current","page");
        li1.appendChild(a1);
        ul.appendChild(li1);

        const li3=document.createElement('li');
        li3.className="nav-item";
        const a3=document.createElement('a');
        a3.className="nav-link active";
        a3.innerHTML="Tab";
        li3.appendChild(a3);
        ul.appendChild(li3);

        const li2=document.createElement('li');
        li2.className="nav-item";
        const a2=document.createElement('a');
        a2.className="nav-link active";
        a2.innerHTML="About";
        li2.appendChild(a2);
        ul.appendChild(li2);
        divA.appendChild(ul);
        divC.appendChild(divA);
        nav.appendChild(divC);
        return nav;
    },
    card:(url,title="Title",description="Description.",classes="")=>{
        let card=document.createElement('div');
        card.className="card glass "+classes;
        let img=document.createElement('img');
        img.className="card-img-top menuImg";
        img.src=url;
        let cardBody=document.createElement('div');
        cardBody.className="card-body";
        let h=document.createElement('h5');
        h.className="card-title";
        h.innerText=title;
        let p=document.createElement('p');
        p.className="card-text";
        p.innerText=description;
        cardBody.appendChild(h);
        cardBody.appendChild(p);
        card.appendChild(img);
        card.appendChild(cardBody);
        return card;
    },
    /*
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
    */
    searchbar:()=>{
        let form=document.createElement('form');
        let input = document.createElement('input');
        let submit = document.createElement('button')
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let path = document.createElementNS('http://www.w3.org/2000/svg',"path");
        path.setAttributeNS(null,"d","M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z");
        svg.setAttribute("viewbox","0 0 50 50");
        svg.setAttribute("fill","currentColor");
        svg.setAttribute("class","bi bi-search")
        svg.setAttribute("width","50");
        svg.setAttribute("height","50")
        form.className="search";
        input.type="text";
        input.className="searchInput";
        input.placeholder="Search for city...";
        submit.type="button";
        submit.className="searchSubmit"
        submit.onclick=(e)=>{
            form.submit();
        }
        svg.appendChild(path);
        submit.appendChild(svg);
        form.appendChild(input);
        form.appendChild(submit);
        return form;
    },
}