import React from "react";
import { getRecipeDetails } from "../redux/actions";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import style from "./Styles/Details.module.css"


class Details extends React.Component {

    componentDidMount(){
        this.props.getRecipeDetails(this.props.match.params.id);
    }
    
    render() {
        const { recipeDetails } = this.props
        return (
            <div className={style.div} key={this.props.match.params.id}>

            {/* NOMBRE */}
            <div className={style.title}>
            <h1>{recipeDetails.name}</h1>
            </div>
            
            {/* IMAGEN */}
            <div>
                {
                    recipeDetails.image ?  <img className={style.img} src={recipeDetails.image} alt="Img Not Found."></img>
                    :
                    <img className={style.img} src={"https://agencias.assist1.com.co/assets/images/no-image.png"} alt="Img Not Found."></img>
                }
            </div>

            {/* TIPO DE PLATO */}
            {recipeDetails.dish ?
                <div>
                    <h3  className={style.title}>Dish Type: </h3>
                    {recipeDetails.dish?.map(d => {
                        return (
                            <p key={d}>- {d[0].toUpperCase() + d.slice(1)} </p>
                        )
                    })}
                </div> :
                <h5 className={style.notFound}>This recipe has no dish type.</h5>
            }


            {recipeDetails.diets ?
                <div>
                <h3  className={style.title}>Types of diets: </h3>
                {
                    recipeDetails.diets?.map(d => {
                        if(d.hasOwnProperty('name')) {
                            return (
                                <p key={d.name}>- {d.name[0].toUpperCase() + d.name.slice(1)} </p>
                            )
                        } else {
                            return (
                                <p key={d}>- {d[0].toUpperCase() + d.slice(1)} </p>
                            )
                        }
                    })
                }
            </div>
                :
                <h5 className={style.notFound}>This recipe has no diet type.</h5>
            }

            

            {recipeDetails.summary ? 
            <div>
                <h3 className={style.title}>Summary: </h3>
                <p className={style.area1}>{recipeDetails.summary?.replace(/<[^>]*>/g, '')}</p>
            </div> :
                <h5 className={style.notFound}>This recipe does not have summary.</h5>
            }

            {recipeDetails.score ? 
            <div>
                <h3  className={style.title}>Score:</h3>
                <p>{recipeDetails.score}</p>
                <h3  className={style.health}>Health Score: </h3>
                <p>{recipeDetails.healthScore}</p>
            </div> :
                <h5 className={style.notFound}>This recipe does not have score.</h5>
            }

            {recipeDetails.steps ?
                <div>
                    <h3 className={style.title}>Steps: </h3>
                    <ul>{Array.isArray(recipeDetails.steps) ? recipeDetails.steps.map(s => {
                        return (
                            <p className={style.area2} key={s.number}>{s.number}: {s.step}</p>
                        )
                    }) :
                        <p className={style.area2}>{recipeDetails.steps}</p>
                    } </ul>
                </div> :
                <h5 className={style.notFound}>This recipe does not have step by step</h5>
            }

            <div>
            <Link to="/home"> <button className={style.btn}>HOME</button> </Link>
            </div>

        </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        recipeDetails: state.recipeDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipeDetails: (id) => dispatch(getRecipeDetails(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Details);

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getRecipeDetails } from "../redux/actions";
// import { Link } from 'react-router-dom';
// import style from "./Styles/Details.module.css"

// const Details = (props) => {

//     const dispatch = useDispatch();
//     const id = props.match.params.id;

//     useEffect(() => {
//         dispatch(getRecipeDetails(id))
//     }, [dispatch, id]);

//     const details = useSelector(state => state.recipeDetails);
//     // console.log(details)

//     return (
//         <div className={style.div} key={id}>

//             {/* NOMBRE */}
//             <div className={style.title}>
//             <h1>{details.name}</h1>
//             </div>
            
//             {/* IMAGEN */}
//             <div>
//                 {
//                     details.image ?  <img className={style.img} src={details.image} alt="Img Not Found."></img>
//                     :
//                     <img className={style.img} src={"https://agencias.assist1.com.co/assets/images/no-image.png"} alt="Img Not Found."></img>
//                 }
//             </div>

//             {/* TIPO DE PLATO */}
//             {details.dish ?
//                 <div>
//                     <h3  className={style.title}>Dish Type: </h3>
//                     {details.dish?.map(d => {
//                         return (
//                             <p key={d}>- {d[0].toUpperCase() + d.slice(1)} </p>
//                         )
//                     })}
//                 </div> :
//                 <h5 className={style.notFound}>This recipe has no dish type.</h5>
//             }


//             {details.diets ?
//                 <div>
//                 <h3  className={style.title}>Types of diets: </h3>
//                 {
//                     details.diets?.map(d => {
//                         if(d.hasOwnProperty('name')) {
//                             return (
//                                 <p key={d.name}>- {d.name[0].toUpperCase() + d.name.slice(1)} </p>
//                             )
//                         } else {
//                             return (
//                                 <p key={d}>- {d[0].toUpperCase() + d.slice(1)} </p>
//                             )
//                         }
//                     })
//                 }
//             </div>
//                 :
//                 <h5 className={style.notFound}>This recipe has no diet type.</h5>
//             }

            

//             {details.summary ? 
//             <div>
//                 <h3 className={style.title}>Summary: </h3>
//                 <p className={style.area1}>{details.summary?.replace(/<[^>]*>/g, '')}</p>
//             </div> :
//                 <h5 className={style.notFound}>This recipe does not have summary.</h5>
//             }

//             {details.score ? 
//             <div>
//                 <h3  className={style.title}>Score:</h3>
//                 <p>{details.score}</p>
//                 <h3  className={style.health}>Health Score: </h3>
//                 <p>{details.healthScore}</p>
//             </div> :
//                 <h5 className={style.notFound}>This recipe does not have score.</h5>
//             }

//             {details.steps ?
//                 <div>
//                     <h3 className={style.title}>Steps: </h3>
//                     <ul>{Array.isArray(details.steps) ? details.steps.map(s => {
//                         return (
//                             <p className={style.area2} key={s.number}>{s.number}: {s.step}</p>
//                         )
//                     }) :
//                         <p className={style.area2}>{details.steps}</p>
//                     } </ul>
//                 </div> :
//                 <h5 className={style.notFound}>This recipe does not have step by step</h5>
//             }

//             <div>
//             <Link to="/home"> <button className={style.btn}>HOME</button> </Link>
//             </div>

//         </div>
//     )
// }

// export default Details;
