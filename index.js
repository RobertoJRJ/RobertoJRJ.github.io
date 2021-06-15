let model, labels;
 
 const classify = async (inputs) => {
   const results = await model.classify(inputs);
   return inputs.map((d, i) => {
     const obj = {'text': d};
     results.forEach((classification) => {
       obj[classification.label] = classification.results[i].match;
     });
     return obj;
   });
 };
 
 const addPredictions = (predictions) => {
   const tableWrapper = document.querySelector('#table-wrapper');
 
   predictions.forEach(d => {
     const predictionDom = `<div class="row">
       <div class="text">${d.text}</div>
       <div class="text">${d.toxicity}</div>
   
     </div>`;
     tableWrapper.insertAdjacentHTML('beforeEnd', predictionDom);
   });
   console.log(predictions[0])
   let c=0;

   predictions.forEach(d => {
       if(d.insult==true || d.identity_attack==true || d.obscene==true || d.severe_toxicity==true || d.sexual_explicit==true || d.threat==true || d.toxicity==true){
        console.log("el comentario tiene un mensaje negativo")
        alert("el comentario tiene un mensaje negativo");
       }else{
        console.log("el comentario no es negativo") 
        alert("el comentario no es negativo");
       }
   console.log(d.insult)
});

 };
 
 const predict = async () => {
   model = await toxicity.load();
   labels = model.model.outputNodes.map(d => d.split('/')[0]);
 console.log(labels)
   const tableWrapper = document.querySelector('#table-wrapper');
   
 

 
   document.querySelector('#classify-new')
       .addEventListener('submit', (e) => {
         const text = document.querySelector('#classify-new-text-input').value;
         const predictions = classify([text]).then(d => {
           addPredictions(d);
         });
 
         // Prevent submitting the form which would cause a page reload.
         e.preventDefault();
       });
 };
 
 predict();