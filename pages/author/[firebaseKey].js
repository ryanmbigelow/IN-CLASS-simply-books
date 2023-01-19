import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Image,
} from 'react-bootstrap';
import { viewAuthorDetails } from '../../api/mergedData';
import { getBooks } from '../../api/bookData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);
  console.warn(authorDetails.books);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <Image src={authorDetails.image} alt={authorDetails.first_name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {authorDetails.first_name} {authorDetails.last_name}
          {authorDetails.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a>
        <hr />
      </div>
      {authorDetails.books?.map((book) => (
        <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getBooks} />
      ))}
    </div>
  );
}
