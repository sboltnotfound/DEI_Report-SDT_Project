
async function addRecommendation() {
    // Get the message of the new recommendation
    let recommendation = document.getElementById("new_recommendation");
    let reco = document.getElementById("bruh");
    // If the user has left a recommendation, display a pop-up
    if (recommendation.value != null && recommendation.value.trim() != "") {
      console.log("New recommendation added");
      //Call showPopup here
      showPopup(true);
      // Create a new 'recommendation' element and set it's value to the user's message
      var element = document.createElement("div");
      element.setAttribute("class","recommendation");
      element.innerHTML = "\<p style=\"text-align: center;\"\>\<b\>"+reco.value+"\</b\>\</p\>\<span\>&#8220;\</span\>" + recommendation.value + "\<span\>&#8221;\</span\>"; // the message
      // Add this element to the end of the list of recommendations
      var usid= document.cookie
      .split('; ')
      .find(row => row.startsWith('userid='))
      ?.split('=')[1];
      var ele = document.createElement("aside");
      ele.innerHTML = document.getElementById("usery").innerHTML;
      element.appendChild(ele);
      document.getElementById("all_recommendations").appendChild(element); 
      console.log("\<span\>&#8220;\</span\>" + recommendation.value + "\<span\>&#8221;\</span\>" + "<aside>"+reco.value+"/<aside>");
      var topic = reco.value;
      var message = recommendation.value;
      recommendation.value = "";
      reco.value ="";
      const response = await fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic, message, usid})
      });

    }
  }
  
  function showPopup(bool) {
    if (bool) {
      document.getElementById('popup').style.visibility = 'visible'
    } else {
      document.getElementById('popup').style.visibility = 'hidden'
    }
  }