import { useState } from 'react'
import './App.css'

function App() {


  const [pokemonList, setPokemonList] = useState([]);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [editingPokemon, setEditingPokemon] = useState(null);

  const handlePokemonName = (e) => {
    setName(e.target.value);
  }
  const handlePokemonBreed = (e) => {
    setBreed(e.target.value);
  }
  const handlePokemonDescription = (e) => {
    setDescription(e.target.value);
  }

  const handlePokemonList = () => {

    if (!name || !breed || !description) {
      alert("Please fill in all the fields");
      return;
    }

    if (editingPokemon) {

      const updateList = pokemonList.map(pokemonList => pokemonList.id === editingPokemon.id
        ? { ...pokemonList, name, breed, description }
        : pokemonList);

      setPokemonList(updateList);
      setEditingPokemon(null);

    } else {
      const newPokemon = {
        id: Date.now(),
        name,
        breed,
        description,
      };

      setPokemonList([...pokemonList, newPokemon]);
      console.log(pokemonList);
    };

    setName("");
    setBreed("");
    setDescription("");
  }



  const handleRemove = (id) => {
    const updatePokemonList = pokemonList.filter(pokemonList => pokemonList.id !== id);
    setPokemonList(updatePokemonList);
    console.log(id)
  }

  const handleEdit = (pokemon) => {
    setEditingPokemon(pokemon);
    setName(pokemon.name);
    setBreed(pokemon.breed);
    setDescription(pokemon.description);
  }

  return (
    <>
      <div className="title">
        <img className='logo' src='../public/images/pokeball.png' alt='pokeball img' />
        <h1 className='heading'>Pokédex</h1>
      </div>

      <div className="input-box">
        <input className='input' type='text' placeholder='Name' value={name} onChange={(e) => handlePokemonName(e)} ></input>
        <input className='input' type='text' placeholder='Breed' value={breed} onChange={(e) => handlePokemonBreed(e)} ></input>
        <input className='input' type='text' placeholder='Description' value={description} onChange={(e) => handlePokemonDescription(e)} ></input>
        <button className='input-btn' onClick={handlePokemonList}>{editingPokemon ? "Update Pokemon " : "Add Pokemon"}</button>
      </div>


      <div className="container">
        {pokemonList?.map((item, index) => (
          <div key={index} className='card'>
            <p>Name : {item.name}</p>
            <p>Title : {item.breed}</p>
            <p >Description : {item.description}</p>
            <button className='card-btn' onClick={() => handleEdit(item)}>Edit</button>
            <button className='card-btn' onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
