import { useContext } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/services/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/features/auth/authSlice";

const Login = ({ message }) => {
  const [login, { data, error, isSuccess, isError, isLoading }] =
    useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _onSave = async (values) => {
    try {
      const user = await login(values).unwrap();
      dispatch(setCredentials(user));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
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
          {message && (
            <div className="alert alert-info shadow-lg w-full m-1">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{message}</span>
              </div>
            </div>
          )}
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
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered input-primary w-full max-w-xs mx-auto m-2"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />

            {touched.email && !errors.email ? (
              <div className="m-2 flex flex-col items-center">
                <button
                  type="submit"
                  onSubmit={handleSubmit}
                  disabled={isSubmitting}
                  className="btn btn-warning"
                >
                  Login
                </button>
              </div>
            ) : null}
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body flex flex-row justify-around items-center">
              <div>
                <p>Do not have an account?</p>
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate("/auth")}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Login;
