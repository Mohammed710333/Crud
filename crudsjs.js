let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let total=document.getElementById("total")
let count=document.getElementById("count")
let discount=document.getElementById("discount")
let category=document.getElementById("category")
let submit=document.getElementById("submit")
let mood='create'
let tmp;
//get total
function gettotal(){
    if(price.value != ''){
        let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value
        total.innerHTML=result
        total.style.backgroundColor="#040"
    }   
    else{   
        total.style.backgroundColor="brown"
        total.innerHTML="";
    }
}
//create product
let datapro;
if(localStorage.product!=null)(
    datapro=JSON.parse(localStorage.product)
)
else(
    datapro=[]
)   
submit.onclick=function(){
let newpro={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase()
}
//clean data
if(title.value!='' &&count.value<100&&price.value!=""&&category.value!=""){

if(mood === "create"){

if(newpro.count>1){
    for( let i=0; i<newpro.count; i++){
        datapro.push(newpro);
    }
}
else{
    datapro.push(newpro);   
}
}else{
datapro[ tmp ]=newpro;
submit.innerHTML="create"
mood='create'
count.style.display='block'
}
clear()
}
//save localstroge
localStorage.setItem("product",  JSON.stringify(datapro)) 

showdata()
}
//clear data
function clear(){
    title.value=""
    price.value=""
    taxes.value=""
    ads.value=""
    discount.value=""
    count.value=""
    category.value=""
    total.innerHTML=""
    total.style.backgroundColor="brown"
}
//read data
function showdata(){
    gettotal()
    let table='';

   for(i=0 ; i<datapro.length;i++){
    table +=`
    <tr>
    <td>${i+1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updatedata(${i})">update</button></td>
    <td onclick="deletedata(${i})"><button>delete</button></td>
</tr>
    `
   }

    document.getElementById("tbody").innerHTML=table
    let btndelete=document.getElementById("deleteAll")
    if(datapro.length>0){
        btndelete.innerHTML=`
        <button onclick="deleteAll()">Delete All (${i})</button>
        `
    }
    else{
        btndelete.innerHTML=""
    }
}

//delete data
function deletedata(i){
    datapro.splice(i,1)
    localStorage.product=JSON.stringify(datapro) ;
    showdata()
}
function deleteAll(){
   localStorage.clear()
   datapro.splice(0)
   showdata()
}
//update data
function updatedata(i){
    title.value=datapro[i].title
    price.value=datapro[i].price
    taxes.value=datapro[i].taxes
    ads.value=datapro[i].ads
    discount.value=datapro[i].discount
    category.value=datapro[i].category
    gettotal()
    count.style.display='none'  
    submit.innerHTML="Update"
    mood='update'
     tmp=i;
     scroll({top:0, behavior:"smooth"})
}


//search by title &category
let searchmood='title'
function getsearchmood(id){
    let search=document.getElementById("search")
if(id=="search_title"){
    searchmood="title"
    search.placeholder="Search By Title"
}
else{
    searchmood="category"
    search.placeholder="Search By Categorey"
}

search.focus()
}

function searchdata(value){
    let table='';
    if(searchmood=="title"){
        for(let i=0 ;i<datapro.length; i++){
        if(datapro[i].title.includes(value.toLowerCase())){
            table +=`
            <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updatedata(${i})">update</button></td>
            <td onclick="deletedata(${i})"><button>delete</button></td>
        </tr>
            `
        }
        }
    }
    else{
        for(let i=0 ;i<datapro.length; i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                table +=`
                <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updatedata(${i})">update</button></td>
                <td onclick="deletedata(${i})"><button>delete</button></td>
            </tr>
                `
            }
            }
    }
    document.getElementById("tbody").innerHTML=table
}


showdata()