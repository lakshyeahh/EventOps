import React, { useEffect, useState } from 'react'
import './styles/finalform.css'
import Secy from '../images/Secy.jpg';
import Office from '../images/Office.jpg';
import CCS from '../images/CCS.jpg';
import Secuirtiy from '../images/Secuirtiy.jpg';
import Tech from '../images/Tech.jpg'
import Logo from '../images/logo_pec.png';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@radix-ui/themes';
import Nabvar from '../components/navbar';



function FinalForm() {
  const { event_token } = useParams();
  const token = event_token.split('=')[0];

  const [eventData, setEventData] = useState([]);
  const [error, setError] = useState(null);
  // const event_token = new URLSearchParams(window.location.search);


    useEffect(() => {
      const fetchEventData = async () => {
        try {
          
          
          if (!event_token) {
            alert("Give Details Again");
            throw new Error('Access token not found');
          }
  
          const response = await fetch('/api/cards/one', {

            headers: {
              'Authorization': `Bearer ${token}`
            }
            });

            if (!response.ok) {
              throw new Error('Failed to fetch event data');
            }
    
            const data = await response.json();
            setEventData(data);
            console.log(data);
          } catch (error) {
            setError(error.message);
          }
        };
        fetchEventData();
      }, []);

      const handleDownload = () => {
        // Get the entire content of the page
        const content = document.getElementById('page-content');
    
        // Remove the download button from the content
        const downloadButton = document.getElementById('download-button');
        if (downloadButton) {
            downloadButton.remove();
        }
    
        // Use html2canvas to capture the content as an image
        html2canvas(content)
          .then(canvas => {
            // Convert the canvas to a data URL
            const imgData = canvas.toDataURL('image/png');
    
            // Create a new jsPDF instance
            const pdf = new jsPDF('p', 'mm', 'a4');
    
            // Add the captured image to the PDF
            pdf.addImage(imgData, 'PNG', -18, 0, 250, 297);
    
            // Download the PDF
            pdf.save(`${eventData.clubName}_${eventData.roomNumber}.pdf`);
          });
    };
    


  return (
    <div>
    <Nabvar/>
    <div id="page-content" className='form-containerr' style={{ margin: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
  {error && <p>{error}</p>}
  <div className='header' style={{ textAlign: 'center', marginBottom: '20px' }}>
    <img src={Logo} alt='#' style={{ width: '100px'}} />
    <h2 className='college-name' style={{ fontFamily: 'times-new-roman' }}>
      Punjab Engineering College
    </h2>
    <h2 className='college-name' style={{ fontFamily: 'times-new-roman' }}>
      (Deemed to be University), Chandigarh
    </h2>
    <h4 className='college-name' style={{ fontFamily: 'times-new-roman' }}>
      PERFORMA FOR BOOKING OF LECTURE ROOMS BY SOCIETY 
    </h4>
  </div>

  <div className='inputs-container' style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', width: '70%', textAlign: 'center' }}>
    <strong htmlFor="societyName" style={{ border: '1px solid #000', padding: '5px' }}>Name of Society:</strong>
    <label  id="societyName" name="societyName" style={{ border: '1px solid #000', padding: '5px' , fontWeight: 'bold'}} >{eventData.clubName}</label>

    <strong htmlFor="eventName" style={{ borderLeft: '1px solid #000', borderTop: '1px solid #000', borderBottom: '1px solid #000', padding: '5px', height: '100px' }}>Event Name:</strong>
<label htmlFor="eventName" id="eventName" name="eventName" style={{ borderTop: '1px solid #000', borderRight: '1px solid #000', borderBottom: '1px solid #000', padding: '5px', fontWeight: 'bold' , height: '100px'}}>{eventData.eventName}</label>


    <strong htmlFor="briefDescription" style={{ borderLeft: '1px solid #000', borderTop: '1px solid #000', borderBottom: '1px solid #000', padding: '5px', height: '120px' }}>Brief Description:</strong>
<label htmlFor="briefDescription" id="societyName" name="societyName" style={{ borderTop: '1px solid #000', borderRight: '1px solid #000', borderBottom: '1px solid #000', padding: '5px', fontWeight: 'bold', height: '120px' }}>{eventData.briefDescription}</label>


    <strong htmlFor="eventMode" style={{ border: '1px solid #000', padding: '5px' }}>Event Mode:</strong>
    <label  id="societyName" name="societyName" style={{ border: '1px solid #000', padding: '5px' , fontWeight: 'bold'}} >{eventData.eventMode}</label>

    <strong htmlFor="roomNumber" style={{ border: '1px solid #000', padding: '5px' }}>Room Number:</strong>
    <label  id="societyName" name="societyName" style={{ border: '1px solid #000', padding: '5px' , fontWeight: 'bold'}} >{eventData.roomNumber}</label>

    <strong htmlFor="dateTime" style={{ border: '1px solid #000', padding: '5px' }}>Date & Time:</strong>
    <input type="datetime-local" id="dateTime" name="dateTime" style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold' }} />

    <strong htmlFor="expectedParticipation" style={{ border: '1px solid #000', padding: '5px' }}>Expected Participation:</strong>
    <label  id="societyName" name="societyName" style={{ border: '1px solid #000', padding: '5px' , fontWeight: 'bold'}} >{eventData.expectedParticipation}</label>

    <strong htmlFor="audience" style={{ border: '1px solid #000', padding: '5px' }}>Audience:</strong>
    <label  id="societyName" name="societyName" style={{ border: '1px solid #000', padding: '5px' , fontWeight: 'bold'}} >{eventData.expectedParticipation}</label>
  </div>
  <p id='note' style={{ textAlign: 'left', fontFamily: 'times-new-roman', fontWeight: 'bold', margin: '0' }}>
      Note: The undersigned takes full responsibility for any damage to the institute's property in the above-mentioned rooms during the mentioned time.
      <br />
      Any financial assistance required? (Yes/No)
    </p>
    <div className='signature-container' style={{fontFamily: 'times-new-roman', fontWeight: 'bold', width: '50%', height: '20%'}}>
      <div className="signature-item">
        <img src={Secy} alt="Photo 1" />
        <label>(Secretary/Joint Secretary)</label>
      </div>
      <div className="signature-item">
        <img src={CCS} alt="Photo 2" />
        <label>(CCS/CSTS)</label>
      </div>
      <div className="signature-item">
        <img src={Office} alt="Photo 3" />
        <label>(Office Incharge)</label>
      </div>
      <div className="signature-item">
        <img src={Tech} alt="Photo 4" />
        <label>(PI Technical Societies)</label>
      </div>
      <div className="signature-item">
        <img src={Secuirtiy} alt="Photo 5" />
        <label>(PI Security)</label>
      </div>
    </div>
    <Button id="download-button" size="3" variant="soft" onClick={handleDownload}>
    Download as PDF
  </Button>
</div>

</div>

  
  )
}

export default FinalForm;