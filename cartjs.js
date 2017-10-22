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

    var numForCart = 0;
    document.getElementById("numForCart").innerHTML = JSON.parse(localStorage.getItem("numForCart"));

    var dataFromCart = JSON.parse(localStorage.getItem("thingsInCartArray"));
    console.log(dataFromCart);

    if (dataFromCart == null) {}

    else {
        var arrayLength = dataFromCart.length;
    }

    for (var i = 0; i < arrayLength; i++) {
        $("#cartTable").append('<tr id=item' + [i] +'></tr>');
        $("#item" + [i]).append('<td>' + dataFromCart[i].amount + "  servings" + "  of  " + '</td>' + '<td>' + dataFromCart[i].packageType + '</td>' +
            '<td>' + dataFromCart[i].flavor1 + '</td>' + '<td>' + dataFromCart[i].flavor2 + '</td>' + '<td>' + " $" + dataFromCart[i].price) + '</td>';
        $("#item" + [i]).append('<button class=removeButton id=' + [i] + '>Remove Item</button>');
        console.log("#item" + [i]);
        }

    $('.removeButton').click(function(){
        var itemPosition = $(this).attr('id');
        var numToRemove = dataFromCart[itemPosition].amount;
        var currCartNum = JSON.parse(localStorage.getItem("numForCart"));
        currCartNum = currCartNum - numToRemove;
        console.log("cart info new: " + currCartNum);
        localStorage.setItem("numForCart", JSON.stringify(currCartNum));
        document.getElementById("numForCart").innerHTML = JSON.parse(localStorage.getItem("numForCart"));

        $("#item"+itemPosition).remove();
        dataFromCart.splice(itemPosition, 1);
        localStorage.setItem("thingsInCartArray", JSON.stringify(dataFromCart));
            });

/* End of doc ready */
});



