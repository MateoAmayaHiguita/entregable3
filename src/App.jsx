import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import LocationInfo from "./components/LocationInfo";
import ResidentInfo from "./components/ResidentInfo";
import getRandomLocation from "./utilis/getRandomLocation";
import rick from "./assets/rick.jpg";
import inicio from "./assets/inicioo.jpg";

function App() {
  const [location, setLocation] = useState();
  const [numberLocation, setNumberLocation] = useState(getRandomLocation());
  const [hasError, setHasError] = useState();
  const [listLocation, setListLocation] = useState();
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`;
    axios
      .get(url)
      .then((res) => {
        setLocation(res.data);
        setHasError(false);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      });
  }, [numberLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.inputLocation.value.trim().length === 0) {
      setNumberLocation(getRandomLocation());
    } else {
      setNumberLocation(e.target.inputLocation.value.trim());
    }
    e.target.inputLocation.value = e.target.inputLocation.value.trim();
  };

  const handleChange = (e) => {
    const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`;
    axios
      .get(url)
      .then((res) => setListLocation(res.data.results))
      .catch((err) => console.log(err));
  };

  const handleFocus = () => setIsShow(true);
  const handleBlur = () => setIsShow(false);

  const handleListClick = (id) => setNumberLocation(id);
  return (
    <div className="app">
      <section className="app__img-inicio">
        <img className="img" src={inicio} />
      </section>

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input"
          id="inputLocation"
          type="text"
          onChange={handleChange}
          // onFocus={handleFocus}
          // onBlur={handleBlur}
        />
        <button className="form__btn">Search</button>
      </form>
      {isShow && (
        <ul>
          {listLocation?.map((loc) => (
            <li onClick={() => handleListClick(loc.id)} key={loc.id}>
              {loc.name}
            </li>
          ))}
        </ul>
      )}
      {hasError ? (
        <h2 className="app__error">
          <img className="app__error-img" src={rick} />
          Hey! you must provide an id from 1 to 125{" "}
        </h2>
      ) : (
        <>
          <LocationInfo location={location} />
          <div className="residents__container">
            {location?.residents.map((url) => (
              <ResidentInfo key={url} url={url} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
