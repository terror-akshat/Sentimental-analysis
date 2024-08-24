import React, { useState } from "react";
import axios from "axios";
// import "./index.css";

const Sentiment = () => {
  const [sentiment, setSentiment] = useState(null);
  const [text, SetText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post("http://localhost:3000/analyze", {
        text,
      });
      setSentiment(result.data.sentiment);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Sentiment-Anaylsis</h1>
      <form
        onSubmit={handleOnSubmit}
        style={{ flexDirection: "column", display: "flex", marginTop: "200px" }}
      >
        <input
          value={text}
          style={{
            width: "500px",
            padding: "20px",
            borderRadius: "20px",
            marginBottom: "15px",
            fontFamily:"cursive",
            fontWeight:"bold",
            fontSize:"25px"
          }}
          onChange={(e) => SetText(e.target.value)}
        />
        <button
          style={{
            width: "250px",
            marginLeft: "150px",
            marginTop: "20px",
            padding: "10px",
            borderRadius: "10px",
            fontWeight: "bolder",
            fontSize: "20px",
          }}
          type="submit"
          disabled={loading}
        >
          {" "}
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
      <div style={{fontSize:"30px", fontFamily:"fantasy"}}>{sentiment && <p>This would be an : {sentiment} statement</p>}</div>
    </div>
  );
};

export default Sentiment;
