var test = (function(){

   var $elems = {
      product: null,
      heading: null,
      description: null,
      features: null
   };

   var selectors = {
      product: 'product',
      productHeading: 'product__heading',
      productDescription: 'product__description',
      features: 'features',
      featureItem: 'features__item',
      featureItemIcon: 'features__item-icon',
      featureItemTitle: 'features__item-title',
      dataFeatureId: 'data-feature-id'
   };

   return {

      init: init, // Let accesible the function / method for external invoke, it depends on the external call for start

      getHeadingText:()=>{
        if($elems.heading) return $elems.heading.textContent;
        return null;
      },

      hasFeature:hasFeature

   };

   async function getData(params={}) {
      return await fetch(`https://ivangarzon.dev/git/ag/product.json?id=${ params?.id }`, { method: 'GET' }).then((response) => { return response.json(); });
   }


   function hasFeature (featureId){

      if($elems.features){

          var featureListItems = $elems.features.querySelectorAll(`.${selectors.featureItem}`);
          if(!featureListItems) return false;

          for(var i = 0; i < featureListItems.length; i++){
              if(!featureListItems[i].hasAttribute(selectors.dataFeatureId)) continue;
              var foundFeatureId = featureListItems[i].getAttribute(selectors.dataFeatureId);
              if(foundFeatureId === featureId) return true;
          }

      }

      return false;

   }

   function newFeatureBox(featureItem){

      if(featureItem?.id && hasFeature(featureItem?.id)) return false;

      var   $listItem = document.createElement('li'), // Create a new element type <li></li> in the DOM
            $iconBox = document.createElement('div'), // Create a new element type <div></div> in the DOM
            $titleBox = document.createElement('div'), // Create a new element type <div></div> in the DOM
            $descriptionBox = document.createElement('div'); // Create a new element type <div></div> in the DOM

      $listItem.classList.add(selectors.featureItem); // Add class value to the element created <li></li> and that is in process of render yet
      $iconBox.classList.add(selectors.featureItemIcon, `icon-${featureItem.icon}`);
      $titleBox.classList.add(selectors.featureItemTitle);
      $titleBox.innerHTML = featureItem?.title; // Create a node text for the content, I changed for allow html insert
      $descriptionBox.innerHTML = featureItem?.description; // Create a node text for the content, I changed for allow html insert

      if (featureItem?.id) $listItem.setAttribute(selectors.dataFeatureId, featureItem?.id); //Create an attribute (if id exists) into the element with the value that comes from id propertie, it's going to add something like data-feature-id="X" in the code
      $listItem.prepend($iconBox, $titleBox, $descriptionBox); // Add the element adding it to the last part of the object in DOM we are working on yet (<li></li>)
      return $listItem;

   }

   async function init(params={}) {

      var   dataEndPoint = await getData({ id:params?.id }), // Get Data from EndPoint
            headingText = dataEndPoint?.title, // Set the product title
            descriptionText = dataEndPoint?.description, // Set the description title
            featuresList = dataEndPoint?.features ? dataEndPoint?.features : []; // Set all the list of features

      $elems.product = document.querySelector(`.${selectors.product}`); // Select the object based on its className ( class="product" )
      $elems.heading = $elems.product.querySelector(`.${selectors.productHeading}`); // Select the object based on its className ( class="product__heading" )
      $elems.description = $elems.product.querySelector(`.${selectors.productDescription}`); // Select the object based on its className ( class="product__description" )
      $elems.features = $elems.product.querySelector(`.${selectors.features}`); // Select the object based on its className ( class="features" )

      if ($elems?.heading && headingText) $elems.heading.textContent = headingText; // The object exists, so we can set the text (content) inside of the element that function gets in first parameter "headingText"

      if ($elems?.description && descriptionText) { // Check if the object 'description' exists in the DOM

         var   $newP = document.createElement('p'), // Create a new element type <p></p> in the DOM 
               textNode = document.createTextNode(descriptionText); // Create a node text for the content

         $newP.appendChild(textNode); // Insert the HTML or Simple Text into the <p></p> tag
         $elems.description.appendChild($newP); // Render the element and add at the last par of the description box

      }

      if ($elems.features && featuresList) { // Check if the object 'features' exists in the DOM

         var $list = document.createElement('ul'); // Create a new element type <ul></ul> (common use for lists or ) in the DOM 

         for (featureItem of featuresList) { // Iteration of the elements received in features in the third parameter of the function
            if(!featureItem?.description) continue; // If the value in the property of object called text is empty just pass to the next element in the array
            var listItem = newFeatureBox(featureItem);
            if(listItem) $list.appendChild(listItem); // Add the element to the parent wrap we created previous <ul></ul>
         }

         $elems.features.appendChild($list); // Finally add all the <UL> list to the features box

      }

   }

})();