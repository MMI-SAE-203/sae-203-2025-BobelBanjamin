/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2427533966")

  // update collection data
  unmarshal({
    "name": "activites"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2427533966")

  // update collection data
  unmarshal({
    "name": "Activites"
  }, collection)

  return app.save(collection)
})
