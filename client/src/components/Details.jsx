import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../redux/actions";
import { Link } from 'react-router-dom';
import style from "./Styles/Details.module.css"

const Details = (props) => {

    const dispatch = useDispatch();
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getRecipeDetails(id))
    }, [dispatch, id]);

    const details = useSelector(state => state.recipeDetails);
    // console.log(details)

    return (
        <div className={style.div} key={id}>

            {/* NOMBRE */}
            <div className={style.title}>
            <h1>{details.name}</h1>
            </div>
            
            {/* IMAGEN */}
            <div>
                <img className={style.img} src={details.image} alt="Img not found"></img>
            </div>

            {/* TIPO DE PLATO */}
            {details.dish ?
                <div>
                    <h3  className={style.title}>Dish Type: </h3>
                    {details.dish?.map(d => {
                        return (
                            <p key={d}>- {d[0].toUpperCase() + d.slice(1)} </p>
                        )
                    })}
                </div> :
                <h5 className={style.notFound}>Dish Type not found.</h5>
            }


            {details.diets ?
                <div>
                <h3  className={style.title}>Types of diets: </h3>
                {
                    details.diets?.map(d => {
                        if(d.hasOwnProperty('name')) {
                            return (
                                <p key={d}>- {d.name[0].toUpperCase() + d.name.slice(1)} </p>
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
                <h5 className={style.notFound}>Diet Type not found.</h5>
            }

            

            {details.summary ? 
            <div>
                <h3 className={style.title}>Summary: </h3>
                <p className={style.area}>{details.summary?.replace(/<[^>]*>/g, '')}</p>
            </div> :
                <h5 className={style.notFound}>This recipe does not have summary.</h5>
            }

            {details.score ? 
            <div>
                <h3  className={style.title}>Score:</h3>
                <p>{details.score}</p>
                <h3  className={style.title}>Health Score: </h3>
                <p>{details.healthScore}</p>
            </div> :
                <h5 className={style.notFound}>This recipe does not have score.</h5>
            }

            {details.steps ?
                <div>
                    <h3 className={style.title}>Steps: </h3>
                    <ul>{Array.isArray(details.steps) ? details.steps.map(s => {
                        return (
                            <p className={style.area} key={s.number}> {s.number}: {s.step}</p>
                        )
                    }) :
                        <p className={style.area}>{details.steps}</p>
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

export default Details;

// import React from "react";
// import { getRecipeDetails } from "../redux/actions";
// import { Link } from 'react-router-dom';
// import {connect} from 'react-redux'


// class Details extends React.Component {
    
//     componentDidMount(){
//         this.props.getRecipeDetails(this.props.match.params.id);
//     }

//     render() {
//         return (
//             <div key={this.props.match.params.id}>

//                 {/* IMAGEN */}
//                 <div>
//                     <img src={this.props.recipeDetails.image} alt="Img not found"></img>
//                 </div>

//                 {/* NOMBRE */}
//                 <h1>{this.props.recipeDetails.name}</h1>

//                 {/* TIPO DE PLATO */}
//                 {this.props.recipeDetails.dish ?
//                     <div>
//                         <h3>Dish Type: </h3>
//                         {this.props.recipeDetails.dish?.map(d => {
//                             return (
//                                 <p key={d}> {d.charAt(0).toUpperCase() + d.slice(1)} </p>
//                             )
//                         })}
//                     </div> :
//                     <h5>Dish Type not found.</h5>
//                 }

//                 {this.props.recipeDetails.diet ?
//                     <div>
//                         <h3>Diet Type: </h3>
//                         {this.props.recipeDetails.diets?.map(d => {
//                             return (
//                                 <p key={d}> {d.charAt(0).toUpperCase() + d.slice(1)} </p>
//                             )
//                         })}
//                     </div> :
//                     <h5>Diet Type not found.</h5>
//                 }

//                 {this.props.recipeDetails.score ?
//                     <div>
//                         <h3>Summary: </h3>
//                         <p>{this.props.recipeDetails.summary?.replace(/<[^>]*>/g, '')}</p>
//                     </div> :
//                     <h5>This recipe does not have summary.</h5>
//                 }

//                 {this.props.recipeDetails.score ?
//                     <div>
//                         <h4>Score: {this.props.recipeDetails.score} </h4>
//                         <h4>Health Score: {this.props.recipeDetails.healthScore} </h4>
//                     </div> :
//                     <h5>This recipe does not have score.</h5>
//                 }

//                 {this.props.recipeDetails.steps ?
//                     <div>
//                         <h3>Steps: </h3>
//                         <ul>{Array.isArray(this.props.recipeDetails.steps) ? this.props.recipeDetails.steps.map(s => {
//                             return (
//                                 <p key={s.number}> {s.number}: {s.step}</p>
//                             )
//                         }) :
//                             <p>{this.props.recipeDetails.steps}</p>
//                         } </ul>
//                     </div> :
//                     <h5>This recipe does not have step by step</h5>
//                 }


//                 <Link to="/home"> <button>HOME</button> </Link>

//             </div>
//         )
//     }
// }


// function mapStateToProps(state) {
//     return {
//         recipeDetails: state.recipeDetails,
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         getRecipeDetails: (id) => dispatch(getRecipeDetails(id))
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Details);