import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import aboutus from '../about.jpg';
import aboutvision from '../aboutvision.jpg';
import doubt from '../doubt.jpg';
import trust from '../trust.jpg';


const Aboutus = () => {
  return (
    <>
    <div className="text-center p-5 mb-3" style={{ backgroundColor: "rgb(242, 246, 255)" }}><h2>About Us</h2><p><i>Empowering Education through Expert Faculty Recruitment



</i></p></div>
    <Container>
      <Row className='justify-content-between align-items-center mb-5'> 
       <div  className='col-md-6'>
        <h4>About Us</h4>

          <p>PNR CONSULTANCY has Started by late PRO NAGESWARA RAO Garu. I am Sahithi Rao continuing his legacy and services. We are Expertises in faculty recruitment from past 25 years. We mainly concentrate on recruiting faculties to the reputed intermediate colleges and top International Schools for the IIT ADVANCE, JEE MAINS, NEET and FOUNDATION (6th to 10th) standards. Our focus of activity is towards bridging the aspiring teaching staff and the reputed colleges, top international schools to help them find their match for excellence in education and a professional pursuit. We also recruit faculties across the seas.</p>
          <p><i>"Education is the most powerful weapon which you can use to change the world."</i></p>
          </div>
          <div className="col-md-5 aboutusimg" >
            <img src={aboutus} className='h-100 w-100' alt="about us" />
          </div>
      </Row>
      <Row className='align-items-center flex-column-reverse flex-md-row flex-row-reverse justify-content-between mb-5 pt-5 row'>
        <div className="col-md-5 aboutusimg">
          <img src={aboutvision} className='h-100 w-100' alt="about vision" />
        </div>
        <div className='col-md-6'>
          <h4>Deep Vision</h4>
          <p>Our main motto is to provide a Skilful faculties to the students who are our future world and this motivates us to take forward these services and to provide a golden opportunity to the professed faculties. The Top reputed colleges believe in us since we provide the faculties who are expertise with their subject.</p>
          <p><i>"The duties of a teacher are neither few nor small, but they elevate the mind and give energy to the character."</i></p>
        </div>
      </Row>
      <Row className='justify-content-between align-items-center mb-5 pt-5'>
        <div className='col-md-6'>
          <h4>Freedom from Doubt</h4>
          <p>PNR Consultancy makes effortless for faculties and organisation.We help you to get your aspired job by making the journey to your new adventure without any complications. We are very loyal and genuine with our Services that we provide. Belief in us to see your wonders.</p>
        </div>
        <div className="col-md-5 aboutusimg" >
            <img src={doubt} className='h-100 w-100' alt="doubt" />
          </div>
      </Row>
      <Row className='align-items-center flex-column-reverse flex-md-row flex-row-reverse justify-content-between mb-5 pt-5'>
      <div className="col-md-5 aboutusimg">
          <img src={trust} className='h-100 w-100' alt="about trust" />
        </div>
        <div className='col-md-6'>
          <h4>Mutual Trust and Benefit</h4>
          <p>Trust is built on a platform that is transparent and is run by those loyal to their customers. Never worry about a loss for our services are not only genuine but also beneficial without a doubt for both the faculty and our organisation. All you need is a passionate mind and strong command over the subject. For the rest, we got you covered.</p>
          <p><i>"Faith is to believe in us what you do not see,the reward of this faith is to see what you get from us."</i></p>
        </div>
      </Row>
    </Container>
    </>
  );
}

export default Aboutus

