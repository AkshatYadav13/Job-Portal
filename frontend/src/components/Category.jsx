import React, { useRef } from "react";
import css from "../css/category.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobSlice";

const Category = () => {
  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "Data Scientist",
    "Software engineer",
    "AI-ML Developer",
    "Web Designer",
  ];

  const sliderRef = useRef(null); 
  const scrollAmount = 300; 

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function searchJobHandler(query){
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }


  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };


  return (
    <div className={css.main}>
        <span className={`material-symbols-outlined ${css.arrow}`}  onClick={handlePrev}>arrow_back</span>
        <div className={css.slidewrap} ref={sliderRef} >
          {categories.map((e, idx) => (
            <button onClick={()=> searchJobHandler(e)}  key={idx}>{e}</button>
          ))}
        </div>
        <span className={`material-symbols-outlined ${css.arrow}`} onClick={handleNext} >arrow_forward</span>
    </div>
  );
};

export default Category;
