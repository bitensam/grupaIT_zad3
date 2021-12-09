import React, { useState, useEffect, useRef } from 'react';
import './App.scss';
import {
  GiPerspectiveDiceSixFacesRandom,
  GiFastBackwardButton,
} from 'react-icons/gi';
import background from './assets/blob.svg';

const App = () => {
  const [quotes, setQuotes] = useState('');
  const [prev, setPrev] = useState(false);

  const prevQuoteRef = useRef();

  const handleGetQuote = () => {
    setPrev(false);
    fetch(
      'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json'
    )
      .then((res) => res.json())
      .then((data) => {
        let randomNumber = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNumber]);
        prevQuoteRef.current = quotes;
      });
  };

  const handleGetPrevQuote = () => {
    setPrev(true);
  };

  useEffect(() => {
    handleGetQuote();
  }, []);

  const prevQuote = prevQuoteRef.current;

  return (
    <div className='App' style={{ backgroundImage: `url(${background})` }}>
      <div className='container'>
        <header className='header'>
          <h1>
            Random quote <span>generator</span>
          </h1>
        </header>
        <main>
          {!prev ? (
            <div className='card'>
              <div className='quote-wrapper'>
                <p className='quote'>{`"${quotes.quote}"`}</p>
              </div>
              <div className='author-wrapper'>
                <p className='author'>{quotes.author}</p>
              </div>
            </div>
          ) : (
            <div className='card'>
              <div className='quote-wrapper'>
                <p className='quote'>
                  {!prevQuote.quote ? (
                    <p>Something went wrong...</p>
                  ) : (
                    `"${prevQuote.quote}"`
                  )}
                </p>
              </div>
              <div className='author-wrapper'>
                <p className='author'>
                  {!prevQuote.author ? (
                    <p>Generate some quotes first</p>
                  ) : (
                    prevQuote.author
                  )}
                </p>
              </div>
            </div>
          )}

          <div className='button-box'>
            <button onClick={handleGetPrevQuote}>
              Previous Quote
              <GiFastBackwardButton />
            </button>
            <button onClick={handleGetQuote}>
              Generate Quote
              <GiPerspectiveDiceSixFacesRandom />
            </button>
          </div>
        </main>
        <footer className='footer'>
          <p>Coded by bitensam.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
