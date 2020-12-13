import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../store/store";
import style from "./Profile.module.css"
import {API_URL} from "../../utils/config";
import {removeAvatarTC, uploadAvatarTC} from "../../reducers/userReducer";

const Profile = () => {
    const currentUser = useSelector<AppRootState, any>(state => state.user.currentUser)
    const dispatch = useDispatch()

    function uploadAvatarHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const formData = new FormData()
        if (e.target.files) {
            const file = e.target.files[0]
            formData.append('file', file)
            dispatch(uploadAvatarTC(formData))
        }

    }

    function removeAvatarHandler() {
        dispatch(removeAvatarTC())
    }

    return (
        <div className={style.profile}>
            <div className={style.header}>Профиль пользователя {currentUser.email}</div>
            <div className={style.avatarBlock}>
                <div className={style.manageAvatar}>
                    <button onClick={removeAvatarHandler} className="btn blue darken-1">Удалить аватар</button>
                    <div className="btn blue darken-1 file-field input-field"><span>Загрузить аватар</span><input onChange={e => uploadAvatarHandler(e)} type="file"/></div>
                </div>
                <div className={style.avatar}>{currentUser.avatar ? <img src={API_URL + '/' + currentUser.avatar} width="84px"/> :
                    <i className="large material-icons" style={{marginLeft: "20px"}}>account_circle</i>}</div>
            </div>

        </div>
    );
};

export default Profile;
