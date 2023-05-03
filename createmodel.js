AFRAME.registerComponent("city", {
    init: async function () {

        //Get the compund details of the element
        var compounds = await this.getCompounds();

        var barcodes = Object.keys(compounds);

        barcodes.map(barcode => {
            var element = compounds[barcode];

            //Call the function
            this.createAtoms(element);
        });

    },
    createModel: function (model) {
        var barcodeValue = model.barcode_value
        var modelUrl = model.model_url
        var modelName = model.model_name
        var scene = document.querySelector("a-scene")
        var marker = document.createAttribute("a-marker")

        marker.setAttribute("id", `maker-${modelName}`)
        marker.setAttribute("type", "barcode")
        marker.setAttribute("model_name", modelName)
        marker.setAttribute("value", barcodeValue)
        marker.setAttribute("markerhandler", {})
        scene.appendChild(marker)

        if (barcodeValue === 0) {
            var modelEl = document.createElement("a-entity")
            modelEl.setAttribute("id", `${modelName}`)
            modelEl.setAttribute("geometry", {
                primitive: "box",
                width: model.width,
                height: model.height
            })
            modelEl.setAttribute("position", model.position)
            modelEl.setAttribute("rotation", model.rotation)
            modelEl.setAttribute("material", {
                color: model.color
            })
            marker.appendChild(modelEl)

        } else {
            var modelEl = document.createElement("a-entity")
            modelEl.setAttribute("Id", `${modeName}`)
            modelEl.setAttribute("gltf-model", `url(${modelUrl})`)
            modelEl.setAttribute("scale", model.scale)
            modelEl.setAttribute("position", model.position)
            modelEl.setAttribute("rotation", model.rotation)
            marker.appendChild(modelEl)
        }
    }
}
