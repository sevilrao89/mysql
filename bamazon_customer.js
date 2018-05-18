var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  // password : 'secret',
  database : 'bamazon'


});

var inquirer = require('inquirer');
inquirer.prompt([
  {
  message: "What's the item id of the product you are interested in?",
  type: "input",
  name: "id",
  validate: validateNumber
},
{
    message: "how many units of the product would you like to buy?",
    type: "input",
    name: "buyquantity",
    validate: validateNumber
}


]).then(answers => {
    console.log(answers)
    //connection.connect(function(err) {
      //if (err) throw err;
      connection.query("SELECT item_id, stock_quantity, price FROM products WHERE item_id = " + answers.id , function (err, result) {
        if (err) throw err;
        //console.log(typeof result[0].stock_quantity);
        console.log(result)
        
        if (result.length < 1) {
          console.log("The product does not exist")}
        else {
          console.log("The product does exist!")

        if (Number(answers.buyquantity) < result[0].stock_quantity){
          var total = result[0].price * Number(answers.buyquantity)
          connection.query("UPDATE products SET stock_quantity=" + (result[0].stock_quantity - Number(answers.buyquantity)) + " WHERE item_id=" + answers.id, 
          function (err, result2){
            if(err) console.log(err)

          console.log("Purchase is approved, total cost:" +  total)
          })
          
        }
        else {
          console.log("Purchase is not approved due to lack of quantity")}
        }
        


      });
    //});
});


function validateNumber(quantity){
return !isNaN(quantity)

}




 
// connection.query('SELECT * from products', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// });
 
 


// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.