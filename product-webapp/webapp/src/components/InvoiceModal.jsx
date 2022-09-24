import React from "react";
import "../styles/invoice.css";
import { FaRupeeSign } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IoCarSportOutline } from "react-icons/io5";

const Modal = (props) => {
  const selectedProfile = localStorage.getItem('MyProfile') ? JSON.parse(localStorage.getItem('MyProfile')) : false;
  const type = localStorage.getItem('MyType') ? localStorage.getItem('MyType') : false;
  const {
    show,
    onClose,
    vehicleNo,
    fromDatetime,
    toDatetime,
    totalFare,
    location,
    bookingId,
    clientEmailId,
  } = props;
  const userName =selectedProfile.name;
  const address = selectedProfile.address.city + '-' + selectedProfile.address.pincode;
  const downloadPdf = () => {
    const input = document.getElementById("invoice-box");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("caRentz-invoice.pdf");
    });
  };
  if (!show) {
    return null;
  }

  return (
    <div className="popup-box">
      <div className="box">
        <button onClick={onClose} className="close-button-invoice">
          x
        </button>

        <div className="invoice">
          <div className="invoice-box" id="invoice-box">
            <table cellPadding={0} cellSpacing={0}>
              <thead>
                <tr className="table-top">
                  <td colSpan={2}>
                    <table>
                      <thead>
                      <tr>
                        <td>
                          <h1 className="svg">
                            C<IoCarSportOutline />
                            Rentz
                          </h1>
                        </td>
                        <td>
                          INVOICE/RECEIPT <br />
                          Booking ID :<br />
                          {bookingId}
                        </td>
                      </tr>
                      </thead>
                    </table>
                  </td>
                </tr>
              
              <tr className="information">
                <td colSpan={2}>
                  <table>
                    <thead>
                    <tr>
                      <td>
                        BILLED TO
                        <br />
                        {type === 'client' && <> Name : {userName} <br/></>}
                        Email : {clientEmailId}
                        <br />
                        {type === 'client' && <> City : {address}</>}
                        
                      </td>
                    </tr>
                    </thead>
                  </table>
                </td>
              </tr>
              <tr className="information">
                <td colSpan={2}>
                  <table>
                    <thead>
                    <tr>
                      <td>
                        BOOKING DETAILS
                        <br />
                        Vehicle No : {vehicleNo} <br />
                        Location : {selectedProfile.address.city} <br />
                        Pickup : {fromDatetime} <br />
                        Dropoff : {toDatetime}
                      </td>
                    </tr>
                    </thead>
                  </table>
                </td>
              </tr>
              <tr className="heading">
                <td>FARE BREAKDOWN</td>
                <td>
                  <FaRupeeSign /> {totalFare}
                </td>
              </tr>
              <tr className="details">
                <td>Booking Fee</td>
                <td>{totalFare}</td>
              </tr>
              <tr className="details">
                <td>Security Deposit</td>
                <td>0</td>
              </tr>
              <tr className="heading">
                <td>OUTSTANDING</td>
                <td>
                  <FaRupeeSign />0
                </td>
              </tr>
              <tr className="heading">
                <td>PAYMENTS RECEIVED</td>
                <td>
                  <FaRupeeSign />
                  {totalFare}
                </td>
              </tr>
              </thead>
            </table>
          </div>
        </div>
        <div className="download">
          <button
            type="button"
            className=" button btn btn-primary"
            onClick={downloadPdf}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
