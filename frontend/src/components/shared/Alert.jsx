import React, { useEffect } from "react";
import css from "../../css/alert.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/appSlice";

const Alert = () => {
  const { alert } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setAlert(""));
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [alert.message,dispatch]);

  if (!alert.message) return null;

  function handleOnClick() {
    dispatch(setAlert(""));
  }

  return (
    <div className={css.alert}>
      <h3>{alert.message}</h3>
      <span className="material-symbols-outlined" onClick={handleOnClick}>
        close
      </span>
    </div>
  );
};

export default Alert;
