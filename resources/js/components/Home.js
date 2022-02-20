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
    const [info,setInfo] = useState({
        name: '',
        age: '',
        class: '',
        id: ''
    })

    //validation error
    const [error,setError] = useState({
        error_list: []
    })

    //click on add student button
    const addStudent = ()=>{
        setModalShow(true)
        setAddNew(true)
        setInfo({
            name: '',
            age: '',
            class: '',
            id: ''
        })
        setError({
            error_list: []
        });
    }

    //clear form
    const closBtnHandler = ()=>{

        setModalShow(false)
        setInfo({
            name: '',
            age: '',
            class: '',
            id: ''
        })
        setError({
            error_list: []
        });

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
                              <th>Name</th>
                              <th>Age</th>
                              <th>Class</th>
                              <th>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                              <td>01</td>
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
                                          <input type="text" name="name"   id="name" className="form-control" placeholder="Your Name"/>
                                          {/*<span className="text-danger">{error.error_list.name}</span>*/}
                                      </div>
                                  </div>
                                  <div className="col-12">
                                      <div className="form-group mb-3">
                                          <input type="text" name="age" id="age"   className="form-control" placeholder="Your Age"/>
                                          {/*<span className="text-danger">{error.error_list.age}</span>*/}
                                      </div>
                                  </div>
                                  <div className="col-12">
                                      <div className="form-group mb-3">
                                          <input type="text" name="class" id="class"   className="form-control" placeholder="Your Class"/>
                                          {/*<span className="text-danger">{error.error_list.class}</span>*/}
                                      </div>
                                  </div>

                                  <div className="col-12">
                                      <div className="form-group mb-3">
                                          <input type="file" name="image" id="image"   className="form-control" />
                                          {/*<span className="text-danger">{error.error_list.class}</span>*/}
                                      </div>
                                  </div>

                              </div>

                              <Modal.Footer>
                                  <button type="button" className="btn btn-danger btn-sm" onClick={closBtnHandler}>Close</button>
                                  {/*{addNew === true? (*/}
                                  {/*    <button type="submit" onClick={saveStudent} className="btn btn-success btn-sm">*/}
                                  {/*        Save*/}
                                  {/*    </button>*/}
                                  {/*) : (*/}
                                  {/*    <button type="submit" onClick={updateStudent} className="btn btn-success btn-sm">*/}
                                  {/*        Update*/}
                                  {/*    </button>*/}
                                  {/*)}*/}

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
