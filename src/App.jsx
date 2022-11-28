//Componentes
import {Button} from "./components/Button"
import { Card } from "./components/Card";
//styles
import './sass/App.scss'
//iconos
import {TiArrowLeftOutline} from "react-icons/ti";
import {TiArrowRightOutline} from "react-icons/ti"
//hooks
import { useState,useEffect } from "react";
const App= ()=>{


    const [pokemonId,setPokemonId]=useState(63);
    const [pokemonEvolutions,setPokemonsEvolutions]= useState([])

    //consumo de la API 
    useEffect(()=>{
        getEvolutions(pokemonId);
    },[pokemonId])

    async function getEvolutions (id){
         const  response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
         const data = await response.json()
        // console.log(data)
       // setPokemonName(data.chain.species.name)
        let pokemonEvoArray=[]

        let pokemonLeve1= data.chain.species.name
        getPokemonImgs(pokemonLeve1)
        let pokemonLev1Img=  await getPokemonImgs(pokemonLeve1)
        pokemonEvoArray.push([pokemonLeve1,pokemonLev1Img])

        if(data.chain.evolves_to.length !==0){
            let pokemonLv2 = data.chain.evolves_to[0].species.name;
            let pokemonLv2Img=  await getPokemonImgs(pokemonLv2)
            pokemonEvoArray.push([pokemonLv2,pokemonLv2Img])
          //  console.log(pokemonEvoArray)
            
          if(data.chain.evolves_to[0].evolves_to.length !==0){
            let pokemonlv3= data.chain.evolves_to[0].evolves_to[0].species.name;
            let pokemonlv3Img= await getPokemonImgs(pokemonlv3)
            pokemonEvoArray.push([pokemonlv3,pokemonlv3Img])
            //console.log(pokemonEvoArray)
          }
        }
        setPokemonsEvolutions(pokemonEvoArray)
    }
    
    async function getPokemonImgs(name){
        const  response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
         const data = await response.json()
        // console.log(data.sprites.other['official-artwork'].front_default)
        return data.sprites.other['official-artwork'].front_default;
    }

    function prevClick(){
            (pokemonId===1)?
            setPokemonId(1):
            setPokemonId(pokemonId-1)
            }

    function nexClick(){
        setPokemonId(pokemonId+1)
    }
    return(
        <div className="app">
        {/*Cards */}
        <div className={`card-container card${pokemonEvolutions.length}`}>
            {pokemonEvolutions.map(pokemon=>
            <Card 
            key={pokemon[0]}
            name={pokemon[0]}
            img={pokemon[1]}
            />)}
          
        </div>
    <div className="buttons-container"> 

    <Button 
    icon={<TiArrowLeftOutline/>} 
    handleClick={prevClick}/>
   
    <Button icon={<TiArrowRightOutline/>}
    handleClick={nexClick}
    /> 
    </div>
        </div>
    )
}

export {App}