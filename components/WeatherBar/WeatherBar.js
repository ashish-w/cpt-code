import Marquee from "react-fast-marquee";
import { useState } from "react";

const WeatherBar = () => {
  const [weatherData, setWeatherData] = useState("");

  const getWeatherData = (location) => {
    const apiKey = "6eb1180161eccb06843669dbee0f87b3";
    // const apiKey = "d65e0363f1b60e09c26a3bff180c3ede";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const weatherData = {
          temperature: data.main.temp,
          condition: data.weather[0].main,
          location: data.name,
        };
        setWeatherData(data.main.temp);
        return weatherData;
      });
  };

  const getWeatherData2 = (lat, lon, cnt) => {
    const apiKey = "6eb1180161eccb06843669dbee0f87b3";
    // const apiKey = "d65e0363f1b60e09c26a3bff180c3ede";

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("HELLo");
        let list = data.list;
        console.log("############");
        let weatherString = [];
        list.forEach((obj) => {
          let date = new Date(obj.dt * 1000);
          // console.log(time.dt);
          if (date.getHours() > 9 && date.getHours() < 12) {
            let dateString = `${date}`;
            weatherString.push(
              `${dateString.slice(0, 3)} ${dateString.slice(8, 10)}: ${(
                ((obj.main.temp_min - 273.15) * 9) / 5 +
                32
              ).toFixed(0)}°/${(
                ((obj.main.temp_max - 273.15) * 9) / 5 +
                32
              ).toFixed(0)}°`,
              "    "
            );
          }
        });

        console.log(weatherString.join(" "));
        setWeatherData(weatherString.join(" "));
      });
  };

  // getWeatherData("Manhattan");
  getWeatherData2(40.7831, -73.9712, 40);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: "9999",
        height: "20px",
      }}
    >
      <Marquee
        style={{
          backgroundColor: "#0dff00",
          fontWeight: 700,
          fontSize: "12px",
          color: "black",
          height: "20px",
          alignItems: "center",
        }}
      >
        {weatherData}
      </Marquee>
    </div>
  );
};

export default WeatherBar;
