import React from 'react';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      dogPic: '',
      firstRun: true,
      dogoName: '',
    }
    this.fetchDog = this.fetchDog.bind(this);
    this.fetchAnotherDog = this.fetchAnotherDog.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveDog = this.saveDog.bind(this);
  }

  fetchDog() {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((object) => {
      this.setState ((previousState) => {
        if(!object.message.includes('terrier') || this.state.firstRun) {
          return ({
            dogPic: object.message,
          })
        }
        return ({
          dogPic: previousState.dogPic,
        })
        
      })
      alert(object.message.split('/')[4]);
    })
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState ({
      [name] :value,
    })

  }

  componentDidMount() {
    this.fetchDog();
  }

  fetchAnotherDog() {
    this.fetchDog();
    this.setState ({
      firstRun: false,
    })
  }

  saveDog() {
    const { dogoName, dogPic } = this.state;
    const savedDogo = [dogoName, dogPic]
    localStorage.setItem('dog', JSON.stringify(savedDogo));
  }

  divValue() {
    let  { dogPic, firstRun } = this.state;
    let dogName = 'Cachorro aleatório';
        if(localStorage.dog.length > 0 && firstRun) {
      dogPic = JSON.parse(localStorage.dog)[1];
      dogName = `Esse é o ${JSON.parse(localStorage.dog)[0]}`
    }

    return (
      <div className='App'>
      <img className="dog-pic" src= {dogPic} alt="Dog" />
      <button onClick={this.fetchAnotherDog}>Novo Dog</button>
      <h1>{dogName}</h1>
      <input name='dogoName' onChange={this.handleChange} type="text" placeholder="De um nome ao dogo" />
      <button onClick={this.saveDog}>Save Dogo</button>
    </div>
    )
  }

  render() {
    let  { dogPic, firstRun } = this.state;
    const loadingMessage = <span>Loading...</span>
    const div = this.divValue();
    return (
      <div>
        { dogPic === "" ? loadingMessage : div }
      </div>
      )
    }
  }

export default App;
