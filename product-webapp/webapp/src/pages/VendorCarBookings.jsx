import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../components/UseFetch";
import VendorCarBookingDetails from "../components/VendorCarBookingDetails";
import ReactPaginate from "react-paginate";
import { useState } from "react";

//const baseUrl = 'http://localhost:8080/bookings-management';
const baseUrl = 'https://carentz.stackroute.io/bookings-management';


// const arr = [
//   {
//     bookingId: "34829728947",
//     clientEmailId: "bobdavidson@gmail.com",
//     vehicleNo: "AP07CDXXX0",
//     fromDatetime: "2022-07-15",
//     toDatetime: "2022-07-17",
//     totalFare: 2150,
//   },
//   {
//     bookingId: "34829728947",
//     clientEmailId: "bob@gmail.com",
//     vehicleNo: "389468964",
//     fromDatetime: "2022-07-15",
//     toDatetime: "2022-07-17",
//     totalFare: 2150,
//   },
// ];
export default function VendorCarBookings() {
  const { vehicleNo } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 2;

  const url = `${baseUrl}/api/v4/getallbookingbyvehicle/${vehicleNo}`;
  const { data, isLoading, error } = useFetch(url);
  if (isLoading) {
    return <p>loading.....</p>;
  }
  if (error) {
    return <p>an error occured</p>;
  }

  const offset = currentPage * PER_PAGE;

  const currentPageData = data.slice(offset, offset + PER_PAGE);
  console.log("Dataaaa", currentPageData);
  const pageCount = Math.ceil(data.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  return (
    <>
      <div>
        <h1 className="vendorbookings-header">Booking Details</h1>
      </div>
      {currentPageData.map((bookings, index) => (
        <div key={index}>
          <VendorCarBookingDetails {...bookings} />
        </div>
      ))}

      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        containerClassName={
          "pagination pagination-lg justify-content-center mt-5"
        }
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
}
