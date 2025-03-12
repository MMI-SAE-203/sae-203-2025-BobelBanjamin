/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2427533966")

  // remove field
  collection.fields.removeById("relation15428007282")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2427533966")

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4150093999",
    "hidden": false,
    "id": "relation15428007282",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "field",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
