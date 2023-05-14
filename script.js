let name = document.querySelector('#name');
let email = document.querySelector('#email');
let phone = document.querySelector('#phone');
let adres = document.querySelector('#adress');
let img = document.querySelector('#img')

let btn = document.querySelector('.btn-create');
let list =document.querySelector('.list');

let API = 'http://localhost:8000/products';

btn.addEventListener('click',async function(){
    if(!name.value.trim() || !email.value.trim() || !adres.value.trim() || !phone.value.trim() || !img.value.trim()){
        alert('Заполните поля')
        return;
    }
    let obj = {
        name: name.value,
        email: email.value,
        adres: adres.value,
        phone: phone.value,
        img: img.value
    }
    console.log(obj);

    await fetch(API,{
        method: "POST",
        headers:{
            'Content-Type':'application/json; charset=utf-8'
        },
        body: JSON.stringify(obj)
    })
    
    name.value = "";
    email.value = "";
    adres.value = "";
    phone.value = "";
    img.value = "";

    render()
})

async function render(){
    let contact = await fetch(API).then((res) => res.json()).catch((err) => console.log(err))
    list.innerHTML = ''; 
    contact.forEach(element => {
        console.log(list);        
        let card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
        <img src ="${element.img}">
        <h2>${element.name}</h2>
        <p>email:${element.email}</p>
        <p>номер:${element.phone}</p>
        <p>адресс:${element.adres}</p>
        
        <button onclick="editElement(${element.id})" class="btn-edit">Edit</button>
        <button onclick="deleteElement(${element.id})" class="btn-delete">delete</button>
        `
        list.append(card)
    });
}

render();

async function deleteElement(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    }) 
    render();
}

let modal = document.querySelector('.modal')
let btnEdit = document.querySelector('.btn-edit')
let btnSave = document.querySelector('.btn-save')
let btnClose = document.querySelector('.btn-close')
let app = document.querySelector('.app')
let container = document.querySelector('.container')

let nameEdit = document.querySelector('#name-edit');
let emailEdit = document.querySelector('#email-edit');
let phoneEdit = document.querySelector('#phone-edit');
let adresEdit = document.querySelector('#adress-edit');
let imgEdit = document.querySelector('#img-edit')

 function editElement(id){ 
   modal.style.display = 'block';
   container.style.display = 'none';

    fetch(`${API}/${id}`).then((res)=> res.json()).then((data)=>{
        nameEdit.value = data.name;
        emailEdit.value = data.email;
        phoneEdit.value = data.phone;
        adresEdit.value = data.adres;
        imgEdit.value = data.img

        btnSave.setAttribute('id', id)
    })
}
btnSave.addEventListener('click', function () {
    let id = this.id
    let name = nameEdit.value;
    let email = emailEdit.value;
    let phone = phoneEdit.value;
    let adres = adresEdit.value;
    let img = imgEdit.value

    if(!name || !email || !phone || !adres) {
        return;
    }
    let editedProduct = {
        name,
        email,
        phone,
        adres,
        img,
    }
    saveEdit(editedProduct,id)
})

function saveEdit(editedProduct,id){
    fetch(`${API}/${id}`,{
        method: "PATCH",
        headers:{
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(editedProduct)
    }).then(() => render())

   modal.style.display = 'none';
   container.style.display = 'block';


}
btnClose.addEventListener('click',()=>{
    modal.style.display = 'none';
    container.style.display = 'block';
   document.body.style.backgroundColor = 'white'

})