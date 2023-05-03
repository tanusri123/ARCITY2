AFRAME.registerComponent("city", {
    init: async function () {
    },
    getDistance: function (elA, elB) {
        return elA.object3D.position.distanceTo(eB.object3D.position)
    },
    getModelGeometry: function (model, modelName) {
        var barcode = Object.keys(model);
        for (var barcode of barcode) {
            if (model[barcode].model_name === modelName) {
                return {
                    position: models[barcode]["placement_position"],
                    rotation: models[barcode]["placement_rotation"],
                    scale: model[barcode]["pacement_scale"],
                    model_url: models[barcode]["model_url"]
                };
            }
        }
    },
    placeTheModel: function (modelName, models) {
        var isListContainModel = this.isModelPresentInArray(modelList, modelName)
        if (isListContainModel) {
            var distance = null;
            var marker1 = document.querySelector(`#marker-base`);
            var marker2 = document.querySelector(`#marker-${modelName}`);

            distance = this.getDistance(marker1,marker2);
            if(distance<1.25){
                var modelEl = document.querySelector(`#${modelName}`);
                modelEl.setAttribute("visible",false);

                var isModelPlaced = document.querySelector(`#model-${modelName}`);
                if(isModelPlaced === null){
                    var el = document.createElement("a-entity");
                    var modelGeometry = this.getModelGeometry(models,modeName);
                    el.setAttribute("id",`model-${modelName}`);
                    el.setAttribute("gltf-model",`url(${modelGeometry.model_url})`);
                    el.setAttribute("position",modelGeometry.position)
                    el.setAttribute("rotation",modelGeometry.rotation)
                    el.setAttribute("scale",modelGeometry.scale)
                    marker1.appendChild(el)
                }}}},
                
    isModelPresentInArray:function(arr,val){
                    for(var i of arr){
                        if(i.model_name === val){
                            return true
                        }
                    }
                    returnfalse;
                
                },
    tick:async function(){
                    if(modelList.lenght>1){
                        var isBaseModelPresent = this.isModelPresentInArray(modelList,"base");
                        var messageText = document.querySelector("#message-text")

                        if(!isBaseModelPresent){
                            messageText.setAttribute("visible",true);
                        } else{
                            if(model === null){
                                models = await this.getModel()
                            }    
                            messageText.setAttribute("visible",false)
                            this.placeTheModel("road",models)
                            this.placeTheModel("car",models)
                            this.placeTheModel("building1",models)
                            this.placeTheModel("building2",models)
                            this.placeTheModel("building3",models)
                            this.placeTheModel("tree",models)
                            this.placeTheModel("sun",models)
                        }}}
   }
