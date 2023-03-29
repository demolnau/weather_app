    let container= document.getElementsByClassName("contain_it_all")
    let search_btn = document.querySelector('button[type="submit"]')
    let searchTerms = document.getElementById("search_text")
    let content =document.getElementById("content")
    let searchImage = document.createElement("img")
    searchImage.setAttribute("id", "weather_icon")
    let city= document.getElementById("city")
    let region =document.getElementById("region")
    let country =document.getElementById("country")
    let latLon = document.getElementById("lat/lon")
    let temperature = document.getElementById("temperature")
    let feels_like = document.getElementById("feels_like")
    let last_updated =document.getElementById("last_updated")
    let condition = document.getElementById("condition")
    let humidity = document.getElementById("humidity")
    let temp_checkbox = document.getElementById("switch3")
    let search_begun = false;
    let searchThis = ""; 




    async function getInfo(searchThis){
      console.log("Term searched: "+ searchThis)
      try{
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=3624a068aef7412f8f6204644232103&q=${searchThis}&aqi=no`, {mode: 'cors'})
        if (!response.ok){
          throw new Error(`Error! status: ${response.status}`);
        } 

          const weatherData = await response.json();
          console.log(weatherData);
          city.innerHTML= `City: ${weatherData.location.name}`;
          region.innerHTML = `Region: ${weatherData.location.region}`;
          country.innerHTML = `Country: ${weatherData.location.country}`;
          latLon.innerHTML = "Latitude: " + weatherData.location.lat+ ", Longitutude: " + weatherData.location.lon;
          if(temp_checkbox.checked == true) {
            temperature.innerHTML = "Temperature: " + weatherData.current.temp_f +" degrees Fehrenheit";
            feels_like.innerHTML = "Feels like: " + weatherData.current.feelslike_f + " degrees Fehrenheit"
          }   else { 
            temperature.innerHTML =  " Temperature: " + weatherData.current.temp_c + " degrees Celsius";
            feels_like.innerHTML = "Feels like: " + weatherData.current.feelslike_c + " degrees Celsius"
          } 

          last_updated.innerHTML = "Last updated: "+ weatherData.current.last_updated;
          condition.innerHTML= `Weather conditions: ${weatherData.current.condition.text}`;
          humidity.innerHTML = `Humidity: ${weatherData.current.humidity}%`
          searchImage.src = weatherData.current.condition.icon;
          return weatherData;
        
      }
      catch(error){
        console.log(error);
        content.innerHTML = "Weather API does not have data for that city.";
        document.body.appendChild(content)
      }

    }

    function showResults(){
      content.innerHTML=""
      content.appendChild(city)
      content.appendChild(region)
      content.appendChild(country)
      content.appendChild(latLon)
      content.appendChild(last_updated)
      content.appendChild(temperature)
      content.appendChild(feels_like)
      content.appendChild(condition)
      content.appendChild(humidity)
      content.appendChild(searchImage)
      container.appendChild(content)
      //document.body.appendChild(searchImage)
    }

    async function check_weather(){
          if (searchThis != searchTerms.value){
            searchThis = searchTerms.value;
          }
          else{
            console.log("entered loop!")
            console.log(`Search term still: ${searchThis}`)
          }
          console.log("search this:" + searchThis)
          
          await getInfo(searchThis);
          showResults();
    }

    
    temp_checkbox.onclick = function(){
      if(search_begun == true){
        if(temp_checkbox.checked==true){
          console.log(searchTerms)
        console.log("Changing the temperature to fahrenheit");
        check_weather();
        }
        else{
          console.log("changing the temperature to celsius");
          check_weather();
        }
      }
      else{
        console.log("city not selected yet.")
      }
      
    }
    
    search_btn.onclick = function(){
      search_begun = true;
      check_weather();
    };

    
  
