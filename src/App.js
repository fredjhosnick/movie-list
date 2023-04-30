
import React, {useState, useEffect} from 'react';
import './App.css';



function App() {
  const [movieName, setMovieName] = useState('');
  const [container, setContainer] = useState([]);
  const[foundMovie, setFoundMovie] = useState('');


  useEffect(() => {
   fetchMe()
  },[foundMovie]) 

 const fetchMe =()=>{


  fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=+${movieName}`,{
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5100c24fcfmshe3c6b7ee56a3069p164f69jsnc2db4c04f16f',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
})

.then(response =>{
  return response.json()
})
.then(data =>{
  setContainer(data.d)
})
.catch(err =>{
  console.error(err);
});

 }

const onChangeHandler =(e)=>{
  setMovieName(e.target.value);

}
const submitHandler= (e) =>{
  e.preventDefault();
  setFoundMovie(movieName);

}

  return (
    <div className="App">
	   <h1>My Movies</h1>
      <form onSubmit={submitHandler}> 
        <input 
        placeholder='search the movie'
        type='text' 
        value={movieName} onChange={onChangeHandler}/>
        <button type='submit'>Search</button>
      </form>

      {container.length > 0  && (<div className='element'>
      {container.map((item , index) =>{

           return (
            <div key={index} className='element-div'>
            <img src={item.i.imageUrl}/>
            <p>{item.l}</p>
            <p>{item.s}</p>
            </div>
           )
      })}
     
    </div>)}
   
    </div>
  );
}

export default App;
