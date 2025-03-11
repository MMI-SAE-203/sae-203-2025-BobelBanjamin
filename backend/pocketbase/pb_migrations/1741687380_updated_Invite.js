/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4150093999")

  // remove field
  collection.fields.removeById("editor3885137012")

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3885137012",
    "max": 0,
    "min": 0,
    "name": "email",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4150093999")

  // add field
  collection.fields.addAt(6, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor3885137012",
    "maxSize": 0,
    "name": "email",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // remove field
  collection.fields.removeById("text3885137012")

  return app.save(collection)
})
