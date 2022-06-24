var test = (function test(){

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
      dataFeatureId: 'data-feature-id'
  };

  return {

      init: init, // Let accesible the function / method for external invoke, it depends on the external call for start

      getHeadingText: function getHeadingText(){

        if(typeof $elems.heading != 'undefined' && $elems.heading != null){
          return $elems.heading.textContent;
        }

        return null;

      },

      hasFeature: function hasFeature(featureId){

        if(typeof $elems.features != 'undefined' && $elems.features != null){

            var featureListItems = $elems.features.querySelectorAll('.'+selectors.featureItem);

            for(var i = 0; i < featureListItems.length; i++){

                if(!featureListItems[i].hasAttribute(selectors.dataFeatureId))

                    continue;

                var foundFeatureId = featureListItems[i].getAttribute(selectors.dataFeatureId);

                if(foundFeatureId == featureId){

                    return true;

                }

            }

        }

        return false;

      }

  };



  function init(headingText, descriptionText, features){

      // Select the object based on its className ( class="product" ) and the name comes from a object with the name as value
      $elems.product = document.querySelector('.'+selectors.product); 

      // Select the object based on its className ( class="product__heading" ) and the name comes from a object with the name as value, by the estructure I guess it is using BEM for organize CSS 
      $elems.heading = $elems.product.querySelector('.'+selectors.productHeading);

      // Select the object based on its className ( class="product__description" ) and the name comes from a object with the name as value, by the estructure I guess it is using BEM for organize CSS 
      $elems.description = $elems.product.querySelector('.'+selectors.productDescription);

      // Select the object based on its className ( class="features" ) inside object with class="product" and the name comes from a object with the name as value
      $elems.features = $elems.product.querySelector('.'+selectors.features);

      // Check if the object 'heading' exists in the DOM if receives the headingText value
      if(typeof $elems.heading != 'undefined' && $elems.heading != null && typeof headingText != 'undefined' && headingText != null){
         // The object exists, so we can set the text (content) inside of the element that function gets in first parameter "headingText"
         $elems.heading.textContent = headingText;
      }

      // Check if the object 'description' exists in the DOM and if receives the descriptionText value
      if(typeof $elems.description != 'undefined' && $elems.description != null && typeof descriptionText != 'undefined' && descriptionText != null){

         // Create a new element type <p></p> in the DOM 
         var $newP = document.createElement("p");

         // Create a node text for the content
         var textNode = document.createTextNode(descriptionText);

         // Insert the HTML or Simple Text into the <p></p> tag
         $newP.appendChild(textNode);

         // Render the element and add at the last par of the description box
         $elems.description.appendChild($newP);

      }

      // Check if the object 'features' exists in the DOM and if receives the features list
      if(typeof $elems.features != 'undefined' && $elems.features != null && typeof features != 'undefined' && features != null){

         // Create a new element type <ul></ul> (common use for lists or ) in the DOM 
         var $list = document.createElement("ul");

         // Iteration of the elements received in features in the third parameter of the function
         for(var i = 0; i < features.length; i++){

            // If the value in the property of object called text is empty just pass to the next element in the array
            if(typeof features[i].text == 'undefined' || features[i].text == null)

               continue;

               // Create a new element type <li></li> in the DOM
               var $listItem = document.createElement("li");

               // Create a node text for the content
               var textNode = document.createTextNode(features[i].text);

               // Add class value to the element created <li></li> and that is in process of render yet
               $listItem.classList.add(selectors.featureItem);

               // Check if the propertie id of the item we are working on is not empty
               if(typeof features[i].id != 'undefined' && features[i].id != null){

                  //Create an attribute into the element with the value that comes from id propertie, it's going to add something like data-feature-id="X" in the code
                  $listItem.setAttribute(selectors.dataFeatureId, features[i].id);

               }

               // Add the element adding it to the last part of the object in DOM we are working on yet (<li></li>)
               $listItem.appendChild(textNode);

               // Add the element to the parent wrap we created previous <ul></ul>
               $list.appendChild($listItem);

         }

         // Finally add all the <UL> list to the features box
         $elems.features.appendChild($list);

      }

  }

})();