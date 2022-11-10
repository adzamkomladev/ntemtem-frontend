import React, { useEffect, useState } from 'react';

import { environment } from '../environments/environment';

interface User {
  username: string;
  email: string;
  id: string;
  name: string;
}

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Form submission happens here
    fetch(`${environment.apiBaseUrl}/users`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        name,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers([data, ...users]));
  };
  const inputChangeHandler = (
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFunction(event.target.value);
  };

  useEffect(() => {
    fetch(`${environment.apiBaseUrl}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <div>
        <h3>Create User</h3>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="username">Username</label>
          </div>
          <div>
            <input
              id="username"
              onChange={(e) => inputChangeHandler(setUsername, e)}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input
              id="name"
              onChange={(e) => inputChangeHandler(setName, e)}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              id="email"
              onChange={(e) => inputChangeHandler(setEmail, e)}
              type="text"
            />
          </div>
          <input type="submit" />
        </form>
      </div>
      <div>
        <h3>All Users</h3>
        {users.map((user, index) => (
          <div key={index.toString()} className="card">
            <h3>{user.username}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Users;
