import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import './App.css';

function App() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    if (!email || !nickname || !feedback || !rating) {
      setErrorMessage("Kaikki kentät ovat pakollisia!");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await fetch("http://......", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          nickname,
          feedback,
          rating,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Palautteesi on lähetetty onnistuneesti!");
        setErrorMessage("");
      } else {
        setErrorMessage("Palautteen lähettäminen epäonnistui. Yritä uudelleen.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Virhe palautteen lähetyksessä:", error);
      setErrorMessage("Jotain meni pieleen. Yritä myöhemmin uudelleen.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="feedback">
      <h2>Jätä meille asiakaspalautetta:</h2>

      <h3>Jätä sähköpostisi, jos haluat että otamme yhteyttä. Tämä ei näy muille.</h3>
      <input
        type="email"
        placeholder="sähköposti"
        style={{ width: "400px" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br></br>

      <h3>Lisää nimimerkki</h3>
      <input
        placeholder="nimimerkki"
        style={{ width: "400px" }}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <br></br>

      <textarea
        type="text"
        placeholder="kirjoita tähän..."
        style={{ height: "120px", width: "400px" }}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <br></br>

      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
            <FaRegStar
              className='star'
              size={25}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}

      <button onClick={handleSubmit}>Lähetä palautetta</button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

export default App;
