let btn=document.getElementById("add_btn")
btn.addEventListener("click",addItem)
function addItem(event){
    event.preventDefault();
    var price=document.getElementById("price").value;
    var product=document.getElementById("product").value;
    var select=document.getElementById('select').value;
      console.log(price)
      console.log(product)
      console.log(select)
    const obj={

        price,
        product,
        select
    }

    axios.post("https://crudcrud.com/api/f89f1a4e344f4b1699ed48b032828af3/selleradmin",obj)
    .then((res)=>{
        showOnscreen(res.data);
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })
    
    
}
window.addEventListener("DOMContentLoaded",() =>{
    axios.get("https://crudcrud.com/api/f89f1a4e344f4b1699ed48b032828af3/selleradmin")
    .then((res)=>{
      //  console.log(res)
        for(var i=0;i<res.data.length;i++){
            showOnscreen(res.data[i]);
        }
    })
    .catch((err)=>{
        console.log(err)
    })
 })

function showOnscreen(user){
    document.getElementById("price").value="";
    document.getElementById("product").value="";
    document.getElementById("select").value="";

    var parent=document.getElementById("ul-list");

    var child=`<h3>${user.select}</h3> <li id="user._id" >${user.price}-${user.product}
     <button onClick="deleteUser('${user._id}')">Delete</button>  <button onClick="editUser('${user._id}','${user.price}','${user.product}')" >Edit</button>  </li>`
    parent.innerHTML=parent.innerHTML+child;
}

function deleteUser(userId){
    
 axios.delete(`https://crudcrud.com/api/f521b27cd7dd46069fc1c3ca462d2e3c/${userId}`)
 .then((res)=>{
    remove(userId);
 })
 .catch((err)=>{
    console.log(err);
 })
}
function editUser(userId,price,product){
    document.getElementById('price').value=price;
    document.getElementById('product').value=product;
    

     deleteUser(userId)
  }

function remove(userId){
  var parent=document.getElementById("ul-list");
  var child=document.getElementById(userId);
  if(child){
    parent.removeChild(child);
  }
}