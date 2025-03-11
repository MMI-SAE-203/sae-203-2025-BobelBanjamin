/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_91977388")

  // remove field
  collection.fields.removeById("file749160980")

  // add field
  collection.fields.addAt(9, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "url749160980",
    "name": "ba",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_91977388")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "file749160980",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "ba",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // remove field
  collection.fields.removeById("url749160980")

  return app.save(collection)
})
