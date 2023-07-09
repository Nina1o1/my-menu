const initialState = [
  {
    "_id": "123",
    "name": "boiled egg",
    "categories": ["fav"], // name of category, rather than id
    "note": "Heathy and easy!",
    "image": "", // TODO: link to dish image
    "steps": [
      {
        "description": "boil the water till bubbling",
        "image": ""
      },
      {
        "description": "boil the egg for 5 minutes"
      },
    ],
    "ingredients": [
      {
        "item": "egg",
        "amount": "as you want"
      },
      {
        "item": "water",
        "amount": "pour until eggs aresubmerged"
      }
    ]
  },

  {
    "_id": "345",
    "name": "scramhled egg",
    "categories": [],
    "note": "Oily but still healthy!",
    "image": "",
    "steps": [
      {
        "description": "heat the oil and the pan",
      },
      {
        "description": "pour the egg in and stir"
      },
    ],
    "ingredients": [
      {
        "item": "egg",
        "amount": "as you want"
      },
      {
        "item": "oil"
      }
    ]
  }
]

function recipesSlice (state = initialState, action) {
  switch(action.type) {
    case "" : {

    }
    default :
      return state;
  }
}

export default recipesSlice;