import React, {useState,useEffect} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

function App() {
  const [items, setItems] = useState([]);
  const URL = "http://localhost:3000"
  
  const [name,setName] = useState('')
  const [type,setType] = useState('')
  const [price,setPrice] = useState(0)
  const [stock,setStock] = useState(0)

  const getItems = () => {
    axios({
      method: "GET",
      url: `${URL}/items`
    })
    .then(result=>{
      console.log(result.data)
      setItems(result.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getItems()
    },[])
  
  const submitHandler = (e) =>{
    e.preventDefault()
    axios({
      method: "POST",
      url:`${URL}/items`,
      data :{
        name, type, price:+price, stock:+stock
      }
    })
    .then(result=>{
      console.log(result.data)
      getItems()
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const deleteHandler = (e,id) =>{
    e.preventDefault()
    axios({
      method: "DELETE",
      url:`${URL}/items/${id}`,
    })
    .then(result=>{
      console.log(result.data)
      getItems()
      
    })
    .catch(err=>{
      console.log(err)
    })
    
  }
  return (
    <div className="container">
      <div className="row text-center">
          <div className="col-12 bg-primary text-white">
             <h1>Inventory Application</h1>
          </div>
      </div>
      <div className="row">
        <div className="col-4">
            <div className="row">
              <div className='col-12'>
                <h3>Input item</h3>
                <hr></hr>
              </div>
              <div className="col-12">
                <form>
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" class="form-control" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div class="mb-3">
                  <label for="type" class="form-label">Type</label>
                  <input type="text" class="form-control" onChange={(e) => setType(e.target.value)}/>
                </div>
                <div class="mb-3">
                  <label for="price" class="form-label">Price</label>
                  <input type="text" class="form-control" onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div class="mb-3">
                  <label for="stock" class="form-label">Stock</label>
                  <input type="text" class="form-control" onChange={(e) => setStock(e.target.value)}/>
                </div>
                <button type="submit" class="btn btn-primary" onClick={(e)=> submitHandler(e)}>Submit</button>
              </form>
              </div>
            </div>

        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-12"> 
                <h3>List Items</h3>
                <hr/>   
            </div>
            <div className="col-12">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                   {
                    items.map(data=>{
                      console.log(data)
                    return(
                      <tr>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.type}</td>
                        <td>{data.price}</td>
                        <td>{data.stock}</td>
                        <td><button className='btn btn-sm btn-danger' onClick={(e)=>deleteHandler(e,data.id)}>Delete</button></td>
                      </tr>
                    )
                    })
                   }
                </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
