import React, { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { serverurl } from './Positionslist';
import { sendTelegramNotification } from '../telegram/notification';

const Contact = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    // const [formValid, setFormValid] = useState(false);
    const [errors, setErrors] = useState({});
    const [spinner, setSpinner] = useState(false);



    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    }

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};

        setSpinner(true)

        if (!name) {
            errors["name"] = "Name is required";
        }

        if (!email) {
            errors["email"] = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors["email"] = "Invalid email format";
        }

        if (!mobile) {
            errors["mobile"] = "Mobile is required";
        } else if (!/^\d{10}$/.test(mobile)) {
            errors["mobile"] = "Invalid mobile number";
        }

        if (!subject) {
            errors["subject"] = "Subject is required";
        }

        if (!message) {
            errors["message"] = "Message is required";
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setSpinner(false);
        } else {
            setErrors({});
            sendTelegramNotification(`A new contact form has been submitted on the website. Here are the details:
    Name: ${name}
    Email: ${email}
    Mobile: ${mobile}
    Subject: ${subject}
    Message: ${message}`);
            setSpinner(false)
            setErrors({ success: 'Form submitted successfully' });
            setEmail('');
            setName('');
            setMobile('');
            setSubject('');
            setMessage('');
            //     var myHeaders = new Headers();
            // myHeaders.append("Content-Type", "application/json");

            // var raw = JSON.stringify({
            //   "name": name,
            //   "email": email,
            //   "mobile": mobile,
            //   "subject": subject,
            //   "message": message
            // });

            // var requestOptions = {
            //   method: 'POST',
            //   headers: myHeaders,
            //   body: raw,
            //   redirect: 'follow'
            // };

            // fetch(`${serverurl}/contact`, requestOptions)
            //   .then(response => response.text())
            //   .then(result => {
            //     setSpinner(false)
            // //    navigate('/');
            // setErrors({success:'Form submitted successfully'});
            //     setEmail('');
            //     setName('');
            //     setMobile('');
            //     setSubject('');
            //     setMessage('');
            // })
            //   .catch(error => {
            //     console.log('error', error)
            //     setSpinner(false);
            // });

        }

    }


    return (
        <div>
            <div className="text-center p-5 mb-3" style={{ backgroundColor: "rgb(242, 246, 255)" }}><h2>Contact US</h2><p><i>Feel Free to talk</i></p></div>
            <div className="container my-5">
                <div className="row justify-content-center py-5">
                    <div className="col-md-10 shadow p-md-5">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-md-6 pe-md-5 contactusleft">
                                <h3 className="heading mb-4">Let's talk about everything!</h3>
                                <p className='w-100'>If you are a faculty member looking for your dream job we are here to help.
                                    Contact us today to learn more about our services and how we can assist you in achieving your goals.</p>
                                <p className='text-center img w-100'><img src="https://preview.colorlib.com/theme/bootstrap/contact-form-16/images/undraw-contact.svg" alt="contactImage" /></p>
                            </div>
                            <div className="col-md-6 contactusright ps-md-5">
                                <form className="mb-5" method="post" id="contactForm" name="contactForm" noValidate>
                                    <div className="row mb-3">
                                        <div className="col-md-12 form-group">
                                            <input type="text" className="form-control" name="name" id="name" placeholder="Your name" value={name} onChange={(e) => handleNameChange(e)} />
                                            {errors.name && <div className="text-danger fs-6">{errors.name}</div>}

                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12 form-group">
                                            <input type="email" className="form-control" name="email" id="email" placeholder="Email" value={email} onChange={(e) => handleEmailChange(e)} />
                                            {errors.email && <div className="text-danger fs-6">{errors.email}</div>}

                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12 form-group">
                                            <input type="number" className="form-control" name="mobile" id="mobile" placeholder="Mobile" value={mobile} onChange={(e) => handleMobileChange(e)} />
                                            {errors.mobile && <div className="text-danger fs-6">{errors.mobile}</div>}

                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12 form-group">
                                            <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" value={subject} onChange={(e) => handleSubjectChange(e)} />
                                            {errors.subject && <div className="text-danger fs-6">{errors.subject}</div>}

                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12 form-group">
                                            <textarea className="form-control" name="message" id="message" placeholder="Write your message" value={message} onChange={(e) => handleMessageChange(e)}></textarea>
                                            {errors.message && <div className="text-danger fs-6">{errors.message}</div>}

                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-12 text-center">

                                            {spinner ? (
                                                <>

                                                    <input type="disabled" disabled value="Sending" className="btn btn-primary rounded-0 py-2 px-4" />
                                                </>) : (
                                                <>
                                                    <input type="submit" onClick={handleSubmit} value="send message" className="btn btn-primary rounded-0 py-2 px-4" />
                                                    {errors.success && <div className="text-success fs-6">{errors.success}</div>}

                                                </>
                                            )}
                                        </div>




                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact