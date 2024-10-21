function calculateTotalSpentByCategory(transactions) {
   const categoryTotal = {};

   for(let i = 0; i<transactions.length; i++){
    let category = transactions[i].category;
    let price = transactions[i].price;

    if(!categoryTotal[category])
      categoryTotal[category] = 0;
   

   categoryTotal[category]+=price;
}

 console.log(categoryTotal);
      
  const result = [];
   for(let category in categoryTotal){
    result.push({
      category: category,
      totalSpent: categoryTotal[category]
    })
   }
  return result;
}

module.exports = calculateTotalSpentByCategory;
