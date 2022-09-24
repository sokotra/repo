import "../styles/home.css";
import { useForm, Controller } from "react-hook-form";
import { TiLocationArrow } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { BiCurrentLocation } from "react-icons/bi";
import { useState } from "react";
import { format,addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function FindCars(props) {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState();
  const [disableDate, setDisable] = useState(true);
  const [city, setCity] = useState(props.searchDate?.location);
  const [fromDate, setFrom] = useState(
    props.searchDate ? new Date(props.searchDate.from) : ""
  );
  const [toDate, setTo] = useState(
    props.searchDate ? new Date(props.searchDate.to) : ""
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.from = format(data.from, "yyyy-MM-dd");
    data.to = format(data.to, "yyyy-MM-dd");
    data.location = data.location.toUpperCase();
    navigate("/List", { state: { searchDate: data } });
  };
  return (
    <>
      {props.page === "Home" && (
        <div className="parallex">
          <div className="selection-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="row">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="form-control form-control-lg border-right-0 bg-white">
                        <TiLocationArrow size={40} />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control form-control-lg border-left-0"
                      id="location"
                      placeholder="Enter Location..."
                      {...register("location", { required: true })}
                    />
                  </div>
                  {errors.location && (
                    <span role="alert" className="text-danger">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6 col-12 mt-3">
                    <div className="input-group">
                      <Controller
                        control={control}
                        name="from"
                        rules={{ required: true }}
                        render={({ field }) => (
                          <DatePicker
                            dateFormat="d MMM yyyy"
                            selected={field.value}
                            minDate={new Date()}
                            placeholderText="Your Journey Start Date..."
                            className="form-control form-control-lg"
                            onChange={(date) => {
                              field.onChange(date);
                              setStartDate(date);
                              setDisable(false);
                            }}
                          />
                        )}
                      />
                      {errors.from && (
                        <span role="alert" className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mt-3">
                    <div className="input-group">
                      <Controller
                        control={control}
                        name="to"
                        rules={{ required: true }}
                        render={({ field }) => (
                          <DatePicker
                            dateFormat="d MMM yyyy"
                            selected={field.value}
                            minDate={startDate}
                            maxDate={addDays(startDate, 6)}
                            readOnly={disableDate ? true : false}
                            className="form-control form-control-lg bg-white"
                            placeholderText="Journey End Date..."
                            onChange={(e) => field.onChange(e)}
                          />
                        )}
                      />

                      {errors.to && (
                        <span role="alert" className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 col-md-2 col-4 mt-4 mx-auto">
                  <button className="btn btn-warning " type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -----List part--------- */}
      {props.page === "List" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-3 col-12 mb-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="form-control form-control-lg border-right-0 bg-white">
                      <BiCurrentLocation size={20} style={{ color: "red" }} />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="location"
                    value={city}
                    placeholder={city}
                    {...register("location", {
                      required: true,
                      onChange: (e) => {
                        setCity(e.target.value);
                      },
                    })}
                  />
                </div>
                {errors.location && (
                  <span role="alert" className="text-danger m-3">
                    This field is required
                  </span>
                )}
              </div>
              <div className="col-md-3 col-6 mb-3">
                <div className="input-group">
                  <Controller
                    control={control}
                    name="from"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <DatePicker
                        dateFormat="d MMM yyyy"
                        selected={fromDate}
                        minDate={new Date()}

                        startDate={startDate}
                        placeholderText="Your Journey Start Date..."
                        className="form-control form-control-lg"
                        onChange={(date) => {
                          field.onChange(date);
                          setFrom(date);
                          setTo();
                          setStartDate(date);
                          setDisable(false);
                        }}
                      />
                    )}
                  />
                  {errors.from && (
                    <span role="alert" className="text-danger">
                      Select New Date
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-3 col-6 mb-3">
                <div className="input-group">
                  <Controller
                    control={control}
                    name="to"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <DatePicker
                        dateFormat="d MMM yyyy"
                        selected={toDate}
                        minDate={startDate}
                        maxDate={addDays(startDate, 6)}

                        calendarIcon="Calendar"
                        readOnly={disableDate ? true : false}
                        className="form-control form-control-lg bg-white"
                        placeholderText="Journey End Date..."
                        onChange={(e) => {
                          field.onChange(e);
                          setTo(e);
                        }}
                      />
                    )}
                  />

                  {errors.to && (
                    <span role="alert" className="text-danger">
                      Select New Date
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <button className="btn btn-primary btn-lg" type="submit">
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
