// import "./products.css";
import { useState, useEffect  } from "react";
import { withRouter } from "react-router-dom";
import "./details.css"
import Axios from "axios";
import { CircleToBlockLoading } from 'react-loadingg';
function Details(props) {
  
const [details,setDetails] = useState({})

  useEffect(() => {
    async function getData(id) {

      let detailsData = await Axios.get(
        `https://aveosoft-react-assignment.herokuapp.com/products/${id}`
      );

      setDetails(detailsData.data)

    }
    getData(props.location.state.id);
  }, []);
  
 





  return (
    <div className="Details">
     


     {details.hasOwnProperty("name") ?(
       <>
       <div className="details_left_image_holder">
     <div className="details_left_Image_panel">
     </div>
     
     </div>
     <div  className="details_right_details_panel">
     MODEL
     <h1>{details.name}</h1>  
       <br/>
       PRICE
       <h3>{details.price}</h3>
       <br/>
       DESCRIPTION
       <p>{details.description}</p>
     </div>
     </>
) : (
  <CircleToBlockLoading />
 )}

    </div>
  );
}


export default  withRouter(Details)