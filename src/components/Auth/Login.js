import React from "react";
import './Auth.css';
import {signin} from "../../service/ApiService"; // CSS 파일 연동

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 로그인 폼 제출 처리
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");
    // 로그인 처리 로직 (예시)
    // 로그인 API 호출
    signin({email: email, password: password}).catch(error => {
      console.error("Login failed:", error); // 로그인 실패 시 콘솔에 에러 로깅
      alert("로그인 실패: " + error); // 사용자에게 로그인 실패 알림
    });
  }

  render() {
    return (
        <div className="App">
          <div className="leftPanel">
            <h1 className="devDocTitle">Dev<div style={{marginTop: -30}}>Doc</div></h1>
          </div>
          <div className="rightPanel">
            <div className="loginContainer">
              <h1 className="loginTitle">로그인</h1>
              <form onSubmit={this.handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="이메일 (예: example@gmail.com)"
                    required
                    className="textField"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    required
                    className="textField"
                />
                <div className="buttonContainer">
                  <button type="submit" className="loginButton">로그인</button>
                  <button
                      type="button"
                      className="signupButton"
                      onClick={() => window.location.href='/signup'}
                  >
                    회원가입
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Login;
