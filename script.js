// Write your JavaScript code here!

window.addEventListener("load", function () {
   let form = document.querySelector("form");
   form.addEventListener("submit", function () {
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");

      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");
      let faultyItems = document.getElementById("faultyItems");
      let launchStatus = document.getElementById("launchStatus");

      let fieldIsEmpty =
         pilotName.value === "" ||
         copilotName.value === "" ||
         fuelLevel.value === "" ||
         cargoMass.value === "";
      let typeIsIncorrect =
         isNaN(fuelLevel.value) ||
         isNaN(cargoMass.value) ||
         !isNaN(parseFloat(pilotName.value)) ||
         !isNaN(parseFloat(copilotName.value));

      if (fieldIsEmpty) {
         alert("All fields are required!");
         event.preventDefault();
      } else if (typeIsIncorrect) {
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      } else {
         pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
         copilotStatus.innerHTML = `Pilot ${copilotName.value} is ready for launch`;
         if (parseFloat(fuelLevel.value) < 10000 || parseFloat(cargoMass.value) > 10000) {
            faultyItems.style.visibility = "visible";
            launchStatus.style.color = "red";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            if (parseFloat(cargoMass.value) > 10000) {
               cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
            } else {
               cargoStatus.innerHTML = "Cargo mass low enough for launch"
            }
            if (parseFloat(fuelLevel.value) < 10000) {
               fuelStatus.innerHTML = "There is not enough fuel for the journey";
            } else {
               fuelStatus.innerHTML = "Fuel level high enough for launch";
            }
            event.preventDefault();
         } else {
            launchStatus.style.color = "green";
            launchStatus.innerHTML = "Shuttle is ready for launch";
            event.preventDefault();
         }
      }
   });

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {
         const comissionTarget = document.getElementById("missionTarget");
         comissionTarget.innerHTML = `<h2>Mission Destination</h2>
          <ol>
             <li>Name: ${json[0].name}</li>
             <li>Diameter: ${json[0].diameter}</li>
             <li>Star: ${json[0].star}</li>
             <li>Distance from Earth: ${json[0].distance}</li>
             <li>Number of Moons: ${json[0].moons}</li>
          </ol>
          <img src="${json[0].image}">`;
      })
   })
});

