import { useState } from "react";
import axios from "axios";
import Result from "./Result";
import "./App.css";

// Use an environment variable for the API key
const API_KEY = process.env.REACT_APP_NEWS_API_KEY || 'pub_48997d4e55496e4d73cadc36407e4ac20260b';

export default function News() {
  const [info, setInfo] = useState([]);
  const [country, setCountry] = useState("in");

  const countries = [
    { code: "ar", name: "Argentina" },
    { code: "au", name: "Australia" },
    { code: "at", name: "Austria" },
    { code: "be", name: "Belgium" },
    { code: "br", name: "Brazil" },
    { code: "bg", name: "Bulgaria" },
    { code: "ca", name: "Canada" },
    { code: "cn", name: "China" },
    { code: "co", name: "Colombia" },
    { code: "cz", name: "Czech Republic" },
    { code: "dk", name: "Denmark" },
    { code: "eg", name: "Egypt" },
    { code: "fi", name: "Finland" },
    { code: "fr", name: "France" },
    { code: "de", name: "Germany" },
    { code: "gr", name: "Greece" },
    { code: "hk", name: "Hong Kong" },
    { code: "hu", name: "Hungary" },
    { code: "in", name: "India" },
    { code: "id", name: "Indonesia" },
    { code: "ie", name: "Ireland" },
    { code: "il", name: "Israel" },
    { code: "it", name: "Italy" },
    { code: "jp", name: "Japan" },
    { code: "lv", name: "Latvia" },
    { code: "lt", name: "Lithuania" },
    { code: "my", name: "Malaysia" },
    { code: "mx", name: "Mexico" },
    { code: "ma", name: "Morocco" },
    { code: "nl", name: "Netherlands" },
    { code: "nz", name: "New Zealand" },
    { code: "ng", name: "Nigeria" },
    { code: "no", name: "Norway" },
    { code: "ph", name: "Philippines" },
    { code: "pl", name: "Poland" },
    { code: "pt", name: "Portugal" },
    { code: "ro", name: "Romania" },
    { code: "ru", name: "Russia" },
    { code: "sa", name: "Saudi Arabia" },
    { code: "rs", name: "Serbia" },
    { code: "sg", name: "Singapore" },
    { code: "sk", name: "Slovakia" },
    { code: "si", name: "Slovenia" },
    { code: "za", name: "South Africa" },
    { code: "kr", name: "South Korea" },
    { code: "se", name: "Sweden" },
    { code: "ch", name: "Switzerland" },
    { code: "tw", name: "Taiwan" },
    { code: "th", name: "Thailand" },
    { code: "tr", name: "Turkey" },
    { code: "ae", name: "UAE" },
    { code: "ua", name: "Ukraine" },
    { code: "gb", name: "United Kingdom" },
    { code: "us", name: "United States" },
    { code: "ve", name: "Venezuela" },
  ];

  const gn = (event) => {
    event.preventDefault();
    const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=${country}`;

    axios
      .get(url)
      .then((res) => {
        if (res.data.results) {
          setInfo(res.data.results);
        } else {
          alert("No results found");
        }
      })
      .catch((err) => alert("issue: " + err));
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div className="news-container">
      <h1>News from All Around the World</h1>
      <form onSubmit={gn}>
        <div className="form-group">
          <label htmlFor="country-select">Select Country:</label>
          <select
            id="country-select"
            value={country}
            onChange={handleCountryChange}
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input type="submit" value="Get News" />
        </div>
      </form>
      <div className="news-list">
        {info.map((e, index) => (
          <Result key={index} title={e.title} url={e.link} />
        ))}
      </div>
      <footer>
        Created by <a href="https://github.com/ankithprojects" target="_blank" rel="noopener noreferrer">Ankith</a>
      </footer>
    </div>
  );
}