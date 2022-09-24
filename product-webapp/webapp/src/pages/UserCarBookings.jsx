import React from "react";
import UserCarBookingDetails from "../components/UserCarBookingDetails";
import "../styles/vendor.scss";
import useFetch from "../components/UseFetch";
import { getServerUrl } from "../utils/utility";
import ReactPaginate from "react-paginate";
import { useState } from "react";

export default function UserCarBookings() {
  const selectedProfile = localStorage.getItem("MyProfile")
    ? JSON.parse(localStorage.getItem("MyProfile"))
    : false;
  const clientEmailId = selectedProfile.emailId;
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 2;
  const url = `${getServerUrl()}/getallbooking/${clientEmailId}`;
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
          <UserCarBookingDetails {...bookings} />
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
