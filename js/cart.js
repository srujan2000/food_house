let output ='';

function getItems(){
    let items;
    if(localStorage.getItem('addtocart') === null){
        items = []
    }else{
        items = JSON.parse(localStorage.getItem('addtocart'));
    }

    return items;
}

let items = getItems();

if(getItems().length === 0){
    document.getElementById('cartNo').innerHTML = ''
    document.getElementById('cart-items').style.display ='none';

}else{
    document.getElementById('cartNo').innerHTML = ` ${getItems().length}`
    document.querySelector('.noItems').style.display ='none';
    
    for(item of items){
        displayItems(item)
    }
}

function displayItems(item){
    var price = parseInt(item[0]) * parseInt(item[3])
     output +=  `
    <div class="item">
            ${item[2]}
            <h3 id="itemName">${item[1]}</h3>
            <h4>₹${item[0]}</h4>
        </div>
        <div class="quantity">
            <button id="minus" price=${item[0]} name=${item[1]}>&#8722;</button>
            <input value="${item[3]}" disabled id="cartValue">
            <button id="plus" price=${item[0]} name=${item[1]}>&#43;</button>
        </div>
        <div class="price">
            <h1>₹${price}</h1>
        </div>   `

}

document.querySelector('.row2').innerHTML = output;

document.querySelector('.row2').addEventListener('click',incredecr)

function incredecr(e){
       if(e.target.id === 'plus' || e.target.id === 'minus'){
          let name = e.target.parentElement.previousElementSibling.querySelector('#itemName').innerHTML;
          let priceItem = parseInt(e.target.attributes.price.value);
          let price;
        //   let cartDisplay= e.target.parentElement.querySelector('#cartValue');

          items.forEach(function(item,index){
              if(item[1] === name){
                   var cartNo = item[3]

                if(e.target.id === 'plus'){
                    cartNo +=1
                    item[3] = cartNo
                    // cartDisplay.value = item[3]
                    price =  priceItem * cartNo;
                    localStorage.setItem('addtocart',JSON.stringify(items))
                    location.reload();
                }
                if(e.target.id === 'minus'){
                    cartNo = cartNo - 1 
                    item[3] = cartNo
                    if( cartNo === 0){
                        items.splice(index,1);
                        localStorage.setItem('addtocart',JSON.stringify(items))
                        location.reload();
                    }else{
                        // cartDisplay.value = item[3]
                        price =  priceItem * cartNo;
                        localStorage.setItem('addtocart',JSON.stringify(items))
                        location.reload();
                    }
                }
              }
          })
       }
}

var total = 0 

for(item of items){
    total += parseInt(item[0]) * parseInt(item[3]) 
}

document.getElementById('totalAmount').innerHTML = `Total Price: ₹${total}`


    
