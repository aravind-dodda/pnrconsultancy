


import heroImage from '../desk.png';
import job from '../job.png';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { serverurl } from '../pages/Positionslist';
import { sendTelegramNotification } from '../telegram/notification';
import { experiencesData, subjectsData } from '../data/data';





function HeroSection({ subjects, experiences }) {
  // style={{ color: '#3C64F5' }}
  const navigate = useNavigate();

  const [selectedexperience, setselectedexperience] = useState(0);
  const [selectedworktype, setselectedworktype] = useState(0);
  const [selectedsubject, setselectedsubject] = useState(0);
  const [mobile, setMobile] = useState(0);
  const [errors, setErrors] = useState({});
  const [spinner, setSpinner] = useState(false);


  const handlesearchclick = () => {
    setSpinner(true)
    const newErrors = {};
    if (selectedsubject === 0) {
      newErrors.subject = "Please select a subject";
    }
    // if (selectedexperience === 0) {
    //   newErrors.experience = "Please select an experience";
    // }
    if (selectedworktype === 0) {
      newErrors.worktype = "Please select a work type";
    }
    if (isNaN(mobile) || mobile.length !== 10) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSpinner(false)
    } else {
      setErrors({});
      let subject = subjectsData.find(subject => subject._id === selectedsubject);
      let subjectName = subject ? subject.name : '';
      let experience = experiencesData.find(experience => experience._id === selectedexperience);
      let experienceName = experience ? experience.name : '';
      let worktype = selectedworktype === 1 ? 'Full Time' : 'Part Time';
      let message = `A new search query has been received on our website. Here are the details of the search:

Subject: ${subjectName}
Experience: ${experienceName}
Work Type: ${worktype}
Mobile Number: ${mobile}`;
      sendTelegramNotification(message)
      setSpinner(false)
      navigate(`/positionslist?subjectid=${selectedsubject}&experienceid=${selectedexperience}&worktypeid=${selectedworktype}&mobileno=${mobile}`);
      // form is valid, continue with search

      // var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");

      // var raw = JSON.stringify({
      //   "experienceid": selectedexperience,
      //   "subjectid": selectedsubject,
      //   "mobile": mobile,
      //   "worktype": selectedworktype
      // });

      // var requestOptions = {
      //   method: 'POST',
      //   headers: myHeaders,
      //   body: raw,
      //   redirect: 'follow'
      // };

      // fetch(`${serverurl}/search`, requestOptions)
      //   .then(response => response.text())
      //   .then(result => {
      //     result = JSON.parse(result)
      //     if (result.status === 200) {
      //       setSpinner(false)
      //       navigate(`/positionslist?subjectid=${selectedsubject}&experienceid=${selectedexperience}&worktypeid=${selectedworktype}&mobileno=${mobile}`); // redirect to positionslist page
      //     } else {
      //       let error = {
      //         response: "unable to search please try again",
      //       }
      //       setSpinner(false);
      //       setErrors(error);
      //       console.log(errors)
      //       // throw new Error('Network response was not ok.');
      //     }
      //   })
      //   .catch(error => {
      //     setSpinner(false);
      //     let err = {
      //       response: "unable to search please try again",
      //     }
      //     setErrors(err);

      //     console.log('error', error)
      //   });
    }
  }

  const handlesubjectchange = (event) => {
    let id = event.target.value
    console.log(event.target.name)
    setselectedsubject(id)



  }
  const handleexperiencechange = (event) => {
    let id = event.target.value
    setselectedexperience(id)

  }
  const handleworktypechange = (event) => {
    let id = event.target.value
    setselectedworktype(id)

  }

  return (
    <div style={{ backgroundColor: 'rgb(242 246 255)' }}>
      <div className="container mb-5 pb-md-5 pt-md-5" >
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-6 p-3 p-lg-0">
            <h2 className=" fw-bold lh-1">Get The <span className='myhighlightcolor'>Right Job</span> <br /> You Deserve</h2>
            <p className="lead fw-normal" style={{ fontSize: "1rem" }}>we help you find the right job that you deserve. Our team matches your skills and preferences with the perfect institution to take your career to the next level.</p>
            <div className="mb-4 mb-lg-3">
              <Form className="row mx-1 flex-wrap align-items-center justify-content-center">

                <Form.Group className="p-0 my-2 col-6" controlId="exampleForm.ControlSelect1">
                  <Form.Select defaultValue={0} onChange={(event) => handlesubjectchange(event)}>
                    <option value={0}>Select Your Subject</option>
                    {
                      subjects.map((subject, index) => {
                        return (
                          <option key={index} value={subject._id}>{subject.name}</option>
                        )
                      })
                    }

                  </Form.Select>
                  {errors.subject && <span className="text-danger fs-6">{errors.subject}</span>}
                </Form.Group>
                <Form.Group className="my-2 col-6 pe-0" controlId="exampleForm.ControlSelect2">
                  <Form.Select onChange={(event) => handleworktypechange(event)}>
                    <option value={0}>Select Your Work Type</option>
                    <option value={1}>Full Time</option>
                    <option value={2}>Parttime</option>
                  </Form.Select>
                  {errors.worktype && <span className="text-danger fs-6">{errors.worktype}</span>}
                </Form.Group>
                <Form.Group className="my-2 col-6 p-0" controlId="exampleForm.ControlSelect3">
                  <Form.Select onChange={(event) => handleexperiencechange(event)}>
                    <option value={0}>Select Your Level of Teaching</option>
                    {
                      experiences.map((experience, index) => {
                        return (
                          <option key={index} value={experience._id}>{experience.name}</option>
                        )
                      })
                    }
                  </Form.Select>
                  {errors.experience && <span className="text-danger fs-6">{errors.experience}</span>}

                </Form.Group>

                <Form.Group className="my-2 col-6 pe-0" controlId="exampleForm.ControlInput3">
                  {/* <Form.Label >Mobile Number</Form.Label> */}
                  <Form.Control
                    type="number"
                    placeholder="Enter Mobile Number"
                    onChange={(event) => setMobile(event.target.value)}
                  />
                  {errors.mobile && <span className='text-danger fs-6'>{errors.mobile}</span>}

                </Form.Group>
                {spinner ? (
                  <Button variant="primary" disabled className="my-2 col-3" onClick={handlesearchclick}>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className='pe-2'
                    />
                    Searching
                  </Button>
                ) : (
                  <Button variant="primary" className="my-2 col-3" onClick={handlesearchclick}>
                    Search
                  </Button>
                )}

                {errors.response && <span className='text-danger fs-6 text-center'>{errors.response}</span>}

              </Form>
            </div>

          </div>
          <div className="col-lg-5 p-0 aboutusimg" >
            <img className="rounded-lg-3 w-100 h-100" style={{ objectFit: 'none' }} src={job} alt="job" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
