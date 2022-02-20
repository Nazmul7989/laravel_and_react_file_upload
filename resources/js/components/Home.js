import React, {Fragment, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'

const Home = () => {

    //modal
    const [modalShow, setModalShow] = useState(false);

    const handleClose = ()=>setModalShow(false)


    //changing inner text of add and edit button
    const [addNew,setAddNew] = useState(true)

    //add new student info
    const [id,setId] = useState();
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
        setId()
        setName("")
        setAge("")
        setClassname("")
        setImage()
        setError([]);
    }

    //clear form
    const closBtnHandler = ()=>{

        setModalShow(false)
        setId()
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

    const saveStudent = async (e)=>{
        e.preventDefault();

        let formData = new FormData();

        formData.append('name',name);
        formData.append('age',age);
        formData.append('class',classname);
        formData.append('image',image);

        const res = await axios.post('/api/student/store',formData);

        if (res.data.status === 200){

            getStudents();

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

            setId()
            setName("")
            setAge("")
            setClassname("")
            setImage()
            setError([]);

        }else {

            setError(res.data.validation_error);

        }

    }

    //set data from fetched student info
    const [students,setStudents] = useState([]);

    //fetch all student info
    const getStudents = ()=>{
        axios.get('/api/student').then((response)=>{
            let studentsData = response.data.students;
            setStudents(studentsData);

        }).catch((error)=>{
            console.log(error);
        })
    }

    //fetch data when component mount
    useEffect(()=>{
        getStudents();
    },[])


    //edit student info
    const editStudent = (student)=>{
        setModalShow(true)
        setAddNew(false);

        setId(student.id)
        setName(student.name)
        setAge(student.age)
        setClassname(student.class)
        setImage(student.image)
        setError([]);
    }

    //update student
    const updateStudent = async (e)=>{
        e.preventDefault();

        let formData = new FormData();
        
        formData.append('name',name);
        formData.append('age',age);
        formData.append('class',classname);
        formData.append('image',image);

        const res = await axios.put('/api/student/update/'+ id,formData);

        if (res.data.status === 200){

            getStudents();
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
                title: 'Student Info Updated successfully'
            })


            setId()
            setName("")
            setAge("")
            setClassname("")
            setImage()
            setError([]);

        }else {

            setError(res.data.validation_error);

        }

    }

    //delete student
    const deleteStudent = async (e,id)=>{

        const currenTargetButton = e.currentTarget;

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete('/api/student/delete/'+id).then((response)=>{

                    currenTargetButton.closest('tr').remove();

                }).catch((error)=>{
                    console.log(error);
                })

                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Student Info Deleted Successfully.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe )',
                    'error'
                )
            }
        })

    }


    //looping the fetched students info
    const studentData = students.map((student)=>{
        return <tr key={student.id}>
            <td>{student.id}</td>
            <td>
                <img src={student.image} style={{width: '120px',height: '80px'}} alt="Image"/>
            </td>
            <td>{student.name}</td>
            <td>{student.age}</td>
            <td>{student.class }</td>
            <td>
                <button onClick={(e)=>editStudent(student,e)} className="btn btn-success btn-sm ms">Edit</button>
                <button onClick={(e)=>deleteStudent(e,student.id)}  className="btn btn-danger btn-sm ms-2">Delete</button>
            </td>
        </tr>
    });



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
                          {studentData}
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
                                          <input type="text" name="age" id="age" value={age} onChange={(e)=>{setAge(e.target.value)}}    className="form-control" placeholder="Your Age"/>
                                          <span className="text-danger">{error.age}</span>
                                      </div>
                                  </div>
                                  <div className="col-12">
                                      <div className="form-group mb-3">
                                          <input type="text" name="class" id="class" value={classname} onChange={(e)=>{setClassname(e.target.value)}}   className="form-control" placeholder="Your Class"/>
                                          <span className="text-danger">{error.class}</span>
                                      </div>
                                  </div>

                                  <div className="col-12">
                                      <div className="row">
                                          <div className="col-9">
                                              <div className="form-group mb-3">
                                                  <input type="file" name="image" id="image"  onChange={imageHandler}   className="form-control" />
                                                  <span className="text-danger">{error.image}</span>
                                              </div>
                                          </div>
                                          <div className="col-3 text-end">
                                              <img src={image} style={{width: '80px',height:'60px', marginTop:'-10px'}} alt="Image"/>
                                          </div>
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
