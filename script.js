$(document).ready(function() {

    $('#searchBtn').on("click", function (event) {
        event.preventDefault();
        var city = $("#search").val();
        weatherSearch(city)
    })
    
    const apiKey = '9b42df0a2335769838a31701728b5fe6';
    const url = ('api.openweathermap.org/data/2.5/weather?q= + city name + &appid= + apiKey');


    function weatherSearch(city) {
        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            $(".city").text(response.name);
            $(".wind").text(response.wind.speed);
            $(".humidity").text(response.main.humidity);
            $(".temp").text(response.main.temp);
            forecast(city);
        })
    }
    function forecast(city) {
        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`,
            method: 'GET'
        }).then(function (response) {
            console.log(response); 
            // $(".city").text(response.name);
            // $(".wind").text(response.wind.speed);
            // $(".humidity").text(response.main.humidity);
            // $(".temp").text(response.main.temp);
            for (var i = 0; i < response.list.length; i++) {
                if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                    var cardBody = $('<div>').addClass("col s8 m3")
                    var cardPanel = $('<div>').addClass("card-panel teal")
                    var span = $('<span>').addClass("white-text")
                    var ulItem = $('<ul>')
                    var img = $('<img>').attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png")
                    var date = $('<li>').text(new Date(response.list[i].dt_txt).toLocaleDateString())
                    var temp = $('<li>').text("temp: "+  response.list[i].main.temp_max)
                    var humidity = $('<li>').text("humidity: "+ response.list[i].main.humidity)
                    ulItem.append(img, date, temp, humidity)
                    span.append(ulItem)
                    cardPanel.append(span)
                    cardBody.append(cardPanel)
                    $("#forecast").append(cardBody)
                }
            } 
        })
    }
    function createItem() {
        localStorage.setItem("mytime", Date.now());
    }
    function submit() {
        var x = localStorage.setItem("mytime");
        document.getElementById("demo").innerHTML = x;
    }

});

