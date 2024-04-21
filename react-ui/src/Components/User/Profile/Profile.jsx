import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import './Profile.css'
import swal from 'sweetalert2'
import { nameValidation,usernameValidation } from '../../../Script/Common';
import store,{setProfile} from '../../../redux';
import Nave from '../navbar/Nave';


function Profile() {
    const userDetails = useSelector(state => state.reducer.userDetails)
    const [edit, setEdit] = useState(false)
    const [img, setImg] = useState(null);
    const [name, setName] = useState(userDetails.name)
    const [gender, setGender] = useState(userDetails.gender)
    const [username, setUsername] = useState(userDetails.username)
    const [nameError, setNameError] = useState('')
    const [userNameError, setUserNameError] = useState('')

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const reader = new FileReader()
        reader.onload = function (event) {
            const result = event.target.result;
            userDetails.image = result
            setImg(e.target.files[0])
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };
    const onImgUpdate = async () => {
        const newFileName = userDetails._id + '.jpg';

        const formData = new FormData();
        formData.append('image', img, newFileName);
        formData.append('id', userDetails._id)

        const response = await fetch(process.env.REACT_APP_BASIC_URL + process.env.REACT_APP_USER_IMG, {
            method: 'POST',
            body: formData,
        });
        console.log(response);
        swal.fire({
            title: 'Success',
            text: 'Profile Updated Successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })
        setImg(null)
    };

    const setDetails = (e) => {
        const { name, value } = e.target
        switch (name) {
            case 'name':
                setNameError('')
                setName(value)
                break;
            case 'username':
                setUserNameError('')
                setUsername(value)
                break;
            case 'gender':
                setGender(value)
                break;
            default:
                break;
        }
    }
    const exitUpdate = () => {
        setEdit(false)
        setName(userDetails.name)
        setUsername(userDetails.username)
        setNameError('')
        setUserNameError('')
    }
    const updateProfile = async () => {
        let check = true
        if (!nameValidation(name, setNameError)) {
            check = false
        }
        if (!usernameValidation(username, setUserNameError)) {
            check = false
        }

        if (!check) {
            return false
        }
        const data = {
            name, username, gender
        }
        store.dispatch(setProfile(data))
        const response = await fetch(process.env.REACT_APP_BASIC_URL + process.env.REACT_APP_USER_PROFILE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, username, gender, id: userDetails._id })
        })
        console.log(response);
        exitUpdate()
        swal.fire({
            title: 'Success',
            text: 'Profile Updated Successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })

    }

  return (
    <div>
            <Nave/>
            <div className="sidenav">
                <div className="profile">
                    <img src={userDetails.image ? userDetails.image : "https://imdezcode.files.wordpress.com/2020/02/imdezcode-logo.png"} alt="" width="100" height="100" />
                    <div className="name">
                        <label htmlFor="fileInput" className="rounded-circle">
                            <i className="fa fa-plus rounded text-light"></i>
                            <input
                                type="file"
                                id="fileInput"
                                hidden
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </label>
                        {img && img ? <button className='btn ml-2' onClick={onImgUpdate}>Update</button> : null}
                    </div>
                </div>
            </div>
            <div className="main profile">
                <h2>Profile</h2>
                <div className="card">
                    <div className="card-body">
                        {!edit ? (
                            <i className="fa fa-pen fa-xs edit" onClick={() => setEdit(true)}></i>
                        ) : (
                            <>
                                <i className="fa fa-times fa-xs edit" onClick={exitUpdate}></i>
                                <i className="fa fa-check fa-xs edit mt-5 ml-2" onClick={updateProfile}></i>
                            </>
                        )}
                        <table>
                            <tbody>
                                <tr style={{ height: '40px' }}>
                                    <td style={{ color: 'white' }} >Name</td>
                                    <td style={{ color: 'white' }}>:</td>
                                    <td style={{ color: 'white' }}>{edit ? <input type="text" name='name' onChange={setDetails} value={name} /> : userDetails.name}</td>
                                    <p>{nameError}</p>
                                </tr>
                                <tr>
                                    <td style={{ color: 'white' }}>Email</td>
                                    <td style={{ color: 'white' }}>:</td>
                                    <td style={{ color: 'white' }}>{userDetails.email}</td>
                                </tr>
                                <tr>
                                    <td style={{ color: 'white' }}>Gender</td>
                                    <td style={{ color: 'white' }}>:</td>
                                    <td style={{ color: 'white' }}>{gender ? gender : 'Mention Your Gender'}
                                        {edit ? (
                                            <div className="btn-group btn-group-toggle ml-5" data-toggle="buttons">
                                                <label className={'btn btn-secondary ' + (gender === 'Male' ? 'active' : '')}>
                                                    <input type="radio" name="gender" onClick={setDetails} value={'Male'} id="option1" autoComplete="off" /> Male
                                                </label>
                                                <label className={'btn btn-secondary ' + (gender === 'Female' ? 'active' : '')}>
                                                    <input type="radio" name="gender" onClick={setDetails} value={'Female'} id="option2" autoComplete="off" /> Female
                                                </label>
                                            </div>
                                        ) : ''}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ color: 'white' }}>Username</td>
                                    <td style={{ color: 'white' }}>:</td>
                                    <td style={{ color: 'white' }}>{edit ? <input type="text" name='username' onChange={setDetails} value={username} /> : userDetails.username}</td>
                                    <td>{userNameError}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Profile
