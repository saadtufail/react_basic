import './App.css'
import React from 'react'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      users: [],
      searchField: ''
    }
  }

  componentDidMount () {
    fetch('https://reqres.in/api/users?page=1')
      .then(response => response.json())
      .then(json =>
        this.setState(
          () => {
            return { users: json.data }
          },
          () => {
            // console.log(this.state)
          }
        )
      )
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase()
    this.setState(() => {
      return { searchField }
    })
  }
  render () {
    const filteredUsers = this.state.users.filter(user => {
      return user.first_name
        .toLocaleLowerCase()
        .includes(this.state.searchField)
    })

    return (
      <div className='App'>
        <h1> Class Component App</h1>

        <input
          style={{ width: '300px' }}
          type='search'
          placeholder='Search for User'
          className='search-user'
          onChange={ this.onSearchChange}
        />
        <br />
        <br />

        {filteredUsers.map(user => {
          return (
            <div key={user.id}>
              {' '}
              <img
                src={user.avatar}
                alt='user-avatar'
                className='img-responsive'
              />{' '}
              <h2>
                {user.first_name} {user.last_name}{' '}
              </h2>{' '}
              <h4> {user.email}</h4>
            </div>
          )
        })}
      </div>
    )
  }
}

export default App
