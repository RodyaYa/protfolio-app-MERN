import React, { useState, useEffect, useContext } from "react";
import { authService } from "../../services/api/auth.service";
import { AuthContext } from "../../context/AuthContext";
import "./index.css";

function AuthPage() {
  const auth = useContext(AuthContext);
  const [authData, setAuthData] = useState();
  const [authResponse, setAuthResponse] = useState();
  const [authErrors, setAuthErrors] = useState();
  const [loading, setLoading] = useState(false);

  //classes
  const [switchModalClass, setSwitchModalClass] = useState("");

  useEffect(() => {
    try {
      if (authResponse.errors.length > 0) {
        setAuthErrors(authResponse.errors);
      } else {
        setAuthErrors();
      }
    } catch (error) {
      setAuthErrors();
    }
  }, [authResponse]);

  useEffect(() => {
    console.log(authErrors);
    try {
      if (authErrors.length > 0) {
        let inputs = document.getElementsByTagName("input");
        var arr = Array.from(inputs);
        arr.forEach((item) => {
          item.classList.remove("error");
        });
        arr.forEach((item) => {
          authErrors.forEach(({ param }) => {
            if (item.name === param) {
              item.classList.add("error");
            }
          });
        });
      }
    } catch (error) {}
  }, [authErrors]);

  async function authHandler(e, type) {
    setLoading(true);
    try {
      if (type === "login") {
        const response = await authService.login(authData);
        response && setAuthResponse(response.data);

        if (response.data.token) {
          const { token, userId } = response.data;
          auth.login(token, userId);
        }

        setLoading(false);
      } else if (type === "register") {
        const response = await authService.register(authData);
        response && setAuthResponse(response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  function clearErrors() {
    setAuthErrors();
    let inputs = document.getElementsByTagName("input");
    var arr = Array.from(inputs);
    arr.forEach((item) => {
      item.classList.remove("error");
      item.value = null;
    });
  }

  function openModal() {
    clearErrors();
    setSwitchModalClass("opened");
    setAuthData();
  }
  function closeModal() {
    clearErrors();
    setSwitchModalClass("");
  }

  function inputHandler(e) {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  }

  function togglePassword(e) {
    const { type } = e.target.previousSibling;
    e.target.classList.toggle("active");
    if (type === "password") {
      e.target.previousSibling.type = "text";
    } else {
      e.target.previousSibling.type = "password";
    }
  }

  return (
    <div className={`auth`}>
      <div className={`inner`}>
        <div className="form flex flex-centered">
          <div className="inputs flex flex-centered">
            <div className="wrapper">
              <input
                type="text"
                name="email"
                placeholder="Enter email"
                onChange={(e) => {
                  inputHandler(e);
                }}
              />
            </div>
            <div className="wrapper">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  inputHandler(e);
                }}
              />
              <div
                className="togglePassword"
                onClick={(e) => {
                  togglePassword(e);
                }}
              ></div>
            </div>
          </div>
          {authErrors && authErrors.length > 0 && (
            <div className="errors">
              {authErrors.map(({ msg }) => {
                return <div className="item">{msg}</div>;
              })}
            </div>
          )}
          <div className="buttons flex flex-centered">
            <div
              className={`login ${loading ? "disabled" : ""}`}
              onClick={(e) => {
                authHandler(e, "login");
              }}
            >
              Login
            </div>
          </div>

          <div className="forgot_password">
            <a href="/">Forgot password?</a>
          </div>

          <div className="buttons flex flex-centered">
            <div
              className={`create`}
              onClick={(e) => {
                openModal();
              }}
            >
              Create an account
            </div>
          </div>
        </div>
      </div>

      <div className={`modal ${switchModalClass}`}>
        <div className="inner">
          <div
            className="closeBtn"
            onClick={(e) => {
              closeModal();
            }}
          ></div>
          <div className="form flex flex-centered">
            <div className="inputs flex flex-centered">
              <div className="wrapper">
                <input
                  type="text"
                  name="login"
                  placeholder="Enter Login"
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                />
              </div>
              <div className="wrapper">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                />
              </div>
              <div className="wrapper">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                />
                <div
                  className="togglePassword"
                  onClick={(e) => {
                    togglePassword(e);
                  }}
                ></div>
              </div>
            </div>
            {authErrors && authErrors.length > 0 && (
              <div className="errors">
                {authErrors.map(({ msg }) => {
                  return <div className="item">{msg}</div>;
                })}
              </div>
            )}
            <div className="buttons flex flex-centered">
              <div
                className={`register ${loading ? "disabled" : ""}`}
                onClick={(e) => {
                  authHandler(e, "register");
                }}
              >
                Register
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
