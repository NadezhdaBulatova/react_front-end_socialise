import { useContext } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const _onSave = (values) => {
    registerUser(values);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        nickname: "",
        confirm_password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("Email required")
          .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Email you entered is invalid"
          ),
        password: Yup.string()
          .required("Password required")
          .min(8, "Password should be at least 8 characters")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Include at least one Uppercase, Lowercase, Number and a special character"
          ),
        confirm_password: Yup.string()
          .required("Confirm password required")
          .oneOf([Yup.ref("password"), null], "Passwords should match")
          .min(8, "Password should be at least 8 characters"),
        nickname: Yup.string()
          .required("Nickname required")
          .matches(
            /^[0-9a-zA-z_]+$/,
            "Only alphanumeric characters and underscores are allowed for nickname"
          )
          .max(15, "Nickname should be 15 characters or less"),
      })}
      onSubmit={(values) => _onSave(values)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          {touched.email && errors.email ? (
            <div className="alert shadow-lg w-full m-1">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{errors.email}</span>
              </div>
            </div>
          ) : null}

          {touched.password && errors.password ? (
            <div className="alert shadow-lg w-full m-1">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{errors.password}</span>
              </div>
            </div>
          ) : null}

          {touched.nickname && errors.nickname ? (
            <div className="alert shadow-lg w-full m-1">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{errors.nickname}</span>
              </div>
            </div>
          ) : null}

          {touched.confirm_password && errors.confirm_password ? (
            <div className="alert shadow-lg w-full m-1">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{errors.confirm_password}</span>
              </div>
            </div>
          ) : null}

          <div className="flex flex-1 flex-col">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered input-primary w-full max-w-xs mx-auto m-2"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />

            <input
              type="nickname"
              name="nickname"
              placeholder="Nickname"
              className="input input-bordered input-primary w-full max-w-xs mx-auto m-2"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.nickname}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered input-primary w-full max-w-xs mx-auto m-2"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />

            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm_password"
              className="input input-bordered input-primary w-full max-w-xs mx-auto m-2"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirm_password}
            />

            {touched.email &&
            !errors.email &&
            touched.password &&
            touched.nickname &&
            !errors.nickname ? (
              <div className="m-2 flex flex-col items-center">
                <button
                  type="submit"
                  onSubmit={handleSubmit}
                  disabled={isSubmitting}
                  className="btn btn-warning"
                >
                  Register
                </button>
              </div>
            ) : null}
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body flex flex-row justify-around items-center">
              <div>
                <p>Already have an acoount?</p>
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() =>
                    navigate("/auth", { state: { data: "login" } })
                  }
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Register;
