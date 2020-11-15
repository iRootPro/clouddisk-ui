import React from 'react';
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {loginTC} from "../../reducers/userReducer";

const Login = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            try {
                await dispatch(loginTC(values.email, values.password))
            }
            catch (e) {
                console.log(e)
            }
        }
    })
    return (
        <div className={"valign-wrapper"} style={{height: "90vh"}}>
            <div className={"row z-depth-2"}>
                <div className="row">
                    <div className={"col s12 center-align"}>
                        <h3>Вход в Cloud Disk</h3>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="col s12 center-align">
                        <div className="row">
                            <div className="input-field col s12 active">
                                <i className="material-icons prefix">email</i>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                                <label htmlFor="email">Почта</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">vpn_key</i>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button type="submit" className="blue darken-1 btn">Войти</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
