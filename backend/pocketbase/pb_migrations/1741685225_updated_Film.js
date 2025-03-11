/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_91977388")

  // remove field
  collection.fields.removeById("date1010815986")

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text999544516",
    "max": 0,
    "min": 0,
    "name": "Sortie",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select2203071480",
    "maxSelect": 3,
    "name": "genre",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Animation",
      "Comédie",
      "Aventure"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_91977388")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "date1010815986",
    "max": "",
    "min": "",
    "name": "sortie",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // remove field
  collection.fields.removeById("text999544516")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select2203071480",
    "maxSelect": 1,
    "name": "genre",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Animation",
      "Comédie",
      "Horreur"
    ]
  }))

  return app.save(collection)
})
