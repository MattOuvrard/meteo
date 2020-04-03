var slide_index;

process();

  document.querySelector("#button").addEventListener("click", e=>{
  e.preventDefault();
  city_name = document.querySelector("select").value;
  process(city_name);
})

  function process(name){
	  console.log("bleu);
  slide_index = 1;
  if(!name){
    name = "london";
  }
  grab_weather(name).then(three_days);
  //show_carte(slide_index);
}

  function grab_weather(name){
  return fetch(
    //"http://api.openweathermap.org/data/2.5/forecast?q=Perpignan&appid=19a1d538790042907c76e427f9c2f20d"
    "http://api.openweathermap.org/data/2.5/forecast?q=" + name + "&appid=19a1d538790042907c76e427f9c2f20d"
  ).then(res=> res.json());
}

  function get_temperature(fiche_technique, name){

  //ici on créer les block innerHTML
  var m_name = document.createElement('p');
  var m_article = document.createElement('article');
  var m_icon = document.createElement('img');
  var m_date = document.createElement('p');
  var m_humidite = document.createElement('p');
  var m_vent = document.createElement('p');
  var m_temperature = document.createElement('p');
  var m_pressure =  document.createElement('p');
  var m_nuage = document.createElement('p');
  var m_direction_vent = document.createElement('p');
  var m_description = document.createElement('p');
  var m_data = document.createElement('p');
  var m_div_bonus = document.createElement('div');

  // ici on les remplit avec les informations json
  m_name.textContent = name;
  m_date.textContent = fiche_technique["dt_txt"];
  m_icon.src = "http://openweathermap.org/img/wn/"+ fiche_technique["weather"][0]["icon"] + "@2x.png";
  m_humidite.textContent = "humidité : " + fiche_technique["main"]["humidity"];
  v_kh = fiche_technique["wind"]["speed"]*3.6;
  m_vent.textContent ="vitesse du vent : "+ v_kh.toFixed(2  ) + "km/h";//+ fiche_technique["wind"]["speed"]+ "m/s";
  m_direction_vent.textContent = "direction du vent :" + fiche_technique["wind"]["deg"];
  m_pressure.textContent = "Pression : " + fiche_technique["main"]["pressure"];
  celsus = (fiche_technique["main"]["temp"] - 273.15).toFixed(2);
  m_temperature.textContent = celsus + "C°"; //"Temperature : " + fiche_technique["main"]["temp"] +" F°";
  m_description.textContent = fiche_technique["weather"][0]["description"];
  m_data.textContent = fiche_technique["weather"][0]["main"];
  m_data.style.display = "none";


m_article.appendChild(m_name);
m_article.appendChild(m_icon);
m_article.appendChild(m_div_bonus);
m_div_bonus.appendChild(m_date);
m_div_bonus.appendChild(m_description);
m_div_bonus.appendChild(m_humidite);
m_div_bonus.appendChild(m_vent);
m_div_bonus.appendChild(m_direction_vent);
m_div_bonus.appendChild(m_pressure);
m_div_bonus.appendChild(m_temperature);

/*
m_article.appendChild(m_date);
m_article.appendChild(m_description);
m_article.appendChild(m_humidite);
m_article.appendChild(m_vent);
m_article.appendChild(m_direction_vent);
m_article.appendChild(m_pressure);
m_article.appendChild(m_temperature);
*/
m_article.appendChild(m_data);

m_name.classList.add("font-bold");
m_icon.classList.add("h-64");
m_article.classList.add("bg-gray-500");
m_article.classList.add("rounded");
m_article.classList.add("p-5");
m_article.classList.add("mx-10");
m_article.classList.add("info");
m_data.id = "description";
m_date.classList.add("font-bold");

//m_article.id = "carte";


m_temperature.classList.add("text-4xl");
  //temperature = fiche_technique["main"]["temp"] + " F°";
  document.querySelector("#info").appendChild( m_article);
}

  function three_days(fiche_technique){
  // ça c'est pour supprimé ce qu'il ya déjà dans #info

    temp = document.querySelector("#info");
    while(temp.firstChild)
    {
      temp.removeChild(temp.lastChild);
    }

    for (var i = 0; i < 24; i+= 8)
    {
      get_temperature(fiche_technique["list"][i], fiche_technique["city"]["name"]);
    }
    show_carte(1);
}

  function show_carte(i){

    //var info = document.querySelector("#info");
    var info  = document.getElementsByClassName("info");
    if (i > info.length) {
        slide_index = 1;
    }
    if (i < 1) {
      slide_index = info.length;
    }
    for (var j = 0; j < info.length; j++) {
      info[j].style.display = "none"
    }
    temp = slide_index - 1;
    info[temp].style.display = "block";

    change_bg(info[temp].querySelector("#description").textContent);

  }

  function plus_carte(i){
    show_carte(slide_index += i);

  }


  function change_bg(description){
    switch (description) {
      case "Clear":
        document.body.style.backgroundColor = "DarkOrange"
        break;
      case "Clouds":
        document.body.style.backgroundColor = "lightSlateGrey"
        break;
      case "Thunderstorm":
        document.body.style.backgroundColor = "CornflowerBlue"
        break;
      case "Snow":
        document.body.style.backgroundColor = "Cornsilk"
        break;
      case "Rain":
        document.body.style.backgroundColor = "Teal"
        break;
      case "Drizzle":
        document.body.style.backgroundColor = "Silver"
        break;
      case "Mist":
        document.body.style.backgroundColor = "WhiteSmoke"
        break;
      case "Fog":
        document.body.style.backgroundColor = "WhiteSmoke"
        break;
      default:
        document.body.style.backgroundColor = "white"
    }
  }
