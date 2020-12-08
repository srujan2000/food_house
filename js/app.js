const products = document.querySelector('#products .row');

products.addEventListener('click',check);


function getItems(){
    let items;
    if(localStorage.getItem('addtocart') === null){
        items= [];
    }
    else{
        items = JSON.parse(localStorage.getItem('addtocart'))
    }

    return items;
}


function check(e){
    const price = e.target.attributes.price.value
    const name = e.target.attributes.name.value 
    const image = e.target.attributes.image.value
    const err = e.target.parentElement.parentElement;
    
    console.log(err)
    
    const arr = [price,name,image,1];
    addtols(arr,err);
}

function checkifexists(arr){

    let items = getItems();

    for (item of items){
         if(item[1] === arr[1]){
            //  alert(`${arr[1]} is already added in the cart`);
             return false;
         }
    }
    return true;

}

function addtols(arr,err){
    let items = getItems();

    if(checkifexists(arr)){
        items.push(arr);

        localStorage.setItem('addtocart',JSON.stringify(items))
        err.innerHTML+=`
        <div class="remblue"> Added to the cart</div>  `
    }else{
        err.innerHTML+=`
        <div class="remred"><span>!</span> Already in the cart</div>  `
    }

    setTimeout(function(){
        location.reload();
    },100)
}


if(getItems().length === 0){
    document.getElementById('cartNo').innerHTML = ''
}else{
    document.getElementById('cartNo').innerHTML = ` ${getItems().length}`
}
    
