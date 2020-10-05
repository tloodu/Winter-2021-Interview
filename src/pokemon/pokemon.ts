import fetch from 'node-fetch';

export interface IPokemon {
  id: number;
  weight: number;
  height: number;
  moves: string[];
}

export interface IResponse {
  id: number;
  weight: number;
  height: number;
  moves: {
    move: {
      name: string;
    };
  };
}

export class Pokemon {
  url = 'https://pokeapi.co/api/v2/pokemon';

  /**
   * Gets the list of Pokemon info objects
   * @param names list of names
   * @return Array of Pokemon info Objects
   */
  public async getPokemonsByNameList(names: string[]): Promise<IPokemon[]> {\

    let List: IPokemon[] = []; // fulfilling the promise 

    for (let i = 0; i < names.length; i++){ //iterating through the list of Pokemon names given

      if(this.checkNameValid(names[i])){  //checking if names are valid, if they are this continues

        const res = await fetch(`${this.url}/${names[i]}`); //receiving response from API
        const pokemonData = await res.json();

        List[i] = {

          id: pokemonData.id,
          weight: pokemonData.weight,
          height: pokemonData.height,
          moves: pokemonData.moves
        }
      }
      else { // if a name is invalid this error is thrown, and the loop moves to the next name

        throw new Error('Name Invalid');
      }
    }
  }

  /**
   * Gets a Pokemon info object
   * @param name
   * @return Pokemon info object
   */
  public async getPokemonByName(name: string): Promise<IResponse> {
    if (this.checkNameValid(name)) {
      const res = await fetch(`${this.url}/${name}`);
      const json: IResponse = await res.json();
      return json;
    } else {
      throw new Error('Name Invalid');
    }
  }

  /**
   * Checks the name parameter is valid
   * @param name string
   */
  checkNameValid(name: string) {
    return name.length > 0;
  }
}
