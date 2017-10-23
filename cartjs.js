/* Object Constructor*/
function cartItem(packageType, amount, flavor1, flavor2, price){
    this.packageType=packageType;
    this.amount=amount;
    this.flavor1=flavor1;
    this.flavor2=flavor2;
    this.price=price;
}

/* Starting a JQuery document ready function to make sure the DOM is ready for JS */
$( document ).ready(function() {
    console.log( "ready!" );
    //Initializing number of items in cart & setting to 0
    var numForCart = 0;
    //Grabbing current number of items in cart from local storage
    document.getElementById("numForCart").innerHTML = JSON.parse(localStorage.getItem("numForCart"));
    //Grabbing array of items from product page
    var dataFromCart = JSON.parse(localStorage.getItem("thingsInCartArray"));
    console.log(dataFromCart);

    /* Creating an if/else statement to display nothing or pass array length into variable */
    if (dataFromCart == null) {
    }
    else {
        var arrayLength = dataFromCart.length;
    }
    /* For loop that runs the length of array to pull all data  */
    for (var i = 0; i < arrayLength; i++) {
        //Adding table row with all data from array with the name that includes the position within array
        $("#cartTable").append('<tr id=item' + [i] +'></tr>');
        //Adding in each individual data point & placing into separate cell
        $("#item" + [i]).append('<td>' + dataFromCart[i].amount + "  servings" + "  of  " + '</td>' + '<td>' + dataFromCart[i].packageType + '</td>' +
            '<td>' + dataFromCart[i].flavor1 + '</td>' + '<td>' + dataFromCart[i].flavor2 + '</td>' + '<td>' + " $" + dataFromCart[i].price) + '</td>';
        //Adding a remove button at the end
        $("#item" + [i]).append('<button class=removeButton id=' + [i] + '>Remove Item</button>');
        console.log("#item" + [i]);
    }
    /* Creating a remove button - Mary Beth helped with this one as well */
    $('.removeButton').click(function(){
        //Initializing variable that grabs previous position
        var itemPosition = $(this).attr('id');
        //Initializing variable that grabs amount to remove from cart
        var numToRemove = dataFromCart[itemPosition].amount;
        //Grabbing current cart value
        var currCartNum = JSON.parse(localStorage.getItem("numForCart"));
        //Subtracting amount to remove from current cart amount
        currCartNum = currCartNum - numToRemove;
        console.log("cart info new: " + currCartNum);
        //Storing it back into local storage
        localStorage.setItem("numForCart", JSON.stringify(currCartNum));
        document.getElementById("numForCart").innerHTML = JSON.parse(localStorage.getItem("numForCart"));
        //Removing cart item from local storage
        $("#item"+itemPosition).remove();
        dataFromCart.splice(itemPosition, 1);
        localStorage.setItem("thingsInCartArray", JSON.stringify(dataFromCart));
    });
    /* End of doc ready */
});