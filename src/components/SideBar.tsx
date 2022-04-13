
import { Button } from './Button';

import '../styles/global.scss';
import '../styles/sidebar.scss';
import { useEffect, useState } from 'react';


import { api } from '../services/api';


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SidebarProps {
  handleClickButton: (id: number) => void; 
  selectedGenreId: number; 
}

export function SideBar({handleClickButton, selectedGenreId}: SidebarProps ) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([])
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  
  return (
  <nav className="sidebar">
  <span>Watch<p>Me</p></span>

  <div className="buttons-container">
    {genres.map(genre => (
      <Button
        key={String(genre.id)}
        title={genre.title}
        iconName={genre.name}
        onClick={() => handleClickButton(genre.id)}
        selected={selectedGenreId === genre.id}
      />
    ))}
  </div>
</nav>
  )
}
