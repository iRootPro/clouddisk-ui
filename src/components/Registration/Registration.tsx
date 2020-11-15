import React from 'react';
import {useFormik} from "formik";

const Registration = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        // validate: (values) => {
        //     let errors = {email: '', password: ''}
        //     if (!values.email) {
        //         errors.email = 'Необходимо ввести email'
        //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        //         errors.email = 'Не верный формат email'
        //     }
        //     return errors
        // },
        onSubmit: (values) => {
            console.log(values)
        }
    })

    return (
        <div className={"valign-wrapper"} style={{height: "90vh"}}>
            <div className={"row z-depth-2"}>
                <div className="row">
                    <div className={"col s12 center-align"}>
                        <h3>Регистрация</h3>
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
                               <button type="submit" className="blue darken-1 btn">Зарегистрироваться</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
