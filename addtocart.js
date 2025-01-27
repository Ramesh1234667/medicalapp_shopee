window.onload=function(){
    const cart=document.querySelector('.cartBox');

    //adding data to localStorage
    const btn=document.getElementsByClassName('btn');
    console.log(btn);
    let items= [];
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click",function (e) {
            
            if(typeof(Storage) !=='undefined'){
                console.log(e.target);
                let item={
                  //  id:document.getElementById('div').dataset.value,
                    id:e.target.parentElement.children[0].textContent,
                    name:e.target.parentElement.children[1].textContent,
                    price:e.target.parentElement.children[3].children[0].textContent,
                    quantity:1
                };
                console.log("inside",item);
                if(localStorage.getItem('items') === null){
                    console.log("inside",item);
                    items.push(item);
                    localStorage.setItem("items",JSON.stringify(items));
                    window.location.reload();
                }
                else{
                    const localItems=JSON.parse(localStorage.getItem("items"));
                    localItems.map(data=>{
                        if (item.id == data.id) {
                            item.quantity=data.quantity + 1;
                        }
                        else{
                            items.push(data);
                        }
                    });
                    items.push(item);
                    localStorage.setItem('items',JSON.stringify(items));
                    window.location.reload();
                }
            }
            else{
                alert('local storage is not working on your browser');
            }
        });
        
    }
    
    //adding data to cart
    //const cTable=cart.querySelector('.cart table');
    const cTable= cart && cart.querySelector("table");
    let t_data= '';
    t_data+='<tr><th>S No.</th><th>Item Name</th><th>Item Quantity</th><th>Item Price</th><th>Remove Items</th></tr>';
    if ( localStorage.getItem('items')===null) {
        t_data+='<tr><td colspan="5">No items found</td></tr>'
        
    }else{
        console.log("hello");
        JSON.parse(localStorage.getItem('items')).map(data=>{
            t_data+='<tr><th>'+data.id+'</th><th>'+data.name+'</th><th>'+data.quantity
            +'</th><th>'+data.price+'</th><th><a href="cart.html" onclick=Delete(this);>Delete</a></th></tr>';

        });

    }
    console.log(localStorage.getItem('items'));
    if(cTable !=null)
    cTable.innerHTML = t_data;

          /*calculating no of quantity*/
          let cP=document.querySelector('.cartBox p span');
          let quantity=0
          if(localStorage.getItem('items') !=null)
          JSON.parse(localStorage.getItem('items')).map(data=>{
              quantity=quantity+data.quantity
          });
          if(cP !=null)
          cP.innerHTML = quantity;
     
}