export interface Pokemon {
    name: string;
    url: string;

}

export interface PokemonResults{
    count: Number;
    next: string;
    previous?: string;
    results: Pokemon[]
}