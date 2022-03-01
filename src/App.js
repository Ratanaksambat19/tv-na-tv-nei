import { useState, useEffect } from 'react'
import axios from 'axios'
import Panel from './components/DisplayPanel';
import './styles/App.css';
import './styles/componentsStyle/tvNaButton.css'
import welcomCat from './assets/cat-eric-the-cat.gif'
import catStoreContainer from './assets/catStore/importImages';
function App() {

  const [image, setImage] = useState('')
  const [catStore, setCatStore] = useState([])
  const [loadedCat, setIsLoadedCat] = useState(false)
  const catLocalStorage = JSON.parse(localStorage.getItem('catStorage'))

  useEffect(() => {
    setImage(welcomCat)
    if (!!catLocalStorage) {
      setCatStore(catLocalStorage)
    } else {
      getRandomCat()
      setIsLoadedCat(false)
    }
  }, [loadedCat])

  const getRandomCat = async () => {
    let catContainer = []
    for (let i = 0; i < 100; i++) {
      await axios.get("https://api.thecatapi.com/v1/images/search").then((response) => {
        catContainer.push(response.data[0].url)
      })
    }

    localStorage.setItem('catStorage', JSON.stringify(catContainer))
  }

  function setCatDelay(array, delay) {
    var i = 0

    // seed first call and store interval (to clear later)
    var interval = setInterval(function () {
      // each loop, call passed in function
      setImage(array[Math.floor(Math.random() * array.length)]);

      // increment, and if we're past array, clear interval
      if (i++ >= 10)
        clearInterval(interval);
    }, delay)

    return interval
  }
  
  function getCatOnClick() {
    if (!!catLocalStorage) {
      setCatDelay(catStore, 50)
      setIsLoadedCat(true)
    } else {
      setCatDelay(catStoreContainer, 50)
    }
  }

  return (
    <div className="App">
      <section>
        <Panel image={image}/>
      </section>
      <section className='functionality'>
        <button type="button" className="pushable" onClick={(e) => {
          e.preventDefault()
          getCatOnClick()
        }}>
          tv na tv nei
        </button>
      </section>
    </div>
  );
}

export default App;
