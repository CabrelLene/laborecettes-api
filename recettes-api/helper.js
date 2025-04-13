 
function validateRecipeData(data) {
    // Pour cet exemple, une recette doit avoir au minimum un titre (title) et des ingrédients (ingredients)
    if (!data.title || !data.ingredients) {
      return false;
    }
    return true;
  }
  module.exports = {
    validateRecipeData
  };