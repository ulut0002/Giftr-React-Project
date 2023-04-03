import React from 'react'
import { useParams } from 'react-router-dom';

export default function EditPeople() {
  const { uid } = useParams();

  return (
    <div>
      <h2>Edit People {uid}</h2>
    </div>
  );
}
