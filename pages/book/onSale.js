import React, { useEffect, useState } from 'react';
import { booksOnSale } from '../../api/bookData';
import BookCard from '../../components/BookCard';
import { useAuth } from '../../utils/context/authContext';

export default function OnSale() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const getAllBooksOnSale = () => {
    booksOnSale(user.uid).then(setBooks);
  };

  useEffect(() => {
    getAllBooksOnSale();
  }, []);
  return (
    <div>
      {books?.map((book) => (
        <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllBooksOnSale} />
      ))}
    </div>
  );
}
