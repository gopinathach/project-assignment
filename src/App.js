import "./styles.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import Products from "./Products";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Details from "./Details";

export default function App() {
  const [products, setProducts] = useState([]);
  const [productsCatergories, setProductsCategories] = useState([]);
  const [selection, setSelection] = useState("");

  useEffect(() => {
    async function getData() {
      let fetched = await Axios.get(
        "https://aveosoft-react-assignment.herokuapp.com/products"
      );
      let fetchedDropDownValues = await Axios.get(
        "https://aveosoft-react-assignment.herokuapp.com/categories"
      );
      console.log(fetched.data);
      // console.log(fetchedDropDownValues.data);
      setProductsCategories(fetchedDropDownValues.data);
      setProducts(fetched.data);
      window.fetcheddata1 = fetched.data;
    }
    getData();
  }, []);

  const handleSelection = (data) => {
    setSelection(data);
    if (data == "Laptops") {
      setProducts(
        window.fetcheddata1.filter((e) => {
          return e.categoryId == 0;
        })
      );
    } else if (data == "Mobiles") {
      setProducts(
        window.fetcheddata1.filter((e) => {
          return e.categoryId == 1;
        })
      );
    } else {
      setProducts(window.fetcheddata1);
    }
  };

  return (
    <Router>
      <div className="upper_app">
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(event) => handleSelection(event.target.value)}
        >
          <option> Select any Filter</option>
          {productsCatergories.map((e) => (
            <>
              <option value={e.name}>{e.name}</option>
            </>
          ))}
        </select>
        <Switch>
          <Route path="/detail:id" >
            <Details />
          </Route>
        </Switch>

        <Switch>
          <Route path="/" exact>
            <div className="App">
              {products.map((e) => (
                <>
                  <Link
                    to={{
                      pathname: `/detail?${e.id}`,
                      state: {
                        id: e.id
                      }
                    }}
                  >
                    <Products name={e.name} model={e.model} price={e.price} />
                  </Link>
                </>
              ))}
            </div>
          </Route>
        </Switch>

        {/* {selection} */}
      </div>
    </Router>
  );
}
