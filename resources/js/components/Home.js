import React, {Fragment, useState} from 'react';
import {Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => {

    //modal
    const [modalShow, setModalShow] = useState(false);

    const handleClose = ()=>setModalShow(false)


    //changing inner text of add and edit button
    const [addNew,setAddNew] = useState(true)

    //add new student info
    const [name,setName] = useState("");
    const [age,setAge] = useState("");
    const [classname,setClassname] = useState("");
    const [image,setImage] = useState();

    //validation error
    const [error,setError] = useState([])

    //click on add student button
    const addStudent = ()=>{
        setModalShow(true)
        setAddNew(true)
        setName("")
        setAge("")
        setClassname("")
        setImage()
        setError([]);
    }

    //clear form
    const closBtnHandler = ()=>{

        setModalShow(false)
        setName("")
        setAge("")
        setClassname("")
        setImage()
        setError([]);

    }

    //insert image into input file
    const imageHandler = (e)=>{
        setImage(e.target.files[0])
    }

    const saveStudent = async ()=>{

        let formData = new FormData();

        formData.append('name',name);
        formData.append('age',age);
        formData.append('class',classname);
        formData.append('image',image);

        const res = await axios.post('/api/student/store',formData);

        if (res.data.status === 200){

            console.log(res.data)
            // getStudents();

            setModalShow(false)

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            await Toast.fire( {
                icon: 'success',
                title: 'Student Info Added successfully'
            })

            setName("")
            setAge("")
            setClassname("")
            setImage()
            setError([]);



        }else {

            setError({
                error_list: res.data.validation_error
            });

        }

    }

    const updateStudent = ()=>{

    }




    return (
        <Fragment>
            <div className="container mt-5">
              <div className="row d-flex justify-content-center">

                  <div className="col-8">
                      <div className="clearfix mb-3">
                          <h4 className="float-start">Students Information</h4>

                          <button onClick={addStudent} className="float-end btn btn-sm btn-success">Add new</button>

                      </div>

                      <table className="table table-bordered">
                          <thead>
                          <tr>
                              <th>Id</th>
                              <th>Image</th>
                              <th>Name</th>
                              <th>Age</th>
                              <th>Class</th>
                              <th>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                              <td>01</td>
                              <td>
                                  <img src="" style={{width: '120px',height: '80px'}} alt="Image"/>
                              </td>
                              <td>Nazmul</td>
                              <td>28</td>
                              <td>MBA</td>
                              <td>
                                  <button onClick={(e)=>editStudent(student,e)} className="btn btn-success btn-sm ms">Edit</button>
                                  <button onClick={(e)=>deleteStudent(e,student.id)}  className="btn btn-danger btn-sm ms-2">Delete</button>
                              </td>
                          </tr>
                          </tbody>
                      </table>

                  </div>


                  {/*  ========Modal ========*/}

                  <Modal show={modalShow} onHide={handleClose} centered>

                      <Modal.Header closeButton>
                          <Modal.Title>{addNew === true ? 'Add New Student': 'Edit Student'}</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>

                          <form method="post">
                              <div className="row">

                                  <div className="col-12">
                                      <div className="form-group mb-3">
                                          <input type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}   id="name" className="form-control" placeholder="Your Name"/>
                                          <span className="text-danger">{error.name}</span>
                                      </div>
                                  </div>
                                  <div className="col-12">
                                      <div className="form-group mb-3">
                                          <input type="text" name="age" id="age" value={age} onChange={(e)=>{setName(e.target.value)}}    className="form-control" placeholder="Your Age"/>
                                          <span className="text-danger">{error.age}</span>
                                      </div>
                                  </div>
                                  <div className="col-12">
                                      <div className="form-group mb-3">
                                          <input type="text" name="class" id="class" value={classname} onChange={(e)=>{setName(e.target.value)}}   className="form-control" placeholder="Your Class"/>
                                          <span className="text-danger">{error.class}</span>
                                      </div>
                                  </div>

                                  <div className="col-12">
                                      <div className="form-group mb-3">
                                          <input type="file" name="image" id="image"  onChange={imageHandler}   className="form-control" />
                                          <span className="text-danger">{error.image}</span>
                                      </div>
                                  </div>

                              </div>

                              <Modal.Footer>
                                  <button type="button" className="btn btn-danger btn-sm" onClick={closBtnHandler}>Close</button>
                                  {addNew === true? (
                                      <button type="submit" onClick={saveStudent} className="btn btn-success btn-sm">
                                          Save
                                      </button>
                                  ) : (
                                      <button type="submit" onClick={updateStudent} className="btn btn-success btn-sm">
                                          Update
                                      </button>
                                  )}

                              </Modal.Footer>

                          </form>
                      </Modal.Body>


                  </Modal>


              </div>
            </div>
        </Fragment>
    );
};

export default Home;
