/* Object Constructor*/
function cartItem(packageType, amount, flavor1, flavor2, price){
    this.packageType=packageType;
    this.amount=amount;
    this.flavor1=flavor1;
    this.flavor2=flavor2;
    this.price=price;
}

/* Initializing and setting global variable current price of all items to 1 ($1) for now */
var currPrice = 1;

/* Starting a JQuery document ready function to make sure the DOM is ready for JS */
$( document ).ready(function() {
    console.log( "ready!" );

    //Passing numForCart to local storage
    document.getElementById("numForCart").innerHTML = JSON.parse(localStorage.getItem("numForCart"));
    //Passing cart items into new variable
    var dataFromCart = JSON.parse(localStorage.getItem("thingsInCartArray"));
    console.log(dataFromCart);

    /* Using a switch statement to bundle actions together */
    document.getElementById("bun-pack-type").onchange = function(){
        switch(document.getElementById("bun-pack-type").value) {
        //Dropdown option: Six Pack of Original Buns
        case "Six Pack":
            //image from Tesco: https://img.tesco.com/Groceries/pi/000/0286020000000/IDShot_540x540.jpg
            document.getElementById("mainBun").src="./Assets/sixpackrolls.jpg";
            //Price text
            document.getElementById("showP").innerHTML = "$5 per six pack";
            //Description text
            document.getElementById("showDesc").innerHTML = "Get them by the six pack!";
            //First flavor dropdown
            document.getElementById("first-flavor").style.display='block';
            //Second flavor dropdown
            document.getElementById("second-flavor").style.display='block';
            //using global variable for prive value to later pass into cart
            currPrice = 5;
            break;

        //Dropdown option: Single Bun
        case "Single":
            document.getElementById("mainBun").src="./Assets/originalbun.jpg";
            document.getElementById("showP").innerHTML = "$1 per single bun";
            document.getElementById("showDesc").innerHTML = "Get them one at a time!";
            document.getElementById("first-flavor").style.display='none';
            document.getElementById("second-flavor").style.display='none';
            currPrice = 1;
            break;

        //Dropdown option: Dozen Original Buns
        case "Dozen Pack":
            //image from WalMart: https://i5.walmartimages.com/asr/4ac34003-9e2c-40e9-ad98-c2edc7974d8b_1.7719a321fbd636849bd03dba73969a09.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF
            document.getElementById("mainBun").src="./Assets/dozenpackrolls.jpg";
            document.getElementById("showP").innerHTML = "$11 per dozen";
            document.getElementById("showDesc").innerHTML = "Get them by the dozen!";
            document.getElementById("first-flavor").style.display='block';
            document.getElementById("second-flavor").style.display='block';
            currPrice = 11;
            break;

        //Dropdown option: Six Pack of Mixed Buns
        case "Six Pack Mixed Flavors":
            //image from Tesco: https://img.tesco.com/Groceries/pi/000/0286020000000/IDShot_540x540.jpg
            document.getElementById("mainBun").src="./Assets/sixpackrollsextra.jpg";
            document.getElementById("showP").innerHTML = "$5 per six pack";
            document.getElementById("showDesc").innerHTML = "Get them by the six pack - pick some more flavors!";
            document.getElementById("first-flavor").style.display='block';
            document.getElementById("second-flavor").style.display='block';
            currPrice = 5;
            break;

        //Dropdown option: Dozen of Mixed Buns
        case "Dozen Pack Mixed Flavors":
            //image from WalMart: https://i5.walmartimages.com/asr/4ac34003-9e2c-40e9-ad98-c2edc7974d8b_1.7719a321fbd636849bd03dba73969a09.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF
            document.getElementById("mainBun").src="./Assets/dozenpackrollsmixed.jpg";
            document.getElementById("showP").innerHTML = "$11 per dozen";
            document.getElementById("showDesc").innerHTML = "Get them by the dozen - pick some more flavors!";
            document.getElementById("first-flavor").style.display='block';
            document.getElementById("second-flavor").style.display='block';
            currPrice = 11;
            break;
        }
    }

    /* Manipulating number at the top of the page by the cart icon */
    var numForCart = 0;
    //creating click event -- add is my button
    document.getElementById("add").addEventListener("click", addCart)
    //Function that grabs the amount of product from the page and adds it to the cart counter
    function addCart() {
        console.log( "function ready!" );
        //Mary Beth helped with the shorthand syntax for += +
        numForCart += + document.getElementById("amount-select").value;
        console.log(numForCart)
        localStorage.setItem("numForCart", JSON.stringify(numForCart));
        document.getElementById("numForCart").innerHTML = JSON.parse(localStorage.getItem("numForCart"));
    }

    /* Passing selected items into local storage*/
    document.getElementById("add").addEventListener("click", storeItem)
    //Function that passes each dropdown value into local storage
    function storeItem() {
        //Get package type
        var chosenPackageType = document.getElementById("bun-pack-type");
        //Pass value to variable
        var chosenPackageTypeValue = chosenPackageType.options[chosenPackageType.selectedIndex].value;
        //Get quantity amount
        var chosenAmount = document.getElementById("amount-select");
        //Pass value to variable
        var chosenAmountValue = chosenAmount.options[chosenAmount.selectedIndex].value;
        //Create variable that multiplies amount of items times their price for accurate cart pricing
        var chosenPriceValue = chosenAmountValue * currPrice;
        console.log("print num:" + chosenAmountValue + "print price:" + chosenPriceValue);
        //IF statement that makes first & second flavor options invisible in the cart
        if (chosenPackageTypeValue == "single") {
            var chosenFirstFlavorValue = " ";
            var chosenSecondFlavorValue = " ";
        }
        else {
        //Get first flavor
        var chosenFirstFlavor = document.getElementById("dropdown1");
        //Pass value to variable
        var chosenFirstFlavorValue = chosenFirstFlavor.options[chosenFirstFlavor.selectedIndex].value;
        //Get second flavor
        var chosenSecondFlavor = document.getElementById("dropdown2");
        //Pass value to variable
        var chosenSecondFlavorValue = chosenSecondFlavor.options[chosenSecondFlavor.selectedIndex].value;
    }

    //Pass all variables into array
    var userChoice = new cartItem(chosenPackageTypeValue, chosenAmountValue, chosenFirstFlavorValue, chosenSecondFlavorValue, chosenPriceValue);
    //Adding array into local storage
    var thingsInCart = JSON.parse(localStorage.getItem("thingsInCartArray")) || [];
    thingsInCart.push(userChoice);
    //Converting to strings
    localStorage.setItem("thingsInCartArray", JSON.stringify(thingsInCart));
    console.log(thingsInCart);
    }

/* End of doc ready */
});



