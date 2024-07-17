document.getElementById("idForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var ids = document.getElementById("idInput").value.split(/[\s,]+/);
    var result = "";
    for (var i = 0; i < ids.length; i++) {
      if (ids[i].trim() !== "") {
        result += "<@" + ids[i].trim() + ">\n";
      }
    }
    if (result.trim() === "") {
      document.getElementById("result").style.display = "none";
    } else {
      document.getElementById("result").style.display = "block";
      document.getElementById("result").textContent = result.trim();
    }
  
    var buttonsContainer = document.getElementById("buttonContainer");
    buttonsContainer.innerHTML = "";
    if (ids.some(id => id.trim() !== "")) {
      for (var i = 0; i < ids.length; i++) {
        if (ids[i].trim() !== "") {
          var id = ids[i].trim();
          var button = document.createElement("button");
          button.textContent = "Search ID " + id;
          button.className = "searchButton";
          button.addEventListener("click", function(id) {
            return function() {
              searchOnLookupGuru(id);
            };
          }(id));
          buttonsContainer.appendChild(button);
        }
      }
      document.getElementById("copyButton").style.display = "inline-block";
    } else {
      document.getElementById("copyButton").style.display = "none";
    }
  });
  
  document.getElementById("copyButton").addEventListener("click", function() {
    var resultText = document.getElementById("result");
    var range = document.createRange();
    range.selectNode(resultText);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  });

  var lastClickedButton = null;
  var iframes = {};
  
  function searchOnLookupGuru(id) {
    if (lastClickedButton === id) {
      // Close the iframe if the same button is clicked again
      var iframe = iframes[id];
      if (iframe) {
        iframe.remove();
        delete iframes[id];
        lastClickedButton = null;
      }
    } else {
      // Create a new iframe if it's a different button
      var url = "https://lookup.guru/" + encodeURIComponent(id);
      var iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.frameBorder = "0";
      iframe.width = "100%";
      iframe.height = "500px"; // adjust the height as needed
  
      // Remove any existing iframes
      var existingIframes = document.getElementById("buttonContainer").querySelectorAll("iframe");
      existingIframes.forEach(function(iframe) {
        iframe.remove();
      });
  
      document.getElementById("buttonContainer").appendChild(iframe);
      iframes[id] = iframe;
      lastClickedButton = id;
    }
  }
