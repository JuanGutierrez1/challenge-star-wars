import { FilmsObject, GenderObject } from "../types/App.types";

export const genderObject: GenderObject = {
  male: {
    color: '#6fa8dc',
    icon: 'fa-solid fa-mars'
  },
  female: {
    color: '#d5a6bd',
    icon: 'fa-solid fa-venus'
  },
  'n/a': {
    color: '#cccccc',
    icon: 'fa-solid fa-genderless'
  }
}

export const filmsObject: FilmsObject = {
  1: 4,
  2: 5,
  3: 6,
  4: 1,
  5: 2,
  6: 3
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}