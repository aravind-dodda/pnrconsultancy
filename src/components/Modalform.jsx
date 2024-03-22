import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { serverurl } from '../pages/Positionslist';
import { positionsData } from '../data/data';
import { sendTelegramNotification } from '../telegram/notification';

const Modalform = ({ handleClose, show, selectedposition, errors, handleerrors }) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [spinner, setSpinner] = useState(false);
  // const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);

  const handleClosebtn = () => {
    setFile(null)
    setName('');
    setMobile('');
    setEmail('');
    handleClose();
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const validate = () => {
    let errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }
    if (!mobile) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobile)) {
      errors.mobile = 'Mobile number must be 10 digits';
    }
    if (!email) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSpinner(true)
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      handleerrors({})
      let position = positionsData.find(position => position._id === selectedposition);

      let message = `
      A new application has been received for the position of ${position.name} . 
The details of the applicant are as follows:

Subject: ${position.name}
Experience: ${position.experience.name}
Salary: ${position.salary}
Name: ${name}
Email: ${email}
Mobile Number: ${mobile}
      `
      sendTelegramNotification(message);
      handleClosebtn();
      setSpinner(false);
      // submit form data
      //       var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "multipart/form-data");
      // const formdata = new FormData();
      // formdata.append("name", name);
      // formdata.append("email", email);
      // formdata.append("mobile", mobile);
      // formdata.append("positionid", selectedposition);
      // formdata.append("myfile", file);
      // var raw = JSON.stringify({
      //   "name": name,
      //   "email": email,
      //   "mobile": mobile,
      //   "positionid": selectedposition
      // });

      // var requestOptions = {
      //   method: 'POST',
      //   // headers: myHeaders,
      //   body: formdata,
      //   redirect: 'follow'
      // };

      // fetch(`${serverurl}/application`, requestOptions)
      //   .then(response => response.text())
      //   .then(result => {
      //     console.log(result)
      //      // clear form

      //      handleClosebtn();
      //      setSpinner(false);
      //   })
      //   .catch(error => {
      //     console.log('error', error);
      //     handleerrors(errors);
      //     setSpinner(false);

      //   });

    } else {

      handleerrors(errors);
      setSpinner(false);

    }
  };
  return (
    <>

      <Modal show={show} onHide={handleClosebtn}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for Position</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                autoFocus
                onChange={(event) => setName(event.target.value)}
              />
              {errors.name && <span className='text-danger fs-6'>{errors.name}</span>}

            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(event) => setEmail(event.target.value)}

              />
              {errors.email && <span className='text-danger fs-6'>{errors.email}</span>}

            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label >Mobile Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Mobile Number"
                onChange={(event) => setMobile(event.target.value)}
              />
              {errors.mobile && <span className='text-danger fs-6'>{errors.mobile}</span>}

            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Resume</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosebtn}>
            Close
          </Button>
          {spinner ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className='pe-2'
              />
              <span>Submitting...</span>
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              <span>Submit</span>
            </Button>
          )}



        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Modalform