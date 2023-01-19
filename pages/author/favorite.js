import React, { useEffect, useState } from 'react';
import { favoriteAuthors } from '../../api/authorData';
import AuthorCard from '../../components/AuthorCard';
import { useAuth } from '../../utils/context/authContext';

export default function Favorites() {
  const { user } = useAuth();
  const [authors, setAuthors] = useState([]);
  const getAllFavoriteAuthors = () => {
    favoriteAuthors(user.uid).then(setAuthors);
  };

  useEffect(() => {
    getAllFavoriteAuthors();
  }, []);
  return (
    <div>
      {authors?.map((author) => (
        <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllFavoriteAuthors} />
      ))}
    </div>
  );
}
